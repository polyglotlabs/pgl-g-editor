import { DbPayload, GenericObj } from "./db-base";
import { TYPES } from "./data/TYPES";
import { log } from "../log/log.class";

export interface DbType extends GenericObj {
    id: number;
    name: string;
    rest_base: string;
    slug: string;
    supports: Partial<DbSupport>;
    viewable: boolean;
}

export interface DbSupport extends GenericObj{
    author: boolean;
    comments: boolean;
    "custom-fields": boolean;
    discussion: boolean;
    editor: boolean;
    excerpt: boolean;
    "page-attributes": boolean;
    revisions: boolean;
    thumbnail: boolean;
    title: boolean;
}

export type DbTypePayload = DbPayload<DbType>;
export type DbTypesPayload = DbPayload<Record<string, DbType>>;

export class TypeDatabase {
    private _lastTypeID = 2;
    private _clearedTypeIDs = [];

    createType(data?: DbType): DbTypePayload {
        log.Info(`Creating new type`, data);
        if (data.name in TYPES) {
            return [
                null,
                new Error(`Type with name ${data.name} already exists`),
            ];
        }
        data.id =
            this._clearedTypeIDs.length > 0
                ? this._clearedTypeIDs.pop()
                : ++this._lastTypeID;
        TYPES[data.name] = data;
        return [data, null];
    }

    saveType(data?: DbType): DbTypePayload {
        log.Info(`Saving page:`, data);
        if (!data.id) {
            return this.createType(data);
        }
        const [, error] = this.getType(data.id);
        if (!error) {
            return [null, new Error(`Cound not find with id ${data.id}`)];
        }
    }
    deleteType() {}

    getType(id: number): DbTypePayload {
        log.Info(`Finding type with name: ${name}`);
        let error: Error = null;
        const type = Object.values(TYPES).find((t) => t.id == id);
        if (!type) {
            error = new Error(`Could not find type with id = '${id}'`);
        }
        return [type, error];
    }

    getTypes(): DbTypesPayload {
        log.Info(`Getting all types`);
        return [TYPES, null]
    }

    getTypeByName(name: string): DbTypePayload {
        log.Info(`Finding type with name: ${name}`);
        let error: Error = null;
        const type = name in TYPES ? TYPES[name] : null;
        if (!type) {
            error = new Error(`Cound not find type with name = '${name}'`);
        }
        return [type, error];
    }
}
