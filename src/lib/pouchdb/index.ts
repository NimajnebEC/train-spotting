import "./pouchdb";
import "./pouchdb.find";

export const local = new PouchDB("spotter", { auto_compaction: true });
