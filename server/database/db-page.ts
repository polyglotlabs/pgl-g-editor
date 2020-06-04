import { DbPayload, DbPropertyContext, GenericObj, ContextProporty } from './db-base';
import { log } from '../log/log.class';
import { PAGES } from './data/PAGES';

export interface DbPage extends GenericObj {
    id: number;
    content: string | DbPropertyContext;
    date: string;
    date_gmt: string;
    title: string | DbPropertyContext;
    excerpt: string | DbPropertyContext;
    status: string;
    revisions: DbRevisions;
    parent: number;
    theme_style: boolean;
    type: string;
    link: string;
    categories: string[];
    featured_media: number;
    permalink_template: string;
    preview_link: string;
    _links: Record<string, []>;
}

export interface DbRevisions extends GenericObj {
    count: number;
    last_id: number;
}
export type DbPagePayload = DbPayload<DbPage>;

export class PageDatabase extends ContextProporty {
    private static _lastPageID = 2;
    private static _clearedPageIDs = [];

    createPage(data?: Partial<DbPage>): DbPage {
        log.Info(`Creating new page`, data);
        data.id =
            PageDatabase._clearedPageIDs.length > 0
                ? PageDatabase._clearedPageIDs.pop()
                : ++PageDatabase._lastPageID;
        PAGES[data.id] = data as DbPage;
        return data as DbPage;
    }

    savePage(id, { title, content, excerpt, ...other }: Partial<DbPage> = {}): [
        DbPage,
        Error
    ] {
        log.Info(`Saving page:
            id: ${id},
            slug: ${other.slug},
            title: ${title},
            content: ${content},
            excerpt: ${excerpt}
        `);
        [title, content, excerpt ] = this.toPropertyContext(title, content, excerpt);
        
        if (!id) {
            return [
                this.createPage({ ...other, title, content, excerpt }),
                null,
            ];
        }
        const [page, err] = this.getPage(id);
        if (err) {
            return [null, err];
        }
        page.title = title || page.title;
        page.content = content || page.content;
        page.excerpt = excerpt || page.excerpt;
        PAGES[id] = page;
        return [page, null];
    }

    deletePage(id: number): Error {
        log.Info(`Deleting page with id: ${id}`);
        if (PageDatabase._clearedPageIDs.includes(id) || !(id in PAGES)) {
            return new Error(`Page with id ${id} does not exist`);
        }
        PageDatabase._clearedPageIDs.push(id);
        return null;
    }

    getPage(id: number): DbPagePayload {
        log.Info(`Finding page with id: ${id}`);
        let error: Error = null;
        const page =
            id in PAGES && !PageDatabase._clearedPageIDs.includes(id)
                ? PAGES[id]
                : null;
        if (!page) {
            error = new Error(`Could not find page with id ${id}`);
        }
        return [page, error];
    }
}
