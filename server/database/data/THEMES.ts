import { DbTheme } from '../db-theme';
export const THEMES: DbTheme[] = [
    {
        id: 1,
        theme_supports: {
            formats: [
                'standard',
                'aside',
                'image',
                'video',
                'quote',
                'link',
                'gallery',
                'audio',
            ],
            'post-thumbanials': true,
            'responsive-embeds': false,
        },
    },
];
