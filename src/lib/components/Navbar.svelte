<script lang="ts">
	import type { IconDefinition } from "@fortawesome/fontawesome-common-types";
	import { faCog, faHome } from "@fortawesome/free-solid-svg-icons";
	import { page } from "$app/stores";
	import Fa from "svelte-fa";

	const entries: { href: string; label: string; icon: IconDefinition }[] = [
		{ href: "/", label: "Home", icon: faHome },
		{ href: "/settings", label: "Settings", icon: faCog },
	];
</script>

<nav>
	{#each entries as { href, icon, label }}
		<a {href} class:active={$page.data.path[0] == href.split("/")[1]}>
			<Fa {icon} /><span>{label}</span>
		</a>
	{/each}
</nav>

<style lang="scss">
	nav {
		border-top: 1px solid var(--bg-4);
		background-color: var(--bg-1);
		align-items: end;
		position: fixed;
		display: flex;
		width: 100%;
		z-index: 2;
		bottom: 0;

		a {
			transition: color 200ms;
			flex-direction: column;
			align-items: center;
			color: var(--bg-4);
			padding: 5px 10px;
			font-size: 20px;
			display: flex;
			flex-grow: 1;
			gap: 5px;

			&.active {
				color: white;
			}

			span {
				font-size: 10px;
			}
		}
	}
</style>
