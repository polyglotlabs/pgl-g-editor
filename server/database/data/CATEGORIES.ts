import { DbCategory } from '../db-category';
export const CATEGORIES: Record<number, DbCategory> = {
    2: {
        id: 2,
        count: 3,
        description: 'Neque quibusdam nihil sequi quia et inventore dolorem dolores et consequuntur nostrum delectus esse cum et voluptatem ut rerum et accusamus quae vel neque laudantium optio rerum asperiores assumenda rerum qui eius neque dolores id quibusdam id optio ut eius dolor qui quas non',
        link: 'https://demo.wp-api.org/category/aut-architecto-nihil/',
        name: 'Aut architecto nihil',
        slug: 'aut-architecto-nihil',
        taxonomy: 'category',
        parent: 0,
        meta: [],
        _links: {
            self: [
                { href: 'https://demo.wp-api.org/wp-json/wp/v2/categories/2' },
            ],
            collection: [
                { href: 'https://demo.wp-api.org/wp-json/wp/v2/categories' },
            ],
            about: [
                {
                    href: 'https://demo.wp-api.org/wp-json/wp/v2/taxonomies/category',
                },
            ],
            'wp:post_type': [
                {
                    href: 'https://demo.wp-api.org/wp-json/wp/v2/posts?categories=2',
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
    11: {
        id: 11,
        count: 7,
        description: 'Rem recusandae velit et incidunt labore qui explicabo veritatis eos quod dolor dolor occaecati nobis in suscipit et quo impedit repellat eius voluptatem',
        link: 'https://demo.wp-api.org/category/facilis-dignissimos/',
        name: 'Facilis dignissimos',
        slug: 'facilis-dignissimos',
        taxonomy: 'category',
        parent: 0,
        meta: [],
        _links: {
            self: [
                {
                    href: 'https://demo.wp-api.org/wp-json/wp/v2/categories/11',
                },
            ],
            collection: [
                {
                    href: 'https://demo.wp-api.org/wp-json/wp/v2/categories',
                },
            ],
            about: [
                {
                    href: 'https://demo.wp-api.org/wp-json/wp/v2/taxonomies/category',
                },
            ],
            'wp:post_type': [
                {
                    href: 'https://demo.wp-api.org/wp-json/wp/v2/posts?categories=11',
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
    1: {
        id: 1,
        count: 5,
        description: '',
        link: 'https://demo.wp-api.org/category/uncategorized/',
        name: 'Uncategorized',
        slug: 'uncategorized',
        taxonomy: 'category',
        parent: 0,
        meta: [],
        _links: {
            self: [
                {
                    href: 'https://demo.wp-api.org/wp-json/wp/v2/categories/1',
                },
            ],
            collection: [
                {
                    href: 'https://demo.wp-api.org/wp-json/wp/v2/categories',
                },
            ],
            about: [
                {
                    href: 'https://demo.wp-api.org/wp-json/wp/v2/taxonomies/category',
                },
            ],
            'wp:post_type': [
                {
                    href: 'https://demo.wp-api.org/wp-json/wp/v2/posts?categories=1',
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
