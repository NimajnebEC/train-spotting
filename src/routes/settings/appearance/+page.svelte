<script lang="ts">
	import Slider from "$lib/components/Slider.svelte";
	import { persist } from "$lib/util";
	import { faArrowsLeftRightToLine, faGripLinesVertical } from "@fortawesome/free-solid-svg-icons";

	const navbarMargin = persist("navbar-margin", 0);
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label>
	Navbar Margin
	<Slider bind:value={$navbarMargin} icons={[faGripLinesVertical, faArrowsLeftRightToLine]} />
</label>

{$navbarMargin}
