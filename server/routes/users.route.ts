import { Request, Response } from 'express';
import { log } from '../log/log.class';
import { db } from '../database/database';
import { HTTPCode } from './common';

export function getUser(req: Request, res: Response){
    log.printRequest(req, "Get user: ");
    const { name } = req.params;
    if(name == 'me'){
        getLoggedInUser(req, res);
        return;
    }
    const [user, err] = name ? db.getUserByName(name) : db.getAllUsers();
    if(err != null){
        log.Error("GetUser error", err);
        res.sendStatus(HTTPCode.INTERNAL_SERVER_ERROR);
        return;    
    }

    res.status(HTTPCode.OK).json(user);
}

export function getLoggedInUser(req: Request, res: Response) {
    log.printRequest(req, "getLoggedInUser");
    const [user, err] = db.getUser(1)
    if(err){
        log.Error('getLoggedInUser error: ', err)
        res.sendStatus(HTTPCode.INTERNAL_SERVER_ERROR);
        return;
    }
    res.status(HTTPCode.OK).json(user)
}