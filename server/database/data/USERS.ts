import { DbUser } from '../db-user';

export const USERS: Record<number, DbUser> = {
    1: {
        id: 1,
        name: 'Human Made',
        url: '',
        description: '',
        link: 'https://demo.wp-api.org/author/humanmade/',
        slug: 'humanmade',
        avatar_urls: {
            24:
                'https://secure.gravatar.com/avatar/83888eb8aea456e4322577f96b4dbaab?s=24&d=mm&r=g',
            48:
                'https://secure.gravatar.com/avatar/83888eb8aea456e4322577f96b4dbaab?s=48&d=mm&r=g',
            96:
                'https://secure.gravatar.com/avatar/83888eb8aea456e4322577f96b4dbaab?s=96&d=mm&r=g',
        },
        meta: [],
        _links: {
            self: [
                {
                    href: 'https://demo.wp-api.org/wp-json/wp/v2/users/1',
                },
            ],
            collection: [
                {
                    href: 'https://demo.wp-api.org/wp-json/wp/v2/users',
                },
            ],
        },
    },
};
