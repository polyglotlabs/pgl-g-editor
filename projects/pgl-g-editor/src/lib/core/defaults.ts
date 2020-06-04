import { PGLEditorOptions, Gutenberg } from './types';
import { makeSocialLink } from '../react-factories/social-links/social-link';

const settings = {
    alignWide: true,
    availableTemplates: [],
    allowedBlockTypes: true,
    disableCustomColors: false,
    disableCustomFontSizes: false,
    disablePostFormats: false,
    titlePlaceholder: 'Add title',
    bodyPlaceholder: 'Insert your custom block',
    isRTL: false,
    autosaveInterval: 3,
    style: [],
    imageSizes: [],
    richEditingEnabled: true,
    postLock: {
        isLocked: false,
    },
    postLockUtils: {
        nonce: '123456789',
    },
    enableCustomFields: true,
    mediaLibrary: true,
}

const userSettings = {
    secure: '',
    time: 1234567,
};

// API settings
const wpApiSettings = {
    root: '/api/',
    nonce: '123456789',
    versionString: 'wp/v2/',
};

// postboxes
const postboxes = {
    add_postbox_toggles: (page, args) => {
        console.log('page', page);
        console.log('args', args);
    },
};

const filters = [
   ({ hooks }) => {
    hooks.addFilter(
        'blocks.getSaveElement', 'core/social-link', (el, type, attr) => {
            console.log('hooks ', el, type, attr)
            if(el || !type.parent || !(type.parent as string[]).includes('core/social-links')){
                return el;
            }

            return makeSocialLink(type, attr)
        }
    )
   }
]

const actions = [
    (g: Gutenberg) => {
        const { createNonceMiddleware, use } = g.apiFetch
        const nonceMiddleware = createNonceMiddleware(wpApiSettings.nonce);

        use(nonceMiddleware);

        g.hooks.addAction(
            'heartbeat.tick',
            'core/api-fetch/create-nonce-middleware',
            (response) => (nonceMiddleware.nonce = response.rest_nonce || nonceMiddleware.nonce)
        );
    }
]

const unregisterBlocks = [
    'core/rss',
    'core/archives',
    'core/shortcode',
    'core/calendar',
    'core/categories',
    'core/latest-posts',
    'core/latest-comments',
    'core/tag-cloud'
]

export const PGL_G_DEFAULT_OPTIONS: PGLEditorOptions = {
    wpApiSettings,
    userSettings,
    postboxes,
    settings,
    filters,
    actions,
    unregisterBlocks
}


