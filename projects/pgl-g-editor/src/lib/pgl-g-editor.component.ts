import { Component, OnInit, AfterViewInit, Inject, Input, OnDestroy, ElementRef } from '@angular/core';
import {
    GUTENBERG,
    WINDOW,
    GWindows,
    Gutenberg,
    Obj,
    PGLEditorOptions,
    PGL_G_EDITOR_DEFAULTS,
    PGLEditorTypes,
    LOCAL_STORAGE,
} from './core/types';
import apiFetch from '@wordpress/api-fetch';
import * as media from './react-factories/media/media-upload';
import React from 'react';
import { makeSocialLink } from './react-factories/social-links/social-link';

@Component({
    selector: 'pgl-g-editor',
    template: ` <div id="editor" className="gutenberg__editor"></div> `,
    styleUrls: ["./pgl-g-editor.component.scss"],
})
export class PglGEditorComponent implements OnInit, AfterViewInit, OnDestroy {
    static nextID = 1;
    @Input('PGLEditorTypes') options: PGLEditorOptions;

    get storageKey(): string {
        return `PGL_G_EDITOR_DATA_${this.options.uid}`;
    }
    constructor(
        private _el: ElementRef<HTMLElement>,
        @Inject(PGL_G_EDITOR_DEFAULTS) private editorDefaults: PGLEditorOptions,
        @Inject(WINDOW) private _w: GWindows,
        @Inject(LOCAL_STORAGE) private _ls: Storage,
        @Inject(GUTENBERG) private _g: Gutenberg
    ) {}

    ngOnInit(): void {
        const {
            postboxes = this._w.postboxes,
            postType = PGLEditorTypes.PAGE,
            settings = this.editorDefaults.settings,
            uid = this.editorDefaults.uid || (this._w.userSettings && this._w.userSettings.uid) || PglGEditorComponent.nextID++,
            wpApiSettings = this.editorDefaults.wpApiSettings,
            userSettings = this.editorDefaults.userSettings,
            filters = this.editorDefaults.filters,
            actions = this.editorDefaults.actions,
            unregisterBlocks = this.editorDefaults.unregisterBlocks
        } = this.options || {};
        this.options = {
            postType,
            settings,
            uid,
            postboxes,
            wpApiSettings,
            userSettings,
            filters,
            actions,
            unregisterBlocks
        };
    }

    ngAfterViewInit(): void {
        if (!this._g) {
            console.error('no gutenberg found!', this._g);
            return;
        }
        this.setReactComponents();
        this.loadSettings();
        this.loadEditor();
    }

    ngOnDestroy(): void {
        this._ls.removeItem(this.storageKey);
    }

    loadEditor() {
        const { postType, settings } = this.options;

        // Disable publish sidebar
        this._g.data.dispatch('core/editor').disablePublishSidebar();

        // Disable tips
        this._g.data.dispatch('core/nux').disableTips();

        // Initialize the editor
        this._w._wpLoadBlockEditor = new Promise((resolve) => {
            this._g.domReady(() => {
                resolve(this._g.editPost.initializeEditor('editor', postType, 1, settings, {}));
            });
        });
        this._w._wpLoadBlockEditor.then(_ => this.updateBlocks())
    }
    loadSettings() {
        const { use: use2, plugins } = this._g.data;
        const { userSettings, wpApiSettings, postboxes } = this.options;
        use2(plugins.persistence, { storageKey: this.storageKey });
        plugins.persistence.__unstableMigrate({ storageKey: this.storageKey });

        this._w.userSettings = userSettings;

        // API settings
        this._w.wpApiSettings = wpApiSettings;

        // postboxes
        this._w.postboxes = postboxes;
        console.log(
            `wp stuff:
            storage key: ${this.storageKey},
            w
        `,
            this._w
        );
        const { use, createRootURLMiddleware, setFetchHandler } = this._g.apiFetch;

        this.loadActions();
        this.loadFilters();
        this._g.hooks.addFilter()

        // const nonceMiddleware = createNonceMiddleware(wpApiSettings.nonce);

        // use(nonceMiddleware);

        // this._g.hooks.addAction(
        //     'heartbeat.tick',
        //     'core/api-fetch/create-nonce-middleware',
        //     (response) => (nonceMiddleware.nonce = response.rest_nonce || nonceMiddleware.nonce)
        // );

        // this._g.hooks.addFilter(
        //     'blocks.getSaveElement', 'core/social-link', (el, type, attr) => {
        //         console.log('hooks ', el, type, attr)
        //         if(el || !type.parent || !(type.parent as string[]).includes('core/social-links')){
        //             return el;
        //         }

        //         return makeSocialLink(type, attr)
        //     }
        // )

        use(createRootURLMiddleware(wpApiSettings.root));

        setFetchHandler((options) => {
            console.log(options);
            return apiFetch(options);
        });
    }

    setReactComponents() {
        media.createMediaComponents(this._g);
    }

    loadFilters(){
        if(!this.options.filters || this.options.filters.length == 0) return;
        this.options.filters.forEach(fn => fn(this._g))
    }

    loadActions() {
        if(!this.options.actions || this.options.actions.length == 0) return;
        this.options.actions.forEach(fn => fn(this._g))
    }

    unregisterBlocks(){
        if(!this.options.unregisterBlocks || this.options.unregisterBlocks.length == 0) return;
        this.options.unregisterBlocks.forEach(name => this._g.blocks.unregisterBlockType(name))
    }
    registerBlocks(){
        if(!this.options.registerBlocks || this.options.registerBlocks.length == 0) return;
        this.options.registerBlocks.forEach(fn => fn(this._g))
    }
    updateBlocks(){
        this.unregisterBlocks();
        this.registerBlocks();
    }
}
