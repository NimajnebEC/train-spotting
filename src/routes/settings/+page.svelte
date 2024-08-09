<script lang="ts">
	import ReplicationStatus from "$lib/components/ReplicationStatus.svelte";
	import { faBoxArchive, faChevronRight, faPlug } from "@fortawesome/free-solid-svg-icons";
	import { onMount } from "svelte";
	import Fa from "svelte-fa";

	let storageUsage: number;
	onMount(async () => {
		const { quota, usage } = await navigator.storage.estimate();
		if (quota && usage) storageUsage = Math.ceil((usage / quota) * 100);
	});
</script>

<h1>Settings</h1>
<hr />
<div class="group">
	<a href="/settings/replication">
		<Fa icon={faPlug} />
		<span class="title">Replication</span>
		<span class="info"><ReplicationStatus mode="connection" icon={false} /></span>
		<span class="chevron"><Fa icon={faChevronRight} /></span>
	</a>
	<a href="/settings/storage">
		<Fa icon={faBoxArchive} />
		<span class="title">Storage</span>
		{#if storageUsage !== undefined}<span class="info">{storageUsage}% Used</span>{/if}
		<span class="chevron"><Fa icon={faChevronRight} /></span>
	</a>
</div>

<style lang="scss">
	.group {
		background-color: var(--bg-3);
		flex-direction: column;
		border-radius: 10px;
		overflow: hidden;
		display: flex;
		gap: 1px;

		a {
			background-color: var(--bg-2);
			justify-content: left;
			align-items: center;
			display: block;
			display: flex;
			padding: 15px;
			width: 100%;
			gap: 10px;

			.title {
				font-weight: 500;
			}

			.info {
				font-size: 14px;
				color: var(--bg-4);

				&::before {
					padding-right: 0.5rem;
					content: "-";
				}
			}

			.chevron {
				margin-left: auto;
				font-size: 14px;
			}
		}
	}
</style>
