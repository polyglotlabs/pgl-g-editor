import { Request, Response } from 'express';
import { db } from '../database/database';
import { log } from '../log/log.class';
import { HTTPCode } from './common';

export function getPage(req: Request, res: Response) {
    log.printRequest(req, "Get Page: ")
    const { context } = req.query;
    const { id } = req.params;
    const [payload, error] = db.getPage(Number(id));
    if (error) {
        res.sendStatus(HTTPCode.INTERNAL_SERVER_ERROR);
        return;
    }
    res.status(HTTPCode.OK).json(payload);
}

export function savePage(req: Request, res: Response) {
    log.printRequest(req, "Save page: ")
    const { body, params: { id }} = req;
    const [page, err] = db.savePage(id, body);
    if (err) {
        log.Error('save page error: ', err)
        res.sendStatus(HTTPCode.INTERNAL_SERVER_ERROR);
        return;
    }
    res.status(HTTPCode.OK).json(page);
}

export function deletePage(req: Request, res: Response) {
    const { id } = req.params;
    log.Debug(`Deleting page with id :${id}`)
    const err = db.deletePage(Number(id));
    if(err){
        log.Error(`Deleting error: `, err);
        res.sendStatus(HTTPCode.INTERNAL_SERVER_ERROR);
        return;
    }
    res.sendStatus(HTTPCode.OK);
}