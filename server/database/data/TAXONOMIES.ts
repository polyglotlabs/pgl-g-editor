import { DbTaxonomy } from '../db-taxonomy';
export const TAXONOMIES: Record<string, DbTaxonomy> = {
    category: {
        name: 'Categories',
        slug: 'category',
        description: '',
        types: ['post'],
        visibility: { show_ui: false },
        hierarchical: true,
        rest_base: 'categories',
        _links: {
            collection: [
                {
                    href: 'https://demo.wp-api.org/wp-json/wp/v2/taxonomies',
                },
            ],
            'wp:items': [
                {
                    href: 'https://demo.wp-api.org/wp-json/wp/v2/categories',
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
    post_tag: {
        name: 'Tags',
        slug: 'post_tag',
        description: '',
        types: ['post'],
        visibility: { show_ui: false },
        hierarchical: false,
        rest_base: 'tags',
        _links: {
            collection: [
                {
                    href: 'https://demo.wp-api.org/wp-json/wp/v2/taxonomies',
                },
            ],
            'wp:items': [
                {
                    href: 'https://demo.wp-api.org/wp-json/wp/v2/tags',
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
