import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { changeType } from '../globals/fake-data';
import types from '../core/types.json';
import { LoaderService } from '../loader.service';
// import apiFetch from '../globals/api-fetch';
// import '../core/settings.js';
// import '../core/api-fetch.js';
import * as media from '../core/media-upload';
import { WINDOW, GUTENBERG, Gutenberg, GWindows } from '../core/types';
// import '../gutenberg/wp-polyfill.min.js'
// import '../gutenberg/hooks/index.js';
// import '../gutenberg/edit-post/index.js';

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements AfterViewInit {
    state;
    types = types;
    data;
    editPost;
    domReady;
    constructor(
        private _ls: LoaderService,
        @Inject(WINDOW) private _w: GWindows,
        @Inject(GUTENBERG) private _g: Gutenberg
    ) {
        let type = window.location.pathname.replace(/\//g, '');
        type = type.slice(0, -1);

        this.state = {
            postType: type || 'page',
        };
    }

    ngOnInit(): void {
        // this._ls.loadAll().subscribe(
        //     (resp) => {
        //         console.log('value', resp);
        //         this.setReactComponents();
        //         this.loadSettings();
        //         this.loadEditor();
        //     },
        //     (err) => console.log(err)
        // );
    }

    ngAfterViewInit(): void {
        this.setReactComponents()
        this.loadSettings();
        this.loadEditor();
    }

    resetLocalStorage(ev) {
        ev.preventDefault();

        localStorage.removeItem('g-editor-page');
        sessionStorage.removeItem('wp-autosave-block-editor-post-1');
        window.location.reload();
    }

    changePostType(ev, type) {
        ev.preventDefault();
        // update postType in localStorage before reload the editor
        const slug = type.slice(0, -1);
        changeType(slug);

        window.location.replace(type);
    }
    loadEditor() {
        // const { data, editPost, domReady } = (window as any).wp;
        // this.data = data;
        // this.editPost = editPost;
        // this.domReady = domReady;

        const { postType } = this.state;

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
        };

        // Disable publish sidebar
        this._g.data.dispatch('core/editor').disablePublishSidebar();

        // Disable tips
        this._g.data.dispatch('core/nux').disableTips();

        // Initialize the editor
        this._w._wpLoadBlockEditor = new Promise((resolve) => {
            this._g.domReady(() => {
                resolve(
                    this._g.editPost.initializeEditor(
                        'editor',
                        postType,
                        1,
                        settings,
                        {}
                    )
                );
            });
        });
    }
    loadSettings() {
        const { use: use2, plugins } = this._g.data;

        const uid = (this._w.userSettings && this._w.userSettings.uid) || 1;
        const storageKey = `PGL_G_EDITOR_DATA_${uid}`;

        use2(plugins.persistence, { storageKey });
        plugins.persistence.__unstableMigrate({ storageKey });

        this._w.userSettings = {
            secure: '',
            time: 1234567,
            uid: 1,
        };

        // API settings
        this._w.wpApiSettings = {
            root: '/api/',
            nonce: '123456789',
            versionString: 'wp/v2/',
        };

        // postboxes
        this._w.postboxes = this._w.postboxes || {
            add_postbox_toggles: (page, args) => {
                console.log('page', page);
                console.log('args', args);
            },
        };
        const {
            use,
            createNonceMiddleware,
            createRootURLMiddleware,
            setFetchHandler,
        } = this._g.apiFetch;

        const nonceMiddleware = createNonceMiddleware(this._w.wpApiSettings.nonce);

        use(nonceMiddleware);

        this._w.wp.hooks.addAction(
            'heartbeat.tick',
            'core/api-fetch/create-nonce-middleware',
            function (response) {
                if (response.rest_nonce) {
                    nonceMiddleware.nonce = response.rest_nonce;
                }
            }
        );

        use(createRootURLMiddleware(this._w.wpApiSettings.root));

        // setFetchHandler(apiFetch);
    }

    setReactComponents() {
        const {
            wp: {
                components: { Popover },
                data: { withSelect },
                hooks: { addFilter },
            },
        } = window as any;
        media.createMediaComponents({ Popover, withSelect, addFilter });
    }
}
