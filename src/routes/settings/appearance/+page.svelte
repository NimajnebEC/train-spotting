<script lang="ts">
	import { faArrowsLeftRightToLine, faGripLinesVertical } from "@fortawesome/free-solid-svg-icons";
	import { padding } from "$lib/components/Navbar.svelte";
	import Slider from "$lib/components/Slider.svelte";
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label>
	Navbar Padding
	<Slider
		bind:value={$padding}
		icons={[faGripLinesVertical, faArrowsLeftRightToLine]}
		props={{ max: 20, step: 2 }}
	/>
</label>
