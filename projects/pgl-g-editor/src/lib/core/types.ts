import * as _ from 'lodash';
import { InjectionToken } from '@angular/core';

export const WINDOW = new InjectionToken<GWindows>('WINDOW');
export const LOCAL_STORAGE = new InjectionToken('LOCAL_STORAGE');
export const GUTENBERG = new InjectionToken<Gutenberg>('window.wp');
export const PGL_G_EDITOR_DEFAULTS = new InjectionToken<PGLEditorOptions>('PGL.G.EDITOR.DEFAULTS')
export const CUSTOM_BLOCKS = new InjectionToken<any>('CUSTOM.BLOCKS')

export type Obj<T = any> = Record<string, T>;
export type AnyFunction<A = any> = (...input: any[]) => A
export type HookFactory = (g: Gutenberg) => void
export type ReactFactory<A = any> = (wp: Partial<any>) => void

export enum PGLEditorTypes {
    PAGE = 'page',
    POST = 'post',
}
export interface PGLEditorSettings extends Obj {
    alignWide: boolean;
    availableTemplates: string[];
    allowedBlockTypes: boolean;
    disableCustomColors: boolean;
    disableCustomFontSizes: boolean;
    disablePostFormats: boolean;
    titlePlaceholder: string;
    bodyPlaceholder: string;
    isRTL: boolean;
    autosaveInterval: number;
    style: string[];
    imageSizes: (string | number)[];
    richEditingEnabled: boolean;
    postLock: {
        isLocked: boolean;
    };
    postLockUtils: {
        nonce: string;
    };
    enableCustomFields: boolean;
    mediaLibrary: boolean;
}
export interface PGLEditorOptions extends Obj{
    postType?: PGLEditorTypes;
    settings?: PGLEditorSettings;
    uid?: number;
    userSettings?: PGLUserSettings;
    wpApiSettings?: PGLApiSettings;
    postboxes?: PGLPostBoxes;
    filters?:HookFactory[],
    actions?:HookFactory[],
    unregisterBlocks?: string[],
    registerBlocks?: AnyFunction[]
}

export interface PGLApiSettings extends Obj{
    root: string;
    nonce: string;
}

export interface PGLUserSettings extends Obj{
    uid?: number | string;
    time?: number,
    secure?: string
}

export interface PGLPostBoxes extends Obj {
    add_postbox_toggles?: (page, args) => void
}

export interface Data extends Obj{
    select: AnyFunction;
    dispatch: AnyFunction
}
export interface Gutenberg extends Obj{
    data: Obj,
    hooks: Obj,
    apiFetch: Obj,
    element: Obj;
    blocks: Obj;
    dom: Obj;
    components: Obj;
    domReady: AnyFunction;

}
export interface GWindows extends Window {
    wp: Gutenberg;
    lodash: typeof _;
    _wpLoadBlockEditor: Promise<any>;
    userSettings: Obj;
    wpApiSettings: Obj;
    postboxes: Obj;
}
