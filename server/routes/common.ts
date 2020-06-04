import path from 'path';
export enum HTTPCode {
    OK = 200,
    CREATED = 202,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
    BAD_GATEWAY = 502,
}

export const URL_PREFIX = '/api';
export const API_VERSION = '/wp/v2';
export const UPLOADS_DIR = 'uploads';
export const CUSTOM_BLOCK_DIR = 'custom-blocks';
export const BASE_URL = `${URL_PREFIX}${API_VERSION}`;
export const UPLOADS_PATH = `${BASE_URL}/${UPLOADS_DIR}`;
export const CUSTOM_BLOCK_PATH = `${UPLOADS_PATH}/${CUSTOM_BLOCK_DIR}`;