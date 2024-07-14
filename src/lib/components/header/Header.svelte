<script>
	import { faTrain } from "@fortawesome/free-solid-svg-icons";
	import SyncStatus from "./SyncStatus.svelte";
	import Fa from "svelte-fa";
</script>

<header>
	<div class="logo"><Fa icon={faTrain} /></div>
	<SyncStatus />
</header>

<style lang="scss">
	header {
		border-bottom: 1px solid var(--bg-2);
		padding: 5px 10px;
		align-items: end;
		display: flex;
		gap: 5px;
	}

	.logo {
		color: var(--a-1);
		font-size: 30px;
	}
</style>
