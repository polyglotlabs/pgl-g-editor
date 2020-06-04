import {Request, Response} from 'express';
import { db } from '../database/database';
import { log } from '../log/log.class';
import { HTTPCode } from './common';

export function getType(req: Request, res: Response) {
    log.printRequest(req, "GetType: ")
    const { context } = req.query;
    const { type } = req.params;
    let [payload, error] = type ? db.getTypeByName(type) : db.getTypes();
    if(error){
        log.Error(error);
        res.sendStatus(HTTPCode.INTERNAL_SERVER_ERROR);
        return;
    }
    res.status(HTTPCode.OK).json(payload);
}
