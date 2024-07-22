import { writable, readonly } from "svelte/store";
import "./pouchdb";
import "./pouchdb.find";

export const db = new PouchDB("spotter", { auto_compaction: true });

let remote: PouchDB.Database | null = null;
