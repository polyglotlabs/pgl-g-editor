import { Request, Response } from 'express';
import { db } from '../database/database';
import { log } from '../log/log.class';
import { HTTPCode } from './common';

export function getCategories(req: Request, res: Response){
    const { type } = req.params;
    log.printRequest(req, "Get categories route: ")
    const [cats, err] = db.getAllCategories();
    if(err){
        log.Error('get categories error: ', err)
        res.status(HTTPCode.INTERNAL_SERVER_ERROR)
        return;
    }
    res.status(HTTPCode.OK).json(cats)
}