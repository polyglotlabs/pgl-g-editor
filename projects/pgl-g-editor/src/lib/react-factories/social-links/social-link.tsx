import * as React from "react";
import { Component, createElement } from 'react';
// export function makeSocialLink(){
//     return class SociaLink extends Component {

//     }
//     // return (
//     //     <li class="wp-social-link wp-social-link-' . esc_attr( $service ) . esc_attr( $class_name ) . '"><a href="' . esc_url( $url ) . '" aria-label="' . esc_attr( $label ) . '"> ' . $icon . '</a></li>';)
// }

export function test() {
    createElement('li', { children: [

    ]})
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            Icon: React.SVGProps<SVGAElement>
        }
    }
}

export function save(...data) {
    console.log( `social link save call: `, data);
}

function iconClassFactory(iconFactory){
    return class Icon extends Component<any, any> {
        render() {
            return iconFactory();
        }
    }
}

function socialLinkContent(Icon, { classes, label, url}){
    return (
        <li className={classes}>
            <a href={ url } aria-label={ label }>
                <Icon />
            </a>
        </li>
    )
}

export function makeSocialLink({attributes, icon: {src: iconFactory}}, {url, site, label = '', className = ''}) {
    if(!url){
        return null;
    }

    console.log(`makeSocialLink:
        label: ${ label},
        className: ${ className }`)

    const classes = `wp-social-link wp-social-link-${site || 'icon'} ${className}`
    const Icon = iconClassFactory(iconFactory)
    console.log(`icon: `, Icon);
    return socialLinkContent(Icon, {classes, label, url})
}

