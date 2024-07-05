<script lang="ts">
	import { local } from "$lib/pouchdb";
	import { onMount } from "svelte";

	let classification: HTMLInputElement;
	let location: HTMLInputElement;
	let form: HTMLFormElement;

	onMount(() => (location.value = window.localStorage.getItem("location") ?? ""));

	async function submit() {
		const data = Object.fromEntries(new FormData(form).entries());

		const sighting = {
			_id: new Date().getTime().toString(),
			type: "sighting",

			classification: data.classification.toString(),
			location: data.location.toString(),
		};

		await local.put(sighting);

		classification.value = "";
	}

	const saveLocation = () => window.localStorage.setItem("location", location.value);
</script>

<form on:submit|preventDefault={submit} bind:this={form}>
	<input
		type="text"
		required
		name="location"
		autocomplete="off"
		placeholder="Brighton"
		on:focusout={saveLocation}
		on:focusin={location.select}
		bind:this={location}
	/>
	<input
		type="text"
		required
		autocomplete="off"
		placeholder="700128"
		name="classification"
		bind:this={classification}
	/>
	<button type="submit">Submit</button>
</form>

<style lang="scss">
	form {
		flex-direction: column;
		display: flex;
		gap: 10px;
	}

	input {
		width: 100%;
	}
</style>
