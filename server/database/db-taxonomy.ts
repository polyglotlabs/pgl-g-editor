import { GenericObj, Link, DbPayload } from './db-base';
import { log } from '../log/log.class';
import { TAXONOMIES } from "./data/TAXONOMIES";

export interface Visibility {
	show_ui: boolean;
}

export interface DbTaxonomy extends GenericObj {
	name: string;
	slug: string;
	description: string;
	types: string[];
	visibility: Visibility;
	hierarchical: boolean;
	rest_base: string;
	_links: Link;
}

export type DbTaxonomyPayload = DbPayload<DbTaxonomy>;
export type DbTaxonomiesPayLoad = DbPayload<Record<string, DbTaxonomy>>;

export class TaxonomyDatabase {

    getAllTaxonomies(): DbTaxonomiesPayLoad {
        log.Info(`Getting all taxonomies...`)
        return [TAXONOMIES || {}, null]
    }

    getTaxonomy(name: string): DbTaxonomyPayload {
        log.Info(`Finding taxonomy with name: ${name}`);
        let error: Error = null;
        const taxonomy = TAXONOMIES[name] || null
        if (!taxonomy) {
            error = new Error(`Could not find post with name ${name}`);
        }
        return [taxonomy, error];
    }
}