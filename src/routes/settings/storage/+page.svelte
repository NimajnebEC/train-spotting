<script lang="ts">
	import { faCheckCircle, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
	import { spinner } from "$lib/components/Loading.svelte";
	import { persistent } from "$lib/pouchdb";
	import pretty from "pretty-bytes";
	import Fa from "svelte-fa";

	let estimate = navigator.storage.estimate();

	const request = () => spinner(navigator.storage.persist()).then(persistent.set);
</script>

<div class="container">
	<h2>Storage</h2>
	<p class="secondary">
		Data retention is handled by your browser, this could result in data being arbitrarily lost.
	</p>
	<p class="secondary">
		It is for this reason <a href="/settings/replication" class="link">replication</a> is recommended.
	</p>
	<hr />
	{#await estimate}
		Loading Estimate...
	{:then { quota, usage }}
		{#if quota && usage}
			<div class="usage">{pretty(usage, { binary: true })} / {pretty(quota, { binary: true })}</div>
			<div class="bar">
				<div style="width: {(usage / quota) * 100}%;" />
			</div>
		{/if}
	{/await}
	<hr />
	{#if $persistent}
		<span class="alert green"><Fa icon={faCheckCircle} /> Persistent Storage Granted</span>
	{:else}
		<span class="alert red"><Fa icon={faXmarkCircle} /> Persistent Storage Refused</span>
		<button class="primary" on:click={request}>Retry</button>
	{/if}
</div>

<style lang="scss">
	.container {
		flex-direction: column;
		display: flex;
		gap: 10px;
	}

	hr {
		margin: 10px 0;
	}

	.usage {
		font-size: 14px;
	}

	.bar {
		background-color: var(--bg-0);
		border-radius: 5px;
		overflow: hidden;
		height: 25px;

		div {
			box-shadow: black 2px 0 5px;
			background-color: var(--a-1);
			border-radius: 5px;
			min-width: 8px;
			height: 100%;
		}
	}
</style>
