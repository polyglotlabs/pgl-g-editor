import { NgModule, APP_INITIALIZER } from '@angular/core';
import { PglGEditorComponent } from './pgl-g-editor.component';
import { WINDOW, LOCAL_STORAGE, GUTENBERG, GWindows, PGL_G_EDITOR_DEFAULTS, CUSTOM_BLOCKS } from './core/types';

import * as _ from 'lodash';
import { loadGutenberg } from './core/gutenberg.loader';
import { CustomBlock } from './core/store';
import { PGL_G_DEFAULT_OPTIONS } from './core/defaults';

export const CUSTOM_BLOCKS_LIST = [
    {
        name: 'gutenberg-examples/example-01-basic',
        styles: {
            backgroundColor: '#900',
            color: '#fff',
            padding: '20px',
        },
        block: {
            title: 'Example: Basic',
            icon: 'universal-access-alt',
            category: 'layout',
            example: {},
        },
        editFactory: (el, style) =>
            () => {
                return el(
                    'p',
                    { style },
                    'Hello World, step 1 (from the editor).'
                );
            },
        saveFactory: (el, style) =>
           () => {
                return el(
                    'p',
                    { style },
                    'Hello World, step 1 (from the frontend).'
                );
            },
    },
] as CustomBlock[];

@NgModule({
  declarations: [PglGEditorComponent],
  imports: [
  ],
  exports: [PglGEditorComponent],
  providers: [
    {
        provide: WINDOW,
        useFactory: windowFactory
    },
    {
        provide: LOCAL_STORAGE,
        useFactory: localStorageFactory
    },
    {
        provide: APP_INITIALIZER,
        useFactory: gutenbergImportFactory,
        multi: true,
        deps: [WINDOW]
    },
    {
        provide: GUTENBERG,
        useFactory: gutenbergFactory,
        deps: [WINDOW]
    },
    {
        provide: CUSTOM_BLOCKS,
        useValue: CUSTOM_BLOCKS_LIST
    },
    {
        provide: PGL_G_EDITOR_DEFAULTS,
        useValue: PGL_G_DEFAULT_OPTIONS
    }
  ]
})
export class PglGEditorModule { }

export function gutenbergImportFactory(w: GWindows) {
    w.lodash = _;
    return loadGutenberg
}

export function windowFactory() {
    return (typeof window !== 'undefined') ? window : null;
}

export function localStorageFactory() {
    return (typeof window !== 'undefined') ? window.localStorage : null;
}

export function gutenbergFactory(w: GWindows) {
    return !!w.wp ? w.wp : null;
}
