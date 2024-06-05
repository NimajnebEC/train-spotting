<script lang="ts">
	import { faTrash } from "@fortawesome/free-solid-svg-icons";
	import { db, type Sighting } from "$lib/db";
	import { onMount } from "svelte";
	import Fa from "svelte-fa";

	let sightings: Omit<Sighting, "id">[] = [];
	let classification: HTMLInputElement;
	let location: HTMLInputElement;
	let form: HTMLFormElement;

	onMount(async () => {
		sightings = await db.sightings.reverse().toArray();
		location.value = window.localStorage.getItem("location") ?? "";
	});

	async function submit() {
		const data = Object.fromEntries(new FormData(form).entries());

		const sighting: Omit<Sighting, "id"> = {
			classification: data.classification.toString(),
			location: data.location.toString(),
			date: new Date(),
		};

		window.localStorage.setItem("location", sighting.location);

		await db.sightings.add(sighting);
		sightings = [sighting, ...sightings];

		classification.value = "";
	}

	function clear() {
		if (!window.confirm("Clear all sightings?")) return;
		if (!window.confirm("Are you sure?")) return;
		if (!window.confirm("Absolutely Certain?")) return;
		if (!window.confirm("This is irreversable!!!")) return;
		db.sightings.clear();
		sightings = [];
	}
</script>

<form on:submit|preventDefault={submit} bind:this={form}>
	<input
		type="text"
		required
		name="location"
		autocomplete="off"
		placeholder="Brighton Central Station"
		bind:this={location}
	/>
	<input
		type="text"
		required
		name="classification"
		autocomplete="off"
		placeholder="700 128"
		bind:this={classification}
	/>
	<div>
		<button type="submit">Submit</button>
		<button on:click|preventDefault={clear}><Fa icon={faTrash} /></button>
	</div>
</form>

<hr />

<div class="table-container">
	<table>
		{#each sightings as sighting}
			<tr>
				<td>{sighting.classification}</td>
				<td>{sighting.location}</td>
				<td
					>{sighting.date.toLocaleDateString("en-uk", {
						year: "numeric",
						month: "numeric",
						day: "numeric",
						hour: "numeric",
						minute: "numeric",
					})}</td
				>
			</tr>
		{/each}
	</table>
</div>

<style lang="scss">
	form {
		flex-direction: column;
		display: flex;
		gap: 10px;
	}

	input {
		width: 100%;
	}

	.table-container {
		padding-bottom: 10px;
		overflow-x: auto;
		max-width: 100%;
	}

	table {
		margin-top: 10px;
		width: 100%;

		td {
			white-space: nowrap;
		}
	}
</style>
