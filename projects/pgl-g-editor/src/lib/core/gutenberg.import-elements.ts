import { StoreStyle, StoreScript } from './store';

export const AssetOptions = {
    link: {
        rel: 'stylesheet'
    },
    script: {
        type: 'text/javascript',
        defer: true,
    }

}
export const StyleStore: StoreStyle[] = [
    { attr: 'href', elementType: 'link', name: 'components', src: "assets/gutenberg/components/style.css"},
    { attr: 'href', elementType: 'link', name: 'bock-editor', src: "assets/gutenberg/block-editor/style.css"},
    { attr: 'href', elementType: 'link', name: 'nux', src: "assets/gutenberg/nux/style.css"},
    { attr: 'href', elementType: 'link', name: 'editor', src: "assets/gutenberg/editor/style.css"},
    { attr: 'href', elementType: 'link', name: 'editor-styles', src: "assets/gutenberg/editor/editor-styles.css"},
    { attr: 'href', elementType: 'link', name: 'block-library', src: "assets/gutenberg/block-library/style.css"},
    { attr: 'href', elementType: 'link', name: 'block-library-editor', src: "assets/gutenberg/block-library/editor.css"},
    { attr: 'href', elementType: 'link', name: 'block-library-themes', src: "assets/gutenberg/block-library/theme.css"},
    { attr: 'href', elementType: 'link', name: 'edit-post', src: "assets/gutenberg/edit-post/style.css"},
    { attr: 'href', elementType: 'link', name: 'format-library', src: "assets/gutenberg/format-library/style.css"},
    { attr: 'href', elementType: 'link', name: 'list-reusable-blocks', src: "assets/gutenberg/list-reusable-blocks/style.css"},
    { attr: 'href', elementType: 'link', name: 'block-directory', src: "assets/gutenberg/block-directory/style.css"}
]

export const ScriptStore: StoreScript[] = [
    // { name: 'wp', src: 'assets/js/wp-polyfill.min.js' },
    { name: 'hooks', src: 'assets/gutenberg/hooks/index.js' },
    { name: 'i18n', src: 'assets/gutenberg/i18n/index.js' },
    { name: 'url', src: 'assets/gutenberg/url/index.js' },
    {
        name: 'api-fetch',
        src: 'assets/gutenberg/api-fetch/index.js',
    },
    { name: 'blob', src: 'assets/gutenberg/blob/index.js' },
    { name: 'autop', src: 'assets/gutenberg/autop/index.js' },
    {
        name: 'block-serialization-default-parser',
        src: 'assets/gutenberg/block-serialization-default-parser/index.js',
    },
    {
        name: 'escape-html',
        src: 'assets/gutenberg/escape-html/index.js',
    },
    { name: 'element', src: 'assets/gutenberg/element/index.js' },
    {
        name: 'is-shallow-equal',
        src: 'assets/gutenberg/is-shallow-equal/index.js',
    },
    { name: 'compose', src: 'assets/gutenberg/compose/index.js' },
    {
        name: 'priority-queue',
        src: 'assets/gutenberg/priority-queue/index.js',
    },
    {
        name: 'redux-routine',
        src: 'assets/gutenberg/redux-routine/index.js',
    },
    { name: 'data', src: 'assets/gutenberg/data/index.js' },
    { name: 'dom', src: 'assets/gutenberg/dom/index.js' },
    {
        name: 'html-entities',
        src: 'assets/gutenberg/html-entities/index.js',
    },
    {
        name: 'shortcode',
        src: 'assets/gutenberg/shortcode/index.js',
    },
    { name: 'blocks', src: 'assets/gutenberg/blocks/index.js' },
    { name: 'keycodes', src: 'assets/gutenberg/keycodes/index.js' },
    {
        name: 'rich-text',
        src: 'assets/gutenberg/rich-text/index.js',
    },
    {
        name: 'dom-ready',
        src: 'assets/gutenberg/dom-ready/index.js',
    },
    { name: 'a11y', src: 'assets/gutenberg/a11y/index.js' },
    {
        name: 'deprecated',
        src: 'assets/gutenberg/deprecated/index.js',
    },
    {
        name: 'components',
        src: 'assets/gutenberg/components/index.js',
    },
    {
        name: 'core-data',
        src: 'assets/gutenberg/core-data/index.js',
    },
    {
        name: 'token-list',
        src: 'assets/gutenberg/token-list/index.js',
    },
    { name: 'viewport', src: 'assets/gutenberg/viewport/index.js' },
    {
        name: 'wordcount',
        src: 'assets/gutenberg/wordcount/index.js',
    },
    {
        name: 'block-editor',
        src: 'assets/gutenberg/block-editor/index.js',
    },
    {
        name: 'block-directory',
        src: 'assets/gutenberg/block-directory/index.js',
    },
    { name: 'date', src: 'assets/gutenberg/date/index.js' },
    { name: 'notices', src: 'assets/gutenberg/notices/index.js' },
    { name: 'nux', src: 'assets/gutenberg/nux/index.js' },
    {
        name: 'data-controls',
        src: 'assets/gutenberg/data-controls/index.js',
    },
    {
        name: 'media-utils',
        src: 'assets/gutenberg/media-utils/index.js',
    },
    {
        name: 'server-side-render',
        src: 'assets/gutenberg/server-side-render/index.js',
    },
    { name: 'editor', src: 'assets/gutenberg/editor/index.js' },
    {
        name: 'block-library',
        src: 'assets/gutenberg/block-library/index.js',
    },
    { name: 'plugins', src: 'assets/gutenberg/plugins/index.js' },
    {
        name: 'edit-post',
        src: 'assets/gutenberg/edit-post/index.js',
    },
    {
        name: 'format-library',
        src: 'assets/gutenberg/format-library/index.js',
    },
    {
        name: 'annotations',
        src: 'assets/gutenberg/annotations/index.js',
    },
    {
        name: 'block-serialization-spec-parser',
        src: 'assets/gutenberg/block-serialization-spec-parser/index.js',
    },
    {
        name: 'edit-widgets',
        src: 'assets/gutenberg/edit-widgets/index.js',
    },
    {
        name: 'list-reusable-blocks',
        src: 'assets/gutenberg/list-reusable-blocks/index.js',
    }
];
