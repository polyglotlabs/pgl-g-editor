import { DbPropertyContext, DbPayload } from './db-base';
import { GenericObj } from './db-base';
import { log } from '../log/log.class';
import { MEDIAS } from './data/MEDIAS';
import { DATE } from './data/COMMON';

import { UPLOADS_PATH } from '../routes/common';

export interface DbMedia extends GenericObj {
    id: number;
    caption: DbPropertyContext;
    date_gmt: string;
    date: string;
    link: string;
    media_type: string;
    mime_type: string;
    source_url: string;
    media_details: DbMediaDetails;
    title: DbPropertyContext;
}

export interface DbMediaDetails extends GenericObj {
    file: string;
    height: number;
    image_meta: GenericObj;
    sizes: GenericObj;
    width: number;
}

export type DbMediaPayload = DbPayload<DbMedia>;
export type DbMediasPayload = DbPayload<DbMedia[]>;

export class MediaDatabase {
    private _lastMediaID = 1;
    private _clearedMediaIDs = [];

    getAllMedia(): DbMediasPayload {
        log.Info(`Getting all medias...`);
        return [Object.values(MEDIAS), null];
    }
    getMedia(id: number): DbMediaPayload {
        log.Info(`Finding media with id: ${id}`);
        let error: Error = null;
        const media =
            id in MEDIAS && !this._clearedMediaIDs.includes(id)
                ? MEDIAS[id]
                : null;
        if (!media) {
            error = new Error(`Could not find media with id ${id}`);
        }
        return [media, error];
    }

    saveMedia(file): [DbMedia, Error] {
        log.Debug('save media file: ', file);
        return [this.createMedia(file), null];
    }

    createMedia(file): DbMedia {
        const img = MediaDatabase._getMedia(Object.values(MEDIAS).length + 1, {
            media_type: file.mimetype.split('/')[0],
            mime_type: file.memetype,
            source_url: file.filename,
        });
        MEDIAS[img.id] = img;
        return img;
        // return new Promise<DbMedia>((resolve, reject) => {
        //     const reader = fs.readFile(file.path, (err, data) => {
        //         if(err){
        //             reject(err)
        //             return;
        //         }

        //         resolve(img);
        //     })
        //     // reader.onload = () => {
        //     //     // Create media and add to list
        //     //     const img = this._getMedia(Object.values(MEDIAS).length + 1, {
        //     //         media_type: file.type.split('/')[0],
        //     //         mime_type: file.type,
        //     //         source_url: reader.result.toString(),
        //     //     });
        //     //     MEDIAS[img.id] = img;
        //     //     resolve(img);
        //     // };
        //     // reader.readAsDataURL(file);
        // });
    }

    static _getMedia(id, params: Partial<DbMedia> = {}): DbMedia {
        let sizes = {};
        if (params.thumbnail) {
            sizes = {
                thumbnail: {
                    source_url: `${UPLOADS_PATH}/${params.thumbnail}`,
                },
            };
        }

        return {
            id,
            title: { raw: '', rendered: '' },
            caption: { raw: '', rendered: '' },
            date_gmt: DATE,
            date: DATE,
            media_type: params.media_type,
            mime_type: params.mime_type,
            source_url: `${UPLOADS_PATH}/${params.source_url}`,
            // link: params.source_url,
            media_details: {
                file: '',
                width: 0,
                height: 0,
                image_meta: {},
                sizes,
            },
        } as DbMedia;
    }
}

// Load media (images)
[
    MediaDatabase._getMedia(1, {
        media_type: 'image',
        mime_type: 'image/jpeg',
        source_url: `img1.jpg`,
    }),

    MediaDatabase._getMedia(2, {
        media_type: 'image',
        mime_type: 'image/jpeg',
        source_url: `img2.jpeg`,
    }),

    MediaDatabase._getMedia(3, {
        media_type: 'image',
        mime_type: 'image/png',
        source_url: `img3.png`,
    }),

    // Load media (videos)
    MediaDatabase._getMedia(4, {
        media_type: 'video',
        mime_type: 'video/mp4',
        source_url: `video1.mp4`,
        thumbnail: `video1-thumb.jpg`,
    }),

    MediaDatabase._getMedia(5, {
        media_type: 'video',
        mime_type: 'video/mp4',
        source_url: `video2.mp4`,
        thumbnail: `video2-thumb.jpg`,
    }),

    // Load media (audios)
    MediaDatabase._getMedia(6, {
        media_type: 'audio',
        mime_type: 'audio/mp3',
        source_url: `audio1.mp3`,
        thumbnail: `audio1-thumb.png`,
    }),
].forEach(m => MEDIAS[m.id] = m);
