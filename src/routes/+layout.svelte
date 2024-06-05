<script lang="ts">
	import { pwaInfo } from "virtual:pwa-info";
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
</script>

<svelte:head>
	{@html webManifestLink}
</svelte:head>

<main>
	<slot />
</main>
