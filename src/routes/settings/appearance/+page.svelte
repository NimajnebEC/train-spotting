<script lang="ts">
	import { faArrowsLeftRightToLine, faGripLinesVertical } from "@fortawesome/free-solid-svg-icons";
	import { padding } from "$lib/components/Navbar.svelte";
	import Slider from "$lib/components/Slider.svelte";
</script>

<div class="container">
	<h2>Appearance</h2>
	<p class="secondary">Customise the appearance of the application.</p>
	<hr />
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label>
		Navbar Padding
		<Slider
			bind:value={$padding}
			icons={[faGripLinesVertical, faArrowsLeftRightToLine]}
			props={{ max: 20, step: 2 }}
		/>
	</label>
</div>

<style lang="scss">
	.container {
		flex-direction: column;
		display: flex;
		gap: 10px;
	}

	hr {
		margin: 10px 0;
	}
</style>
