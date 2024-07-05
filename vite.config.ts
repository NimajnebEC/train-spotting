import { SvelteKitPWA } from "@vite-pwa/sveltekit";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
	define: { global: "window" },
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			manifest: {
				name: "Spotter",
				short_name: "Spotter",
				display: "standalone",
				theme_color: "#232222",
				background_color: "#232222",
				icons: [
					{
						src: "/android-chrome-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "/android-chrome-512x512.png",
						sizes: "512x512",
						type: "image/png",
					},
				],
			},
		}),
	],
});
