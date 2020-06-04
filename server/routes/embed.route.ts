import { Request, Response } from 'express';
import { log } from '../log/log.class';
import providers from 'oembed-providers/providers.json';
import { HTTPCode } from './common';

export async function getEmbed(req: Request, res: Response) {
    log.printRequest(res);
    const { url } = req.query;
    // taken from g-editor
    // Proxy that we use that enables cross-origin requests
    // https://cors-anywhere.herokuapp.com/
    const cors_api_host = 'https://cors-anywhere.herokuapp.com/';
    const hostname = new URL(url as string).hostname;

    // Find the provider
    const provider = providers.find(
        ({ provider_url }) =>
            provider_url.includes(hostname) || hostname.includes(provider_url)
    );

    if (provider && provider.endpoints) {
        // Use the first endpoint
        const provider_url = provider.endpoints[0].url;

        // Fetch embed to provider through the proxy
        const response = await fetch(
            `${cors_api_host}${provider_url}?url=${url}`
        );
        res.status(HTTPCode.OK).json(response.body);
        return;
    }
    res.sendStatus(HTTPCode.NO_CONTENT);
}
