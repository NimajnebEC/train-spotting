import { writable, type Readable, type Writable } from "svelte/store";
import { SvelteComponent } from "svelte";

function isWritable<T>(store: Readable<T>): store is Writable<T> {
	return (<Writable<any>>store).set !== undefined;
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

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
	store.subscribe((v) => {
		if (v === undefined) localStorage.removeItem(key);
		else localStorage.setItem(key, JSON.stringify(v));
	});

	return store;
}
