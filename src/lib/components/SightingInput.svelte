<script lang="ts">
	import { faHashtag, faFont, faTrash } from "@fortawesome/free-solid-svg-icons";
	import { slide } from "svelte/transition";
	import { sineIn } from "svelte/easing";
	import { local } from "$lib/pouchdb";
	import Fa from "svelte-fa";

	let location: string = window.localStorage.getItem("location") ?? "";
	let inputs: { value: string; simple: boolean }[] = [];

	$: if (!inputs.some((i) => i.value == "")) inputs = [...inputs, { value: "", simple: true }];
	$: window.localStorage.setItem("location", location);

	async function submit() {
		const a = await local.bulkDocs(
			inputs
				.filter((v) => v.value != "")
				.map((v, i) => ({
					_id: (new Date().getTime() + i).toString(),
					classification: v.value,
					type: "sighting",
					location,
				})),
		);

		inputs = [];
	}

	function clear() {
		if (inputs.length > 0 && confirm("Clear input entries?")) inputs = [];
	}
</script>

<div class="container">
	<label>
		Location:
		<input type="text" autocomplete="off" placeholder="Brighton" bind:value={location} />
	</label>
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label>
		Sightings:
		<div class="container">
			{#each inputs as input}
				<span class="input-container" transition:slide={{ easing: sineIn, duration: 150 }}>
					<input
						autocomplete="off"
						value={input.value}
						placeholder="700128"
						type={input.simple ? "number" : "text"}
						on:input={(e) => (input.value = e.currentTarget.value)}
					/>
					<button on:click|preventDefault={() => (input.simple = !input.simple)} class="secondary">
						<Fa icon={input.simple ? faHashtag : faFont} />
					</button>
				</span>
			{/each}
		</div>
	</label>
	<span>
		<button on:click={submit}>Submit</button>
		<button on:click={clear}><Fa icon={faTrash} /></button>
	</span>
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

	.input-container {
		display: flex;
		gap: 5px;

		button {
			min-width: 35px;
		}
	}
</style>
