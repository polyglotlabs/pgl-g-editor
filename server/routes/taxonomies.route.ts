import { Request, Response } from 'express';
import { log } from '../log/log.class';
import { db } from '../database/database';
import { HTTPCode } from './common';

export function getTaxonomy(req: Request, res: Response){
    const { type } = req.params;
    log.printRequest(req, "Get taxonomies route: ")
    const [tax, err] = type? db.getTaxonomy(type) : db.getAllTaxonomies();
    if(err){
        log.Error("Get taxonomy erro: ", err);
        res.sendStatus(HTTPCode.INTERNAL_SERVER_ERROR);
        return;
    }
    res.status(HTTPCode.OK).json( tax || {})
}