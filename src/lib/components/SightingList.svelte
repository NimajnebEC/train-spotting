<script lang="ts">
	import type { SightingDoc } from "./types";
	import { onChange } from "$lib/util";
	import { db } from "$lib/pouchdb";

	let days: [string, SightingDoc[]][] = [];

	onChange(async () => {
		await db.createIndex({ index: { fields: ["type", "_id"] } });

		const result = await db.find({
			selector: { type: "sighting", _id: { $gte: null } },
			sort: [{ _id: "desc" }],
		});

		days = Object.entries(
			Object.groupBy<number, SightingDoc>(result.docs, (i) => {
				const day = new Date(Number(i._id));
				day.setHours(0);
				day.setMinutes(0);
				day.setSeconds(0);
				day.setMilliseconds(0);
				return day.getTime();
			}),
		).map(([k, v]) => [
			new Date(Number(k)).toLocaleDateString("en-uk", {
				year: "numeric",
				month: "long",
				day: "numeric",
			}),
			v,
		]) as [string, SightingDoc[]][];
	}, true);
</script>

<div class="list">
	{#each days as [day, sightings]}
		<div class="heading">{day}</div>
		{#each sightings as sighting}
			<div class="identity">{sighting.classification}</div>
			<div class="location">{sighting.location}</div>
		{/each}
	{/each}
</div>

<style lang="scss">
	.list {
		grid-template-rows: repeat(auto, auto);
		grid-template-columns: repeat(2, auto);
		display: grid;
		gap: 5px;

		.heading {
			grid-area: auto / 1 / auto / 3;
			background-color: var(--bg-3);
			border-radius: 5px;
			padding: 5px 5px;
		}

		.identity {
			padding-left: 5px;
		}

		.location {
			text-overflow: ellipsis;
			white-space: nowrap;
			padding-right: 5px;
			text-align: right;
			overflow: hidden;
		}
	}
</style>
