import { Request, Response } from 'express';
import { db } from '../database/database';
import { log } from '../log/log.class';
import { HTTPCode } from './common';

export function getMedia(req: Request, res: Response) {
    log.printRequest(req, "GetMedia");
    const { context } = req.query;
    let payload;
    let error: Error;
    switch (context) {
        case 'edit':
            [payload, error] = db.getAllMedia();
            break;
        case 'view':
            [payload, error] = [
                null,
                new Error('View context not implemented'),
            ];
            break;
        default:
            error = new Error(`Unexpected contexts: ${context}`);
           log.Error(error)
    }
    if (error) {
        log.Error(error);
        res.sendStatus(HTTPCode.INTERNAL_SERVER_ERROR);
        return;
    }
    res.status(HTTPCode.OK).json(payload);
}

export function saveMedia(req: Request, res: Response) {
    log.printRequest(req, "Saving media: ");
    const { file } = req as any;
    // const { payload } = req as any;
    // if (!payload) {
    //     res.sendStatus(HTTPCode.BAD_REQUEST);
    //     return;
    // }
    const [media, err] = db.saveMedia(file);
    if (err) {
        res.sendStatus(HTTPCode.INTERNAL_SERVER_ERROR);
        return;
    }
    res.status(200).json(media)
}
