/// <reference types="pouchdb-core" />

export type SightingDoc = {
	classification: string;
	location: string;
} & Core.ExistingDocument;
