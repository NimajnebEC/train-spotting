import Dexie, { type EntityTable } from "dexie";

export interface Sighting {
	id: number;
	date: Date;
	classification: string;
}

export const db = new Dexie("spotter") as Dexie & {
	sightings: EntityTable<Sighting, "id">;
};

db.version(1).stores({
	sightings: "++id, date, classification",
});
