import * as _ from 'lodash';
import { InjectionToken } from '@angular/core';

export const WINDOW = new InjectionToken<GWindows>('WINDOW');
export const LOCAL_STORAGE = new InjectionToken('LOCAL_STORAGE');
export const GUTENBERG = new InjectionToken<Gutenberg>('window.wp');

export type Obj<T = any> = Record<string, T>;
export type AnyFunction<A = any> = (...input: any[]) => A

export interface Data extends Obj{
    select: AnyFunction;
    dispatch: AnyFunction
}
export interface Gutenberg extends Obj{
    data: Obj,
    hook: Obj,
    apiFetch: Obj,
    element: Obj;
    blocks: Obj;
    dom: Obj;
    domReady: AnyFunction;
    
}
export interface GWindows extends Window {
    wp: any;
    lodash: typeof _;
    _wpLoadBlockEditor: Promise<any>;
    userSettings: Obj;
    wpApiSettings: Obj;
    postboxes: Obj;
}