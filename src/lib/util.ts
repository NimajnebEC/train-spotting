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

export function persist<T>(key: string, initialValue: T) {
	let value = JSON.parse(localStorage.getItem(key) ?? "null") ?? initialValue;

	return {
		get value(): T {
			return value;
		},
		set value(v: T) {
			localStorage.setItem(key, JSON.stringify(v));
			value = v;
		},
	};
}
