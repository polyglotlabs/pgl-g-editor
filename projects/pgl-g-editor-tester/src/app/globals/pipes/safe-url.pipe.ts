import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'safeURL'
})
export class SafeURLPipe implements PipeTransform{
    constructor(
        private _sanitized: DomSanitizer
    ){}
    transform(value){
        return this._sanitized.bypassSecurityTrustResourceUrl(value);
    }
}