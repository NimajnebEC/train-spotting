import { onMount, onDestroy } from "svelte";
import { local } from "$lib/pouchdb";

export function onChange(fn: () => void) {
	let listener: PouchDB.Core.Changes<{}> | undefined;

	onDestroy(() => listener?.cancel());
	onMount(() => {
		listener = local.changes({ live: true }).on("change", fn);
		fn();
	});
}
