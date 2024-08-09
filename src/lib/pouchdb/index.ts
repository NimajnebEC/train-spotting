import { derived, writable, type Readable, type Writable } from "svelte/store";
import { gettable, persist } from "$lib/util";
import "./pouchdb";
import "./pouchdb.find";

export const db = new PouchDB("spotter", { auto_compaction: true });

// * Replication Functionality

export interface ReplicationStatus {
	connection: Writable<"disconnected" | "connected" | "connecting">;
	sync: Readable<"outdated" | "synced" | "syncing">;
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

export const error = writable<string | null>(null);
export const status: ReplicationStatus = {
	sync: derived([synchronising, outdated], ([s, o]) => (s ? "syncing" : o ? "outdated" : "synced")),
	connection: writable("disconnected"),
};

db.changes({ live: true, since: "now" }).on("change", () => outdated.set(true));

export async function disconnect() {
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

export async function connect() {
	const info = credentials.get();
	if (!info) return;

	await disconnect();

	// Setup new connection
	remote = new PouchDB(info.address, { auth: info });
	status.connection.set("connecting");

	// Test connection
	try {
		await remote.info();
	} catch (e) {
		status.connection.set("disconnected");
		alert(JSON.stringify(e));
		return;
	}

	status.connection.set("connected");

	// Start sync and add event listeners
	task = db
		.sync(remote, { live: true })
		.on("paused", (err) => {
			console.log("paused", err);
			synchronising.set(false);
			outdated.set(false);
		})
		.on("active", () => {
			console.log("active");
			synchronising.set(true);
		})
		.on("error", (err) => {
			console.log("error", err);
			status.connection.set("disconnected");
		})
		.on("denied", (err) => {
			console.log("denied", err);
		});
}
