<script lang="ts">
	import { createSlider, melt, createSync, type CreateSliderProps } from "@melt-ui/svelte";
	import { type IconDefinition } from "@fortawesome/free-solid-svg-icons";
	import { propertyStore } from "svelte-writable-derived";
	import Fa from "svelte-fa";

	export let icons: [IconDefinition, IconDefinition] | undefined = undefined;
	export let props: CreateSliderProps;
	export let solid: boolean = false;
	export let value: number = 0;

	const {
		states,
		elements: { root, range, thumbs, ticks },
	} = createSlider(props);

	const sync = createSync({ value: propertyStore(states.value, 0) });
	$: sync.value(value, (v) => (value = v));
</script>

<div class="container">
	{#if icons}
		<Fa icon={icons[0]} />
	{/if}
	<span use:melt={$root} class="root">
		<span class="track">
			{#if !solid}
				<span use:melt={$range} />
			{/if}
		</span>

		{#if $ticks.length - 1 <= 10}
			{#each $ticks as tick}
				<span use:melt={tick} class="tick" />
			{/each}
		{/if}

		<span use:melt={$thumbs[0]} class="thumb" />
	</span>
	{#if icons}
		<Fa icon={icons[1]} />
	{/if}
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

	.track {
		background-color: var(--bg-0);
		border-radius: 5px;
		height: 5px;
		width: 100%;

		&:empty {
			background-color: var(--a-1);
		}

		span {
			background-color: var(--a-1);
			border-radius: inherit;
			height: inherit;
		}
	}

	.tick {
		background-color: #535353;
		border-radius: 100%;
		height: 3px;
		width: 3px;

		&[data-bounded] {
			background-color: white;
		}
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
