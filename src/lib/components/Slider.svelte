<script lang="ts">
	import { createSlider, melt, type CreateSliderProps } from "@melt-ui/svelte";
	import { type IconDefinition } from "@fortawesome/free-solid-svg-icons";
	import { propertyStore } from "svelte-writable-derived";
	import Fa from "svelte-fa";

	export let icons: [IconDefinition, IconDefinition];
	export let props: CreateSliderProps = {
		step: 1,
		max: 10,
		min: 0,
	};

	const {
		states,
		elements: { root, range, thumbs, ticks },
	} = createSlider(props);

	const value = propertyStore(states.value, 0);
</script>

{$value}

<div class="container">
	<Fa icon={icons[0]} />
	<span use:melt={$root} class="root">
		<span class="slider">
			<span use:melt={$range} />
		</span>

		{#if $ticks.length - 1 <= 10}
			{#each $ticks as tick}
				<span use:melt={tick} class="tick" />
			{/each}
		{/if}

		<span use:melt={$thumbs[0]} class="thumb" />
	</span>
	<Fa icon={icons[1]} />
</div>

<style lang="scss">
	.container {
		align-items: center;
		font-size: 20px;
		margin: 3px 0;
		display: flex;
		gap: 10px;
	}

	.root {
		align-items: center;
		position: relative;
		margin: 2px 15px;
		display: flex;
		height: 30px;
		flex-grow: 1;
	}

	.slider {
		background-color: var(--bg-0);
		border-radius: 5px;
		height: 5px;
		width: 100%;

		span {
			background-color: var(--a-1);
			border-radius: inherit;
			height: inherit;
		}
	}

	.tick {
		background-color: white;
		border-radius: 100%;
		height: 3px;
		width: 3px;
	}

	.thumb {
		box-shadow: 0 0 3px 1px black;
		background-color: white;
		border: solid 2px white;
		border-radius: 100%;
		height: 25px;
		width: 25px;
	}
</style>
