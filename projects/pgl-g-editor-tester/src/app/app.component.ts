import { Component, OnInit } from '@angular/core';
import { LoaderService } from './loader.service';
import apiFetch from './globals/api-fetch';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'pgl-g-editor-tester';
    constructor(private _ls: LoaderService) {}

    ngOnInit(): void {
        // this._ls
        //     .loadAll()
        //     .then((resp) => {
        //         console.log('value', resp);
        //         this.loadSettings();
        //     })
        //     .catch((err) => console.error(err));
    }

    loadSettings() {
        const w = window as any;
        const { wp } = w;
        const { use: use2, plugins } = wp.data;

        const uid = (w.userSettings && w.userSettings.uid) || 1;
        const storageKey = `WP_DATA_USER_${uid}`;

        use2(plugins.persistence, { storageKey });
        plugins.persistence.__unstableMigrate({ storageKey });

        w.userSettings = {
            secure: '',
            time: 1234567,
            uid: 1,
        };

        // API settings
        w.wpApiSettings = {
            root: window.location.origin + '/',
            nonce: '123456789',
            versionString: 'wp/v2/',
        };

        // postboxes
        w.postboxes = w.postboxes || {
            add_postbox_toggles: (page, args) => {
                console.log('page', page);
                console.log('args', args);
            },
        };
        const {
            use,
            createNonceMiddleware,
            createRootURLMiddleware,
            setFetchHandler,
        } = w.wp.apiFetch;

        const nonceMiddleware = createNonceMiddleware(w.wpApiSettings.nonce);

        use(nonceMiddleware);

        w.wp.hooks.addAction(
            'heartbeat.tick',
            'core/api-fetch/create-nonce-middleware',
            function (response) {
                if (response.rest_nonce) {
                    nonceMiddleware.nonce = response.rest_nonce;
                }
            }
        );

        use(createRootURLMiddleware(w.wpApiSettings.root));

        setFetchHandler(apiFetch);
    }
}
