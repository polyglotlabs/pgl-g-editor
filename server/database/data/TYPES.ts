import { DbType } from '../db-type';
export const TYPES: Record<string, DbType> = {
    page: {
        id: 1,
        name: 'Pages',
        rest_base: 'pages',
        slug: 'page',
        supports: {
            author: false,
            comments: false,
            'custom-fields': false,
            discussion: false,
            editor: true,
            excerpt: false,
            'page-attributes': false,
            revisions: false,
            thumbnail: false,
            title: false,
        },
        viewable: true,
    },
    attachment: {
        id: 2,
        description: '',
        hierarchical: false,
        viewable: true,
        name: 'Media',
        slug: 'attachment',
        supports: {
            title: true,
            author: true,
            comments: true,
        },
        taxonomies: [],
        rest_base: 'media',
        _links: {
            collection: [
                {
                    href: 'https://demo.wp-api.org/wp-json/wp/v2/types',
                },
            ],
            'wp:items': [
                {
                    href: 'https://demo.wp-api.org/wp-json/wp/v2/media',
                },
            ],
            curies: [
                {
                    name: 'wp',
                    href: 'https://api.w.org/{rel}',
                    templated: true,
                },
            ],
        },
    },
    wp_block: {
        id: 3,
        description: '',
        hierarchical: false,
        viewable: false,
        name: 'Blocks',
        slug: 'wp_block',
        supports: {
            title: true,
            editor: true,
        },
        taxonomies: [],
        rest_base: 'blocks',
        _links: {
            collection: [
                {
                    href: 'https://demo.wp-api.org/wp-json/wp/v2/types',
                },
            ],
            'wp:items': [
                {
                    href: 'https://demo.wp-api.org/wp-json/wp/v2/blocks',
                },
            ],
            curies: [
                {
                    name: 'wp',
                    href: 'https://api.w.org/{rel}',
                    templated: true,
                },
            ],
        },
        headers: [],
    },
    post: {
        id: 4,
        description: '',
        hierarchical: false,
        viewable: true,
        name: 'Posts',
        slug: 'post',
        supports: {
            author: false,
            comments: false,
            'custom-fields': true,
            editor: true,
            excerpt: false,
            'page-attributes': false,
            revisions: false,
            thumbnail: false,
            title: true,
            'post-formats': true,
        },
        taxonomies: ['category', 'post_tag'],
        rest_base: 'posts',
        _links: {
            collection: [
                {
                    href: 'https://demo.wp-api.org/wp-json/wp/v2/types',
                },
            ],
            'wp:items': [
                {
                    href: 'https://demo.wp-api.org/wp-json/wp/v2/posts',
                },
            ],
            curies: [
                {
                    name: 'wp',
                    href: 'https://api.w.org/{rel}',
                    templated: true,
                },
            ],
        },
    },
};
