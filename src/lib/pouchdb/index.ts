import "./pouchdb";
import "./pouchdb.find";

export const db = new PouchDB("spotter", { auto_compaction: true });
