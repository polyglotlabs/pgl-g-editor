import { Injectable } from '@angular/core';
import * as blockParser from '@wordpress/block-serialization-default-parser';
import { Obj } from './core';
import { icons } from './react-factories/social-links/icons';
import { Autobind } from './decorators/autobind';

export interface Block {
    attrs: Obj;
    blockName: string;
    innerBlocks: Block[];
    innerContent: string[];
    innerHTML: string;
}

@Injectable({
    providedIn: 'root',
})
export class PglGEditorService {
    public renderBlocks = {
        'core/social-links': {
            name: 'Social links',
            getContent: this.getSocialLinksContent,
        },
    };

    constructor() {}

    unregisterBlocks() {
        const {
            wp: {
                blocks,
                element: { createElement },
            },
        } = window as any;
        blocks.unregisterBlocks();
    }

    registerBlocks() {}

    getRendered(content: string) {
        const blocks: Block[] = blockParser.parse(content);
        return this.getServerSideRenderBlocksContent(blocks)
    }

    getServerSideRenderBlocksContent(blocks: Block[]): string {
        return blocks.reduce((acc, block: Block) => `${acc}${this.getRenderBlockContent(block)}`, '')
    }

    getRenderBlockContent(block: Block): string {
        console.log(`getRenderBlockContent: `, block);
        return block && block.blockName in this.renderBlocks ? this.renderBlocks[block.blockName].getContent(block) : block.innerHTML;
    }

    @Autobind
    getSocialLinksContent(block: Block) {
        console.log(`getSocialLinksContent: `, block);
        const open = block.innerContent.shift();
        const end = block.innerContent.pop();
        return `${open}${block.innerBlocks.reduce((acc, block) => `${acc}${this.getSocialLinkContent(block)}`, '')}${end}`;
    }

    getSocialLinkContent({ blockName, innerHTML, attrs: { label = '', url = '', className = '', service = 'Icon' } }: Block): string {
        const prefix = 'core/social-link-';
        const name = blockName.startsWith(prefix) ? blockName.replace(prefix, '') : null;
        return innerHTML || !url || !name || !(name in icons) ? innerHTML :
            `<li class="wp-social-link wp-social-link-${service}${className}">
            <a href=${url} aria-label=${label}>
                ${icons[name].icon}
            </a>
        </li>
        `;
    }
}
