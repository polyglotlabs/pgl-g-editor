import { GenericObj, Link, DbPayload } from './db-base';
import { log } from '../log/log.class';
import { USERS } from './data/USERS';

export type AvatarURL = Record<number, string>

export interface DbUser extends GenericObj {
	id: number;
	name: string;
	url: string;
	description: string;
	link: string;
	slug: string;
	avatar_urls: AvatarURL;
	meta: any[];
	_links: Link;
}

export type DbUserPayload = DbPayload<DbUser>;
export type DbUsersPayLoad = DbPayload<Record<string, DbUser>>;

export class UserDatabase {

    getAllUsers(): DbUsersPayLoad {
        log.Info(`Getting all users...`)
        return [USERS || {}, null]
    }

    getUserByName(prop: string | number): DbUserPayload {
        log.Info(`Finding user with name: ${prop}`);
        let error: Error = null;
        const user = typeof prop == 'number' || !isNaN(+prop)? this.getUser(+prop)[0] :  Object.values(USERS).find(u => u.name === prop) || null
        if (!user) {
            error = new Error(`Could not find user with name ${prop}`);
        }
        return [user, error];
    }
    getUser(id: number): DbUserPayload {
        log.Info(`Finding user with id: ${id}`);
        let error: Error = null;
        const user = USERS[id] || null
        if (!user) {
            error = new Error(`Could not find user with id ${id}`);
        }
        return [user, error];
    }
}