<script lang="ts">
	import { status } from "$lib/pouchdb";
	import Fa from "svelte-fa";
	import {
		faCloud,
		faGlobe,
		faPlug,
		faRotate,
		faSatelliteDish,
		faStarOfLife,
	} from "@fortawesome/free-solid-svg-icons";

	const { connection, sync } = status;
</script>

<div>
	{#if $connection == "disconnected"}
		<Fa icon={faPlug} />
		Disconnected
	{:else if $connection == "connected"}
		<Fa icon={faGlobe} />
		Connected
	{:else if $connection == "connecting"}
		<Fa icon={faSatelliteDish} />
		Connecting
	{/if}
</div>

<div>
	{#if $sync == "outdated"}
		<Fa icon={faStarOfLife} />
		Unsaved Changes
	{:else if $sync == "synced"}
		<Fa icon={faCloud} />
		Synchronised
	{:else if $sync == "syncing"}
		<Fa icon={faRotate} />
		Synchronizing
	{/if}
</div>
