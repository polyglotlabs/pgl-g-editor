import * as React from "react";
import { __ } from "@wordpress/i18n";
import * as lodash from "lodash";
// import "./media-library.scss";

const { Component, Fragment } = React;
const { get } = lodash;
const expectError = (mes: string ): string => `Expect ${mes}. Non found!`

export function createMediaComponents({
        components: { Popover = null },
        data: { withSelect = null},
        hooks: { addFilter = null},
    }) {
    if(!Popover || !withSelect || !addFilter){
        console.error(`
            ${!Popover ? expectError('Popover component'): ''}
            ${!withSelect ? expectError('withSelect data function'): ''}
            ${!addFilter ? expectError('addFilder hook'): ''}
        `.trim())
        return;
    }
    const MediaLibrary = withSelect((select) => ({
        media: select("core").getMediaItems(),
    }))(makeMediaContainer());

    const MediaUpload = makeMediaUpload(Popover, MediaLibrary);

    const replaceMediaUpload = () =>
        withSelect((select) => ({
            mediaLibrary: select("core/editor").getEditorSettings()
                .mediaLibrary,
        }))(MediaUpload);

    addFilter(
        "editor.MediaUpload",
        "core/edit-post/components/media-upload/replace-media-upload",
        replaceMediaUpload
    );
}

function makeMediaUpload(Popover, MediaLibrary) {
    return class MediaUpload extends Component {
        constructor(props) {
            super(props);
            this.state = { isVisible: false };

            this.openPopover = this.openPopover.bind(this);
            this.closePopover = this.closePopover.bind(this);
        }

        openPopover() {
            this.setState({ isVisible: true });
        }

        closePopover() {
            this.setState({ isVisible: false });
        }

        render() {
            if (!(this.props as any).mediaLibrary) {
                console.log("Media Library is deactivated");
                return false;
            }

            const { isVisible } = this.state as any;

            return (
                <Fragment>
                    {isVisible && (
                        <Popover
                            className="media-library__popover"
                            onClose={this.closePopover}
                            onClick={(event) => event.stopPropagation()}
                            position="middle left"
                            headerTitle={__("Media Library")}
                        >
                            <MediaLibrary
                                {...this.props}
                                closePopover={this.closePopover}
                            />
                        </Popover>
                    )}
                    {(this.props as any).render({ open: this.openPopover })}
                </Fragment>
            );
        }
    };
}

function makeMediaContainer() {
    return class MediaContainer extends Component {
        constructor(props) {
            super(props);
            this.onImageClick = this.onImageClick.bind(this);
        }

        onImageClick(img) {
            const {
                onSelect,
                closePopover,
                gallery = false,
                multiple = false,
            } = this.props as any;

            const imgObject = {
                alt: img.alt_text,
                caption: img.caption.raw,
                id: img.id,
                link: img.link,
                mime: img.mime_type,
                sizes: img.media_details.sizes,
                media_details: img.media_details,
                subtype: img.mime_type.split("/")[1],
                type: img.mime_type.split("/")[0],
                url: img.source_url,
                data: img.data,
            };

            if (gallery || multiple) {
                onSelect([imgObject]);
            } else {
                onSelect(imgObject);
            }
            closePopover();
        }

        render() {
            const { media, allowedTypes = [] } = this.props as any;
            const items =
                media &&
                media.filter(
                    (item) =>
                        !allowedTypes.length ||
                        allowedTypes.includes(item.media_type)
                );
            return (
                <div className="media-library__popover__content">
                    {items &&
                        items.map((item) => {
                            const sourceUrl =
                                get(
                                    item,
                                    "media_details.sizes.thumbnail.source_url"
                                ) ||
                                (item.media_type === "image" &&
                                    item.source_url);
                            const buttonStyle = sourceUrl
                                ? { backgroundImage: `url(${sourceUrl})` }
                                : {};

                            return (
                                <button
                                    key={item.id}
                                    className="media-library-thumbnail"
                                    style={buttonStyle}
                                    onClick={() => this.onImageClick(item)}
                                ></button>
                            );
                        })}
                </div>
            );
        }
    };
}
