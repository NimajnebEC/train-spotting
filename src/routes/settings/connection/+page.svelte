<script lang="ts">
	import ReplicationStatus from "$lib/components/ReplicationStatus.svelte";
	import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
	import { connect, credentials, disconnect as close, status } from "$lib/pouchdb";
	import Fa from "svelte-fa";
	import { spinner } from "$lib/components/Loading.svelte";

	const { error } = status;
	let address = $credentials?.address ?? "";
	let username = $credentials?.username ?? "";
	let password = "";

	function submit() {
		credentials.set({ address, username, password });
		spinner(connect());
	}

	function disconnect() {
		credentials.set(undefined);
		spinner(close());
	}
</script>

<div class="container">
	<h2>Replication Credentials</h2>
	<p class="secondary">
		CouchDB database connection credentials for backup and synchronising data between devices.
	</p>
	<ReplicationStatus />
	<hr />
	<form class="container" on:submit|preventDefault={submit}>
		<label>
			CouchDB Database Address:
			<input required type="url" placeholder="https://example.com/spotter" bind:value={address} />
		</label>

		<label>
			Database Username:
			<input required type="text" placeholder="username" bind:value={username} />
		</label>

		<label>
			Database Password:
			<input required type="password" placeholder="•••••••" bind:value={password} />
		</label>
		<div class="controls">
			<button type="submit" class="primary">Connect</button>
			<button type="button" class="secondary" on:click={disconnect}>Disconnect</button>
		</div>
	</form>
	{#if $error}
		<div class="error"><Fa icon={faCircleExclamation} /> {$error}</div>
	{/if}
</div>

<style lang="scss">
	.container {
		flex-direction: column;
		display: flex;
		gap: 10px;
	}

	p.secondary {
		color: var(--bg-3);
	}

	hr {
		margin: 10px 0;
	}

	.error {
		color: var(--r-2);
		margin-top: 10px;

		:global(svg) {
			color: var(--r-1);
		}
	}
</style>
