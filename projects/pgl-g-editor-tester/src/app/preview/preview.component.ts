import {
    Component,
    OnInit,
    AfterViewInit,
    ChangeDetectorRef,
} from '@angular/core';
import { getPage } from '../globals/fake-data';
import { LoaderService } from '../loader.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DbPage } from 'server/database/db-page';
import { PglGEditorService } from 'pgl-g-editor';

@Component({
    selector: 'app-preview',
    templateUrl: './preview.component.html',
    styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements OnInit, AfterViewInit {
    state = {
        rendered: '',
    };
    domReady;
    constructor(
        private _ls: LoaderService,
        private _changeRef: ChangeDetectorRef,
        private _http: HttpClient,
        private _gs: PglGEditorService
    ) {}

    ngOnInit(): void {
        // remove block editor style from page
        const editorStyle = document.querySelector(
            'style[id="block-editor-style"]'
        );
        if (editorStyle) {
            editorStyle.remove();
        }

        // remove editor style
        const style = document.querySelector(
            'link[href$="css/gutenberg/style.css"]'
        );
        if (style) {
            style.remove();
        }
    }
    ngAfterViewInit(): void {this.loadPage()}

    getPage(id: number): Observable<DbPage> {
        return this._http.get<DbPage>(`/api/wp/v2/pages/${id}`);
    }

    loadPage(): void {
        this.getPage(1).subscribe((page) => {
            const rendered =
                (page &&
                    page.content &&
                    typeof page.content != 'string' &&
                    page.content.raw &&
                    this._gs.getRendered(page.content.raw)) ||
                    // this._gs. page.content.raw ||
                '';

            this.state.rendered = rendered;
            console.log(rendered);
            this._changeRef.detectChanges();
        });

        // this.domReady(() => {
        //     // Load the frontend scripts
        //     const code = document.getElementById('frontend-scripts');
        //     if (code && code.innerText) {
        //         const script = document.createElement('script');
        //         script.type = 'text/javascript';
        //         script.async = true;
        //         script.src = `data:text/javascript;base64,${code.innerText}`;
        //         document.body.appendChild(script);
        //     }

        //     // Load html blocks scripts
        //     const html = rendered.trim();
        //     const container = document.createElement('div');
        //     container.innerHTML = html;

        //     const scripts = Array.from(
        //         container.getElementsByTagName('script')
        //     );
        //     for (const s of scripts) {
        //         const script = document.createElement('script');
        //         script.type = 'text/javascript';
        //         script.async = true;

        //         if (s.innerText) {
        //             // inner script
        //             const frontendScript = (Buffer as any)
        //                 .from(s.innerText)
        //                 .toString('base64');
        //             script.src = `data:text/javascript;base64,${frontendScript}`;
        //         } else {
        //             // or from external src
        //             script.src = s.src;
        //         }

        //         document.body.appendChild(script);
        //     }
        // });
    }
}
