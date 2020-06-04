import { GenericObj, DbPayload, Link } from './db-base';
import { log } from '../log/log.class';
import { CATEGORIES } from "./data/CATEGORIES";

export interface DbCategory extends GenericObj{
    id: number;
	count: number;
	description: string;
	link: string;
	name: string;
	slug: string;
	taxonomy: string;
	parent: number;
	meta: any[];
	_links: Link;
}

export type DbCategoryPayload = DbPayload<DbCategory>;
export type DbCategorysPayload = DbPayload<DbCategory[]>;

export class CategoryDatabase {
    static _lastCategoryID = 2;
    static _clearedCategoryIDs = [];

    getAllCategories(): DbCategorysPayload {
        log.Info(`Getting all categories`);
        return [Object.values(CATEGORIES || {}), null]
    }

    getCategory(id: number): DbCategoryPayload {
        log.Info(`Finding category with id: ${id}`);
        let error: Error = null;
        const category =
            id in CATEGORIES && !CategoryDatabase._clearedCategoryIDs.includes(id)
                ? CATEGORIES[id]
                : null;
        if (!category) {
            error = new Error(`Could not find category with id ${id}`);
        }
        return [category, error];
    }
}