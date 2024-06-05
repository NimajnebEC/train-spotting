<script lang="ts">
	import { db, type Sighting } from "$lib/db";
	import { onMount } from "svelte";

	let sightings: Omit<Sighting, "id">[] = [];
	let form: HTMLFormElement;

	onMount(async () => {
		sightings = await db.sightings.toArray();
	});

	async function submit() {
		const data = Object.fromEntries(new FormData(form).entries());
		const sighting: Omit<Sighting, "id"> = {
			classification: data.classification.toString(),
			date: new Date(),
		};

		await db.sightings.add(sighting);
		sightings = [sighting, ...sightings];
	}
</script>

<form on:submit|preventDefault={submit} bind:this={form}>
	<input type="text" name="classification" autocomplete="off" />
	<button type="submit">Submit</button>
</form>

<hr />

<table>
	{#each sightings as sighting}
		<tr>
			<td>{sighting.classification}</td>
			<td
				>{sighting.date.toLocaleDateString("en-uk", {
					weekday: "short",
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

<style lang="scss">
	form {
		flex-direction: column;
		display: flex;
		gap: 10px;
	}

	input {
		width: 100%;
	}

	table {
		margin-top: 10px;
		width: 100%;
	}
</style>
