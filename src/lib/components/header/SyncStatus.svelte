<script lang="ts">
	import { onChange, state } from "$lib/util";
	import { db } from "$lib/pouchdb";
	import Fa from "svelte-fa";
	import {
		faPlug,
		faCloud,
		faGlobe,
		faRotate,
		faStarOfLife,
		faTriangleExclamation,
	} from "@fortawesome/free-solid-svg-icons";
	import { onDestroy, onMount } from "svelte";

	interface Credentials {
		address: string;
		username: string;
		password: string;
	}

	const credentials = state<Credentials | null>("credentials", null);

	let sync: PouchDB.Replication.Sync<{}> | null = null;
	let remote: PouchDB.Database<{}> | null = null;

	let connectionStatus: "disconnected" | "connected" | "loading" = "disconnected";
	let syncStatus: "outdated" | "synced" | "error" = "outdated";

	function setup() {
		const address = prompt("CouchDB database address:");
		if (address === null) return;
		const username = prompt("Database username:");
		if (username === null) return;
		const password = prompt("Database password:");
		if (password === null) return;

		credentials.value = {
			address,
			username,
			password,
		};

		connect();
	}

	async function connect() {
		if (credentials.value === null) return;
		const { address, username, password } = credentials.value;

		remote = new PouchDB(address, { auth: { username, password } });
		let firstPause = true;

		sync = db
			.sync(remote, { live: true, retry: true })
			.on("change", function (info) {
				console.log("change", info);
				syncStatus = "synced";
			})
			.on("paused", function (err) {
				connectionStatus = "connected";
				console.log("paused", err);
				if (firstPause) {
					syncStatus = "synced";
					firstPause = false;
				}
			})
			.on("active", function () {
				connectionStatus = "loading";
				console.log("active");
			})
			.on("denied", function (err) {
				console.log("denied", err);
				syncStatus = "error";
			})
			.on("complete", function (info) {
				connectionStatus = "disconnected";
				console.log("complete", info);
			})
			.on("error", function (err) {
				connectionStatus = "disconnected";
				console.log("error", err);
				sync?.cancel();
			});
	}

	onChange(() => (syncStatus = "outdated"));
	onDestroy(() => sync?.cancel());
	onMount(connect);
</script>

<button on:click={setup}>
	{#if connectionStatus == "disconnected"}
		<Fa icon={faPlug} />
	{:else if connectionStatus == "connected"}
		<Fa icon={faGlobe} />
	{:else if connectionStatus == "loading"}
		<Fa icon={faRotate} />
	{/if}

	{#if syncStatus == "outdated"}
		<Fa icon={faStarOfLife} />
	{:else if syncStatus == "synced"}
		<Fa icon={faCloud} />
	{:else if syncStatus == "error"}
		<Fa icon={faTriangleExclamation} />
	{/if}
</button>
