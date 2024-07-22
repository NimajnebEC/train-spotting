<script lang="ts">
	import Navbar from "$lib/components/Navbar.svelte";
	import { pwaInfo } from "virtual:pwa-info";
	import type { PageData } from "./$types";
	import { fly } from "svelte/transition";
	import { onMount } from "svelte";
	import "greset";

	import "$lib/global.scss";

	onMount(async () => {
		if (pwaInfo) {
			const { registerSW } = await import("virtual:pwa-register");
			registerSW({
				immediate: true,
				onRegistered(r) {
					r &&
						setInterval(() => {
							console.log("Checking for sw update");
							r.update();
						}, 60000);
					console.log(`SW Registered: ${r}`);
				},
				onRegisterError(error) {
					console.log("SW registration error", error);
				},
			});
		}
	});

	$: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : "";

	export let data: PageData;
</script>

<svelte:head>
	{@html webManifestLink}
</svelte:head>

{#key data.path[0]}
	<main in:fly={{ x: -200, duration: 200, delay: 200 }} out:fly={{ x: 200, duration: 200 }}>
		<slot />
	</main>
{/key}
<Navbar />
