import { Request, Response } from 'express';
import { log } from '../log/log.class';
import { HTTPCode } from './common';

export function search(req: Request, res: Response){
    log.printRequest(req, "Searching: ");
    res.status(HTTPCode.OK).json([]);
}