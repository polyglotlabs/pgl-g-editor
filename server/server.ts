import express from 'express';
import { Application, Request, Response, NextFunction } from 'express';
import { getType } from './routes/types.route';
import { getPage, savePage, deletePage } from './routes/pages.route';
import { getMedia, saveMedia } from './routes/medias.route';
import { getTaxonomy } from './routes/taxonomies.route';
import { getCategories } from './routes/catetories.route';
import { log } from './log/log.class';
import { search } from './routes/search.routes';
import { getBlockRenderer, getBlocks } from './routes/blocks.route';
import { savePost, getPost, deletePost } from './routes/posts.route';
import { getEmbed } from './routes/embed.route';
import { getUser, getLoggedInUser } from './routes/users.route';
import { getThemes } from './routes/themes.route';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
import { BASE_URL, HTTPCode } from './routes/common';
import { getUploads, getCustomBlocks } from './routes/uploads.route';

const app: Application = express();
const router: express.Router = express.Router();
const storage = multer.diskStorage({
    destination: function(_, _2, callback) {
        callback(null, './server/uploads')
    },
    filename: function(_, file, callback) {
        const suffix = Date.now();
        callback(null, file.originalname.replace(/\s/g, '_'))
    }
})
// const upload = multer.diskStorage(storage);
const upload = multer({storage})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use(BASE_URL, router);
app.use("/*", heartbeatHandler)
// Uploads
router.route('/uploads/:name').get(getUploads)

router.route('/custom-blocks/:name?').get(getCustomBlocks)

// Types
router.route('/types').get(getType);
router.route(`/types/:type`).get(getType);

// Page
router
    .route(`/pages/:id/:type?`)
    .get(getPage)
    .put(savePage)
    .post(savePage)
    .delete(deletePage);

// Posts
router.route('/posts').get(getPost);
router
    .route('/posts/:id/:type?')
    .get(getPost)
    .put(savePost)
    .post(savePost)
    .delete(deletePost);

// Media
router.route(`/media`).get(getMedia).post(upload.single('file'), saveMedia);
router.route('/media/:id').get(getMedia)

// Blocks
router.route('/blocks').get(getBlocks)

// Taxonomies
router.route('/taxonomies/:type*?').get(getTaxonomy)

// Categories
router.route('/categories').get(getCategories)

// Users
router.route('/users/:name?').get(getUser)
router.route('/users/me').get(getLoggedInUser)

// Block renderer
router.route('/block-renderer/*').get(getBlockRenderer)

// Search
router.route('/search').get(search)

// Embed
router.route('/oembed/1.0/proxy').get(getEmbed)

// Themes
router.route('/themes').get(getThemes)

router
    .route(`/*`)
    .get(rootHandler)
    .post(rootHandler)
    .put(rootHandler)
    .delete(rootHandler);

function rootHandler(req: Request, res: Response) {
    log.printRequest(req);
    res.sendStatus(HTTPCode.NO_CONTENT);
}
function heartbeatHandler(req: Request, res: Response) {
    log.printRequest(req);
    res.status(HTTPCode.OK).json("server is running");
}

const httpServer: any = app.listen(9000, '0.0.0.0', () => {
    console.log(
        `HTTP GUTENBERG REST API running http://${
            httpServer.address().address
        }:${httpServer.address().port}`
    );
});
