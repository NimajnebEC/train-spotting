<script lang="ts">
	import { faHome, faPlug, faTrain } from "@fortawesome/free-solid-svg-icons";
	import { createDialog, melt } from "@melt-ui/svelte";
	import { slide } from "svelte/transition";
	import Fa from "svelte-fa";

	const {
		elements: { trigger, content, close },
		states: { open },
	} = createDialog();
</script>

<div class="logo" use:melt={$trigger}><Fa icon={faTrain} /></div>

{#if $open}
	<nav use:melt={$content} transition:slide={{ axis: "x" }}>
		<a href="/" use:melt={$close}><Fa icon={faHome} /> Home</a>
		<a href="/connection" use:melt={$close}><Fa icon={faPlug} /> Connection</a>
	</nav>
{/if}

<style lang="scss">
	.logo {
		color: var(--a-1);
		font-size: 30px;
	}

	nav {
		box-shadow: 3px 3px 3px #0000004b;
		background-color: var(--bg-1);
		padding-top: 50px;
		position: fixed;
		height: 100vh;
		z-index: -1;
		left: 0px;
		top: 0px;

		a {
			padding: 5px 50px 5px 15px;
			align-items: center;
			white-space: nowrap;
			font-size: 20px;
			display: flex;
			width: 100%;
			gap: 10px;
		}
	}
</style>
