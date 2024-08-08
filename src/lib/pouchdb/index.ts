import { writable, type Writable } from "svelte/store";
import "./pouchdb";
import "./pouchdb.find";

export const db = new PouchDB("spotter", { auto_compaction: true });

// * Replication Functionality

export interface ReplicationStatus {
	connection: Writable<"disconnected" | "connected" | "connecting">;
	sync: Writable<"outdated" | "synced" | "syncing">;
}

let remote: PouchDB.Database | null = null;
let task: PouchDB.Replication.Sync<{}> | null = null;

export const status: ReplicationStatus = { connection: writable("disconnected"), sync: writable("outdated") };

export async function connect(address: string, username: string, password: string) {
	// Clean up old connection
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

	// Setup new connection
	remote = new PouchDB(address, { auth: { username, password } });
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
			status.sync.set("synced");
		})
		.on("active", () => {
			console.log("active");
			status.sync.set("syncing");
		})
		.on("error", (err) => {
			console.log("error", err);
			status.connection.set("disconnected");
		})
		.on("denied", (err) => {
			console.log("denied", err);
		});
}
