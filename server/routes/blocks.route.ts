import { Request, Response } from 'express';
import { log } from '../log/log.class';
import { HTTPCode } from './common';

export function getBlocks(req: Request, res: Response) {
    log.printRequest(req, 'Get block')
    res.status(HTTPCode.OK).json([]);
}

export function getBlockRenderer(req: Request, res: Response) {
    log.printRequest(req, 'GetBlockRenderer');
    const { block } = req.params;
    res.status(HTTPCode.OK).json({
        rendered: `<div>Sorry. There is no server-side rendering available for "${block}".</div>`,
      });
}