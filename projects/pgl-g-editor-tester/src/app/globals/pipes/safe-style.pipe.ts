import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'safeStyle'
})
export class SafeStylePipe implements PipeTransform{
    constructor(
        private _sanitized: DomSanitizer
    ){}
    transform(value){
        return this._sanitized.bypassSecurityTrustStyle(value); 
    }
}