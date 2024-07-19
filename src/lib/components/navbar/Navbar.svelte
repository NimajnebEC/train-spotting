<script lang="ts">
	import type { IconDefinition } from "@fortawesome/fontawesome-common-types";
	import { faCog, faHome } from "@fortawesome/free-solid-svg-icons";
	import Fa from "svelte-fa";

	const entries: { href: string; label: string; icon: IconDefinition }[] = [
		{ href: "/", label: "Home", icon: faHome },
		{ href: "/settings", label: "Settings", icon: faCog },
	];
</script>

<nav>
	{#each entries as { href, icon, label }}
		<a {href}><Fa size="lg" {icon} /><span>{label}</span></a>
	{/each}
</nav>

<style lang="scss">
	nav {
		border-top: 1px solid var(--bg-2);
		background-color: var(--bg-1);
		align-items: end;
		position: fixed;
		display: flex;
		width: 100%;
		z-index: 2;
		bottom: 0;

		a {
			flex-direction: column;
			align-items: center;
			padding: 5px 10px;
			display: flex;
			flex-grow: 1;
			gap: 5px;

			span {
				font-size: 12px;
			}
		}
	}
</style>
