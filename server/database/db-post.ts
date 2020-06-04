import { DbPayload, ContextProporty } from './db-base';
import { log } from '../log/log.class';
import { PAGES } from './data/PAGES';
import { POSTS } from './data/POSTS';
import { DbPage } from './db-page';

export type DbPost = DbPage;

export type DbPostPayload = DbPayload<DbPost>;

export class PostDatabase extends ContextProporty {
    static _lastPostID = 2;
    static _clearedPostIDs = [];

    createPost(data?: Partial<DbPost>): DbPost {
        log.Info(`Creating new post`, data);
        data.id =
            PostDatabase._clearedPostIDs.length > 0
                ? PostDatabase._clearedPostIDs.pop()
                : ++PostDatabase._lastPostID;
        POSTS[data.id] = data as DbPost;
        return data as DbPost;
    }

    savePost(
        id,
        { title, content, excerpt, ...other }: Partial<DbPost> = {}
    ): [DbPost, Error] {
        log.Info(`Saving post:
        id: ${id},
        slug: ${other.slug},
        title: ${title},
        content: ${content},
        excerpt: ${excerpt}
    `);
        [title, content, excerpt] = this.toPropertyContext(
            title,
            content,
            excerpt
        );
        if (!id) {
            return [
                this.createPost({ ...other, title, content, excerpt }),
                null,
            ];
        }
        const [post, err] = this.getPost(id);
        if (err) {
            return [null, err];
        }
        post.title = title || post.title;
        post.content = content || post.content;
        post.excerpt = excerpt || post.excerpt;
        POSTS[id] = post;
        return [post, null];
    }
    deletePost(id: number): Error {
        log.Info(`Deleting post with id: ${id}`);
        if (PostDatabase._clearedPostIDs.includes(id) || !(id in POSTS)) {
            return new Error(`Post with id ${id} does not exist`);
        }
        PostDatabase._clearedPostIDs.push(id);
        return null;
    }

    getPost(id: number): DbPostPayload {
        log.Info(`Finding post with id: ${id}`);
        let error: Error = null;
        const page =
            id in PAGES && !PostDatabase._clearedPostIDs.includes(id)
                ? PAGES[id]
                : null;
        if (!page) {
            error = new Error(`Could not find post with id ${id}`);
        }
        return [page, error];
    }
}
