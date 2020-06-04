import { createElement, DetailedReactHTMLElement } from 'react';

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
        types: Record<string, any>
    ) => () => DetailedReactHTMLElement<any, any>;
}
export interface BlockOptions {
    title: string;
    icon: string;
    category: string;
    example: Record<string | number, any>;
}
export interface StoreElement<T = any> {
    name: string;
    src: string;
    el?: T;
    loaded?: boolean;
    type?: string;
    elementType?: 'link' | 'script';
    attr?: 'href' | 'src';
}

export type StoreScript = StoreElement<HTMLScriptElement>;
export type StoreStyle = StoreElement<HTMLLinkElement>
