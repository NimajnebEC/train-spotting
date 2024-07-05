<script lang="ts">
	import { onChange } from "$lib/util";
	import { local } from "$lib/pouchdb";

	let sightings: Record<string, any>[] = [];

	onChange(async () => {
		await local.createIndex({ index: { fields: ["type", "_id"] } });

		const result = await local.find({
			selector: { type: "sighting", _id: { $gte: null } },
			sort: [{ _id: "desc" }],
			limit: 50,
		});

		sightings = result.docs;
	});
</script>

<div class="table-container">
	<table>
		{#each sightings as sighting}
			<tr>
				<td>{sighting.classification}</td>
				<td>{sighting.location}</td>
				<td
					>{new Date(sighting.date).toLocaleDateString("en-uk", {
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
