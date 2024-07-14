import { onMount, onDestroy } from "svelte";
import { db } from "$lib/pouchdb";

export function onChange(fn: () => void) {
	let listener: PouchDB.Core.Changes<{}> | undefined;

	onDestroy(() => listener?.cancel());
	onMount(() => {
		listener = db.changes({ live: true }).on("change", fn);
		fn();
	});
}

export function state<T>(key: string, initialValue: T) {
	let value = JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue));

	return {
		get value() {
			return value;
		},
		set value(newValue) {
			value = newValue;
			localStorage.setItem(key, JSON.stringify(newValue));
		},
	};
}
