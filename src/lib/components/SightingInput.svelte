<script lang="ts">
	import { faHashtag, faFont, faTrash } from "@fortawesome/free-solid-svg-icons";
	import { slide } from "svelte/transition";
	import { sineIn } from "svelte/easing";
	import { db } from "$lib/pouchdb";
	import Fa from "svelte-fa";

	let location: string = window.localStorage.getItem("location") ?? "";
	let inputs: { id: string; simple: boolean; bind?: HTMLInputElement }[] = [];

	$: window.localStorage.setItem("location", location);

	function updateInputs() {
		if (!inputs.some((i) => i.bind?.value == ""))
			inputs = [...inputs, { id: crypto.randomUUID(), simple: true }];
	}

	function keyDown(e: KeyboardEvent, i: number) {
		if (e.key == "Enter" && i < inputs.length - 1) inputs[i + 1].bind?.focus();
		else if (e.key == "Backspace" && inputs[i].bind?.value == "" && inputs.length > 1) {
			if (i != inputs.length - 1)
				inputs = [...inputs.slice(0, i), ...inputs.slice(i + 1, inputs.length)];
			inputs[Math.max(0, i - 1)].bind?.focus();
		}
	}

	function clear() {
		if (inputs.length > 0 && confirm("Clear input entries?")) inputs = [];
		updateInputs();
	}

	function toggle(i: number) {
		inputs[i].simple = !inputs[i].simple;
		inputs[i].bind?.focus();
	}

	async function submit() {
		await db.bulkDocs(
			inputs
				.filter((e) => e.bind?.value != "")
				.map((e, i) => ({
					_id: (new Date().getTime() + i).toString(),
					classification: e.bind!.value,
					type: "sighting",
					location,
				})),
		);

		inputs = [];
		updateInputs();
	}

	updateInputs();
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
			{#each inputs as input, i (input.id)}
				<span class="input-container" transition:slide={{ easing: sineIn, duration: 150 }}>
					<input
						autocomplete="off"
						placeholder="700128"
						bind:this={input.bind}
						on:input={updateInputs}
						on:keydown={(e) => keyDown(e, i)}
						pattern={input.simple ? "\\d*" : ".+"}
						type={input.simple ? "number" : "text"}
					/>
					<button class="secondary" on:click|preventDefault={() => toggle(i)}>
						<Fa icon={input.simple ? faHashtag : faFont} />
					</button>
				</span>
			{/each}
		</div>
	</label>
	<span>
		<button class="primary" on:click={submit}>Submit</button>
		<button class="primary" on:click={clear}><Fa icon={faTrash} /></button>
	</span>
</div>

<style lang="scss">
	.container {
		flex-direction: column;
		display: flex;
		gap: 10px;
	}

	.input-container {
		display: flex;
		gap: 5px;

		button {
			min-width: 35px;
		}
	}
</style>
