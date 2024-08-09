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
		type IconDefinition,
	} from "@fortawesome/free-solid-svg-icons";

	export let mode: "sync" | "connection";
	export let icon: boolean = true;

	const { connection, sync } = status;

	$: s = (
		{
			connecting: ["Connecting", faSatelliteDish],
			disconnected: ["Disconnected", faPlug],
			connected: ["Connected", faGlobe],
			outdated: ["Unsaved Changes", faStarOfLife],
			synced: ["Synchronised", faCloud],
			syncing: ["Synchronizing", faRotate],
		} as Record<string, [string, IconDefinition]>
	)[mode == "sync" ? $sync : mode == "connection" ? $connection : ""];
</script>

<span>
	{#if icon}
		<span class="icon"><Fa icon={s[1]} /></span>
	{/if}{s[0]}
</span>

<style lang="scss">
	.icon {
		display: inline-block;
		text-align: center;
		margin-right: 5px;
		width: 20px;
	}
</style>
