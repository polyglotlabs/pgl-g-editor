import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { PreviewComponent } from './preview/preview.component';
import { PglGEditorModule } from 'pgl-g-editor';
import { CUSTOM_BLOCKS, CustomBlock, loadGutenberg } from './loader.service';
import { createElement, DetailedReactHTMLElement } from 'react';
import { WINDOW, GWindows, GUTENBERG, LOCAL_STORAGE } from './core/types';
import * as _ from 'lodash';
import { SafeHTMLPipe } from './globals/pipes/safe-html.pipe';
import { SafeURLPipe } from './globals/pipes/safe-url.pipe';
import { SafeStylePipe } from './globals/pipes/safe-style.pipe';
import { LibPageComponent } from './lib-page/lib-page.component';

const CUSTOM_BLOCKS_LIST = [
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
    declarations: [AppComponent, EditorComponent, PreviewComponent, SafeStylePipe, SafeHTMLPipe, SafeURLPipe, LibPageComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        PglGEditorModule,
    ],
    providers: [
        // {
        //     provide: WINDOW,
        //     useFactory: windowFactory
        // },
        // {
        //     provide: LOCAL_STORAGE,
        //     useFactory: localStorageFactory
        // },
        // {
        //     provide: APP_INITIALIZER,
        //     useFactory: gutenbergImportFactory,
        //     multi: true,
        //     deps: [WINDOW]
        // },
        // {
        //     provide: GUTENBERG,
        //     useFactory: gutenbergFactory,
        //     deps: [WINDOW]
        // },
        // {
        //     provide: CUSTOM_BLOCKS,
        //     useValue: CUSTOM_BLOCKS_LIST
        // },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}

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
