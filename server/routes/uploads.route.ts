import { Request, Response } from 'express';
import * as path from 'path';
import { log } from '../log/log.class';
import { HTTPCode } from './common';
import { db } from '../database/database';

export function getUploads(req: Request, res: Response) {
    log.printRequest(req, `uploads route: `);
    res.sendFile(path.join(__dirname, '../uploads', req.params.name));
}

export function getCustomBlocks(req: Request, res: Response) {
    log.printRequest(req, 'getCustomBlocks');
    const { name } = req.params;
    if (name) {
        res.sendFile(path.join(__filename, '../uploads/custom-blocks', name));
        return;
    }
    db.getAllCustomBlockFiles()
        .then((files) => res.status(HTTPCode.OK).json({ files }))
        .catch((err) => {
            log.Error(err);
            res.sendStatus(HTTPCode.INTERNAL_SERVER_ERROR)
        });
}
