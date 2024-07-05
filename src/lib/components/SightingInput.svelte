<script lang="ts">
	import { local } from "$lib/pouchdb";
	import { onMount } from "svelte";

	let location: HTMLInputElement;

	let inputIds: string[] = [];
	let inputBinds: { [key: string]: HTMLInputElement } = {};

	function updateInputs() {
		inputIds = inputIds.filter((id) => inputBinds[id]?.value != "");
		console.log(inputIds, inputBinds);
	}

	const saveLocation = () => window.localStorage.setItem("location", location.value);
	onMount(() => (location.value = window.localStorage.getItem("location") ?? ""));
	updateInputs();
</script>

<div class="container">
	<label>
		Location:
		<input
			type="text"
			autocomplete="off"
			placeholder="Brighton"
			on:focusout={saveLocation}
			on:focusin={location.select}
			bind:this={location}
		/>
	</label>
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label>
		Sightings:
		<div class="container">
			{#each Object.keys(inputIds) as id (id)}
				<input
					type="number"
					autocomplete="off"
					placeholder="700128"
					name="classification"
					on:change={updateInputs}
					bind:this={inputBinds[id]}
				/>
			{/each}
		</div>
	</label>
	<button type="submit">Submit</button>
</div>

<style lang="scss">
	.container {
		flex-direction: column;
		display: flex;
		gap: 10px;
	}

	input {
		width: 100%;
	}
</style>
