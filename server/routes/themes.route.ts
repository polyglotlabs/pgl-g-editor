import { Request, Response } from 'express';
import { db } from '../database/database';
import { log } from '../log/log.class';
import { HTTPCode } from './common';

export function getThemes(req: Request, res: Response) {
    log.printRequest(req, "GetThemes: ")
    const { context } = req.query;
    const [payload, error] = db.getThemes();
    if (error) {
        log.Error(error);
        res.sendStatus(HTTPCode.INTERNAL_SERVER_ERROR);
        return;
    }
    res.status(HTTPCode.OK).json(payload);
}
