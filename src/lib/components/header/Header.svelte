<script lang="ts">
	import Menu from "./Menu.svelte";
	import SyncStatus from "./SyncStatus.svelte";

	let height: number;
</script>

<div style="height: {height}px" />

<header bind:clientHeight={height}>
	<Menu />
	<SyncStatus />
</header>

<style lang="scss">
	header {
		border-bottom: 1px solid var(--bg-2);
		background-color: var(--bg-1);
		padding: 5px 10px;
		align-items: end;
		position: fixed;
		display: flex;
		width: 100%;
		z-index: 2;
		gap: 5px;
	}
</style>
