import { derived, writable, type Readable, type Writable } from "svelte/store";
import { gettable, persist, sleep } from "$lib/util";
import { onMount, onDestroy } from "svelte";
import "./pouchdb";
import "./pouchdb.find";

export const db = new PouchDB("spotter", { auto_compaction: true });

export function onChange(fn: () => void) {
	let listener: PouchDB.Core.Changes<{}> | undefined;

	onDestroy(() => listener?.cancel());
	onMount(() => {
		listener = db.changes({ live: true, since: "now" }).on("change", fn);
		fn();
	});
}

// * Replication Functionality

export interface ReplicationStatus {
	connection: Writable<"disconnected" | "connected" | "connecting">;
	sync: Readable<"outdated" | "synced" | "syncing">;
	error: Writable<string | null>;
}

export interface ReplicationCredentials {
	address: string;
	username: string;
	password: string;
}

let remote: PouchDB.Database | null = null;
let task: PouchDB.Replication.Sync<{}> | null = null;

export const credentials = gettable(persist<ReplicationCredentials>("replication-credentials"));
const outdated = persist<boolean>("replication-outdated", false);
const synchronising = writable<boolean>(false);

export const status: ReplicationStatus = {
	sync: derived([synchronising, outdated], ([s, o]) => (s ? "syncing" : o ? "outdated" : "synced")),
	connection: writable("disconnected"),
	error: writable(null),
};

db.changes({ live: true, since: "now" }).on("change", () => outdated.set(true));

export async function disconnect() {
	status.connection.set("disconnected");
	synchronising.set(false);

	await new Promise<void>((resolve) => {
		if (task === null) return resolve();
		task.on("complete", () => {
			task = null;
			resolve();
		});

		task.cancel();
	});

	await remote?.close();
	remote = null;
}

export async function connect(retry: boolean = false) {
	const info = credentials.get();
	if (!info) return;

	await disconnect();

	console.log(`Connecting to ${info.username}@${info.address}`);

	// Setup new connection
	remote = new PouchDB(info.address, { auth: info });

	while (true) {
		status.connection.set("connecting");

		// Test connection
		try {
			await remote.info();
			break;
		} catch (e: any) {
			status.connection.set("disconnected");
			if (typeof e.message == "string") status.error.set(e.message);
			else status.error.set(`Unknown Error:\n\n${JSON.stringify(e)}`);
			if (!retry) return;
		}

		await sleep(1000);
	}

	status.error.set(null);
	status.connection.set("connected");

	// Start sync and add event listeners
	task = db
		.sync(remote, { live: true })
		.on("paused", (err) => {
			synchronising.set(false);
			outdated.set(false);
		})
		.on("active", () => {
			synchronising.set(true);
		})
		.on("error", async (e) => {
			console.error("Replication Error", e);

			task = null;
			await disconnect();
			await sleep(1000); // Retry connection after 1 second
			connect(true);
		})
		.on("denied", (e) => {
			console.error("Replication Denied", e);
			alert(`Replication Denied: ${JSON.stringify(e)}`);
		});
}

connect();
