<script lang="ts">
	import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
	import { slide } from "svelte/transition";
	import { page } from "$app/stores";
	import Fa from "svelte-fa";

	let height: number;
	let title: string;
	$: title = $page.data.path[$page.data.path.length - 2] ?? title;
</script>

<div style="height: {height}px;" />
<div class="container" bind:clientHeight={height} transition:slide>
	<div class="title" style="height: {height}px;">
		<span>{title}</span>
	</div>
	<a href="./">
		<Fa icon={faArrowLeft} />
	</a>
</div>

<style lang="scss">
	.container {
		border-bottom: 1px solid var(--bg-4);
		background-color: var(--bg-1);
		justify-content: center;
		align-items: center;
		position: fixed;
		font-size: 18px;
		width: 100%;
		z-index: 2;
		left: 0;
		top: 0;
	}

	a {
		display: inline-block;
		width: fit-content;
		font-size: 20px;
		padding: 8px;
	}

	.title {
		text-transform: capitalize;
		justify-content: center;
		display: inline-block;
		pointer-events: none;
		align-items: center;
		position: absolute;
		font-weight: bold;
		display: flex;
		width: 100%;
		left: 0;
	}
</style>
