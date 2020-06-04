import { Injectable, Inject, Optional } from '@angular/core';
import * as _ from 'lodash';
import { concat, Observable, of, Observer } from 'rxjs';
import { toArray, tap } from 'rxjs/operators';
import { createElement, DetailedReactHTMLElement } from 'react';
import { Obj } from './core/types';
import { HttpClient } from '@angular/common/http';
export const CUSTOM_BLOCKS = 'CUSTOM_BLOCKS';

interface BlockOptions {
    title: string;
    icon: string;
    category: string;
    example: Record<string | number, any>;
}

export interface CustomBlock {
    name: string;
    styles: Record<string, string | number>;
    block: BlockOptions;
    editFactory: (
        el: typeof createElement,
        styles: Record<string, any>
    ) => () => DetailedReactHTMLElement<any, any>;
    saveFactory: (
        el: typeof createElement,
        stypes: Record<string, any>
    ) => () => DetailedReactHTMLElement<any, any>;
}
interface StoreElement<T = any> {
    name: string;
    src: string;
    el?: T;
    loaded?: boolean;
    type?: string;
    elementType?: 'link' | 'script';
    attr?: 'href' | 'src';
}

type StoreScript = StoreElement<HTMLScriptElement>;
type StoreStyle = StoreElement<HTMLLinkElement>

const AssetOptions = {
    link: {
        rel: 'stylesheet'
    },
    script: {
        type: 'text/javascript',
        defer: true,
    }

}
const StyleStore: StoreStyle[] = [
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

const ScriptStore: StoreScript[] = [];
const temp =[
    { name: 'wp', src: 'assets/js/wp-polyfill.min.js' },
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

@Injectable({
    providedIn: 'root',
})
export class LoaderService {
    private _scripts: { [key: string]: StoreScript & { loaded: boolean } } = {};

    constructor(
        private _http: HttpClient,
        @Inject(CUSTOM_BLOCKS) @Optional() public customBlocks: CustomBlock[]
    ) {
        console.log('loading service');
        this._scripts = ScriptStore.reduce(
            (acc, s) => ({ ...acc, ...this.mapScripts(s) }),
            {}
        ) as {
            [key: string]: StoreScript & { loaded: boolean };
        };
        // (window as any).lodash = _;
        // this.getCustomBlocks().subscribe(resp => {
        //     console.log(resp);
        // })
    }
    mapScripts(s: StoreScript){
        let scriptEl = document.getElementById(`gutenberg-import-${s.name}`) as HTMLScriptElement
        // console.log(`map scripts: found script: ${!!scriptEl}`, scriptEl)
        return {
            [s.name]: {
                ...s,
                loaded: !!scriptEl,
                el: scriptEl || undefined
            }
        }
    }

    load(...scripts: string[]) {
        return Promise.all(scripts.map((s) => this.loadScript(s)));
    }
    loadAll() {
        console.log('loading all...');
        // return Promise.all(ScriptStore.map((s) => this.loadScript(s.name)));
        return concat(...ScriptStore.map(s => this.loadScript(s.name))).pipe(toArray(),tap(_ => this.registerBlocks()))
    }

    loadScript(name: string) {
        const script = this._scripts[name];
        return new Observable((observer: Observer<any>) => {
            console.log(`setting observable: name: ${name}`, script);
            if (script.loaded) {
                observer.next({
                    script: name,
                    loaded: true,
                    status: 'Already Loaded',
                });
                observer.complete();
                return;
            }
            const callBack = () => {
                console.log(`${script.name} is loaded`);
                script.loaded = true;
                observer.next({ script: name, loaded: true, status: 'Loaded' });
                observer.complete();
            };
            const scriptEl = document.createElement('script');
            const [fnName, fn] =
                'readyState' in scriptEl
                    ? [
                          'onreadystatechange',
                          () =>
                              ['loaded', 'complete'].includes(
                                  scriptEl['readyState']
                              )
                                  ? callBack()
                                  : null,
                      ]
                    : ['onload', callBack];
            Object.assign(scriptEl, {
                type: 'text/javascript',
                src: script.src,
                defer: true,
                // async: true,
                [fnName]: fn,
                id: `gutenberg-import-${name}`,
                onerror: (error) => {
                    script.loaded = false;
                    observer.error(error);
                    observer.complete();
                }
            });
            script.el = scriptEl;
            document.body.prepend(scriptEl);
        });
    }
    getCustomBlocks(): Observable<any> {
        return this._http.get('/api/wp/v2/custom-blocks')
    }
    registerBlocks(): void {
        // const { wp: { blocks, element: {createElement}}} = window as any;
        // if(!this.customBlocks || this.customBlocks.length == 0){
        //     return;
        // }
        // this.customBlocks.forEach(({name, styles, editFactory, saveFactory, block}) => {
        //     blocks.unregisterBlockType(name, {
        //         ...block,
        //         edit: editFactory(createElement, styles),
        //         save: saveFactory(createElement, styles)
        //     })
        // })
    }
}

export function loadGutenberg(): Promise<any> {
    return concat(
        ...StyleStore.map(s => loadGutenbergAsset(s, (el: HTMLLinkElement) => document.head.append(el))),
        ...ScriptStore.map(s => loadGutenbergAsset(s, (el: HTMLScriptElement) => document.body.prepend(el)))
    ).pipe(
        toArray()
    ).toPromise().then( val => console.log(`loaded all scripts: `, val))
}

function loadGutenbergAsset(asset: StoreElement, load: (el: HTMLElement) => void) {
    return new Observable((observer: Observer<any>) => {
        console.log(`loading asset: `, asset);
        if(asset.loaded){
            observer.next({...asset, status: 'Already loaded.'})
            observer.complete();
            return;
        }
        const callBack = callBackFactory(asset, observer);
        const assetEl = document.createElement(asset.elementType || 'script');
        console.log('created element', assetEl);
        const [trigger, triggerCallback] =
            'readyState' in assetEl
                ? [
                      'onreadystatechange',
                      () =>
                          ['loaded', 'complete'].includes(
                              assetEl['readyState']
                          )
                              ? callBack()
                              : null,
                  ]
                : ['onload', callBack];
        updateAssetElement(assetEl, {asset, trigger, triggerCallback, observer});
        load(assetEl);
    })
}
function callBackFactory(asset: StoreElement, observer: Observer<any>) {
    return () => {
        console.log(`${asset.name} is loaded`);
        asset.loaded = true;
        observer.next({ style: name, loaded: true, status: 'Loaded' });
        observer.complete();
    }
}
function updateAssetElement(el: HTMLElement, {asset, trigger, triggerCallback, observer}){
    Object.assign(el, AssetOptions[asset.elementType || 'script'], {
        [asset.attr || 'src']:asset.src,
        [trigger]: triggerCallback,
        id: `gutenberg-import-${asset.name}${asset.elementType ? `-${asset.elementType}`: ''}`,
        onerror: (error) => {
            asset.loaded = false;
            observer.error(error);
            observer.complete();
        }
    });
    asset.el = el;
}
