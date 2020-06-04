import { DbPost } from '../db-post';
import { DATE } from './COMMON';
export const POSTS: Record<number, DbPost> = {
    1: {
        id: 1,
        content: {
            raw: '',
            rendered: '',
        },
        date: DATE,
        date_gmt: DATE,
        title: {
            raw: 'Preview post',
            rendered: 'Preview post',
        },
        excerpt: {
            raw: '',
            rendered: '',
        },
        status: 'draft',
        revisions: { count: 0, last_id: 0 },
        parent: 0,
        theme_style: true,
        type: 'post',
        link: `/preview`,
        categories: [],
        featured_media: 0,
        permalink_template: `/preview`,
        preview_link: `/preview`,
        _links: {
            'wp:action-assign-categories': [],
            'wp:action-create-categories': [],
        },
    }
};
