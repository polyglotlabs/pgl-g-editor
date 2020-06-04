import { StoreElement } from './store';
import { StyleStore, ScriptStore, AssetOptions } from './gutenberg.import-elements';
import { concat, Observable, Observer } from 'rxjs';
import { toArray } from 'rxjs/internal/operators/toArray';

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
