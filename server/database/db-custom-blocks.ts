import { DbPayload } from './db-base';
import fs from 'fs';
import path from 'path';
import { log } from '../log/log.class';
import { CUSTOM_BLOCK_PATH } from '../routes/common';
import { Observable, Observer } from 'rxjs';

export interface DbCustomBlockFile {
    name: string,
    path: string
}

type DbCustomBlockFilePayload = DbPayload<DbCustomBlockFile>;
type DbCustomBlockFilesPayload = DbPayload<DbCustomBlockFile[]>;

export class CustomBlockFileDatabase {
    getAllCustomBlockFiles(): Promise<DbCustomBlockFile[]> {
        return this._getFiles( path.join(__dirname, '../uploads/custom-blocks'));
    }

    private _getFiles(root: string, prefix = ''): Promise<DbCustomBlockFile[]> {
        log.Debug(`get files: dirPath: ${root}, prefix: ${prefix}`)
        return new Promise<DbCustomBlockFile[]>((resolve, reject) => {
            fs.readdir(
                path.join(root, prefix),
                async (err, files) => {
                    if(err){
                        reject(err);
                        return;
                    }
                    files = files.map(f => path.join(prefix, f))
                    if(files.length == 0){
                        resolve([]);
                        return;
                    }
                    const folders = [];
                    let payload = files.reduce((acc, f) => {
                        if(fs.statSync(path.join(root, f)).isDirectory()){
                            folders.push(this._getFiles(root, f))
                            return acc;
                        }
                        return [...acc,{name: f, path: path.join(CUSTOM_BLOCK_PATH, f)}]
                    }, [])
                    if(folders.length > 0){
                        const subFiles =  await Promise.all(folders);
                        payload = [
                            ...payload,
                            ...subFiles.reduce((acc, sub) => [...acc, ...sub], [])
                        ]
                    }
                    resolve(payload);
                }
            )
        })
        // return new Observable(({next, error}: Observer<any>) => {
        //     fs.readdir(path, (err, files) => {
        //         if(err){
        //             error(err);
        //             return;
        //         }

        //     })
        // })
    }
}
