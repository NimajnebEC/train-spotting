import { writable, type Readable, type Writable } from "svelte/store";
import { onMount, onDestroy } from "svelte";
import { db } from "$lib/pouchdb";

export function onChange(fn: () => void) {
	let listener: PouchDB.Core.Changes<{}> | undefined;

	onDestroy(() => listener?.cancel());
	onMount(() => {
		listener = db.changes({ live: true, since: "now" }).on("change", fn);
		fn();
	});
}

export function gettable<T, S>(store: S & Readable<T>): { get: () => T } & S {
	let value: T;
	store.subscribe((v) => (value = v));
	return {
		...store,
		get(): T {
			return value;
		},
	};
}

export function persist<T>(key: string): Writable<T | undefined>;
export function persist<T>(key: string, initial: T): Writable<T>;
export function persist<T>(key: string, initial?: T): Writable<T> {
	const store = writable(JSON.parse(localStorage.getItem(key) ?? "null") ?? initial);
	store.subscribe((v) => (v === undefined ? null : localStorage.setItem(key, JSON.stringify(v))));
	return store;
}
