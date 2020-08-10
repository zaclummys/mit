import React from 'react';

import { Button } from '../button/button';
import { HiddenInputFile } from '../hidden-input-file/hidden-input-file';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

function isValidImageMime (file) {
    if (file.type == 'image/png') {
        return true;
    }

    if (file.type == 'image/jpeg') {
        return true;
    }

    if (file.type == 'image/gif') {
        return true;
    }

    return false;
}

function isValidImageSize (file) {
    return file.size < MAX_IMAGE_SIZE;
}

export class ImageMessageFormController extends React.Component {
    constructor () {
        super();

        this.state = {};
    }

    sendImageMessage (image) {
        this.props.actionSendImageMessage({
            image
        });
    }

    handleInputFileChange (event) {
        const file = event.target.files[0];

        if (!isValidImageMime(file)) {
            return;
        }

        if (!isValidImageSize(file)) {
            return;
        }

        this.sendImageMessage(file);
    }

    render () {
        return <ImageMessageFormView
            onInputFileChange={event => this.handleInputFileChange(event)} />;
    }
}

export function ImageMessageFormView ({ onInputFileChange }) {
    return (
        <div>
            <HiddenInputFile accept="image/*" onChange={ onInputFileChange }>
                {ref => (
                    <Button onClick={() => ref.current.click() }>IMAGE</Button>
                )}
            </HiddenInputFile>
        </div>
    );
}