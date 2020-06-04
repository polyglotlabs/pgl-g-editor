import { Request, Response } from 'express';
import { db } from '../database/database';
import { log } from '../log/log.class';
import { HTTPCode } from './common';

export function getPost(req: Request, res: Response) {
    const { context } = req.query;
    const { id } = req.params;
    log.printRequest(req, "Get post: ");
    const [payload, error] = db.getPost(Number(id));
    if (error) {
        res.sendStatus(HTTPCode.INTERNAL_SERVER_ERROR);
        return;
    }
    res.status(HTTPCode.OK).json(payload);
}

export function savePost(req: Request, res: Response) {
    log.printRequest(req, "Save post: ");
    const { body } = req;
    const page = db.savePost(body);
    if (!page) {
        res.sendStatus(HTTPCode.INTERNAL_SERVER_ERROR);
        return;
    }
    res.status(HTTPCode.OK).json(page);
}

export function deletePost(req: Request, res: Response) {
    const { id } = req.params;
    log.printRequest(req, "Deleting post: ");
    log.Debug(`Deleting post with id :${id}`)
    const err = db.deletePost(Number(id));
    if(err){
        log.Error(`Deleting error: `, err);
        res.sendStatus(HTTPCode.INTERNAL_SERVER_ERROR);
        return;
    }
    res.sendStatus(HTTPCode.OK);
}