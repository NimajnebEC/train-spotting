<script lang="ts" context="module">
	import { gettable } from "$lib/util";
	import { writable } from "svelte/store";
	import { fade } from "svelte/transition";

	const tasks: Promise<any>[] = [];
	const loading = gettable(writable(false));

	export function spinner<P extends Promise<any>>(task: P): P {
		tasks.push(task);
		if (!loading.get()) waiter();
		return task;
	}

	async function waiter() {
		loading.set(true);
		while (tasks.length > 0) await tasks.pop()!.catch();
		loading.set(false);
	}
</script>

{#if $loading}
	<div class="container" transition:fade>
		<div class="loader" />
	</div>
{/if}

<style lang="scss">
	.container {
		background-color: #0000009a;
		backdrop-filter: blur(1px);
		justify-content: center;
		align-items: center;
		position: fixed;
		display: flex;
		height: 100%;
		width: 100%;
		z-index: 99;
	}

	.loader {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		position: relative;
		animation: rotate 1s linear infinite;

		&::before,
		&::after {
			content: "";
			box-sizing: border-box;
			position: absolute;
			inset: 0px;
			border-radius: 50%;
			border: 5px solid #fff;
			animation: prixClipFix 2s linear forwards;
		}

		&::after {
			transform: rotate3d(90, 90, 0, 180deg);
			border-color: var(--a-1);
		}
	}

	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes prixClipFix {
		0% {
			clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0);
		}
		50% {
			clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0);
		}
		75%,
		100% {
			clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%);
		}
	}
</style>
