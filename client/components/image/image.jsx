import React from 'react';
import ImageStyle from './image.css';

export class ImageController extends React.Component {
    constructor () {
        super();

        this.state = {
            url: null
        };
    }

    componentDidMount () {
        const image = this.props.image;

        if (image instanceof ArrayBuffer) {
            const blob = new Blob([image]);

            this.setURL(URL.createObjectURL(blob));
        }

        else if (image instanceof Blob) {
            this.setURL(URL.createObjectURL(image));
        }

        else {
            this.setURL(image);
        }

    }

    componentWillUnmount () {
        if (this.state.url.startsWith('blob:')) {
            URL.revokeObjectURL(this.state.url);
        }
    }

    setURL (url) {
        this.setState({
            url
        });
    }

    render () {
        return <ImageView url={ this.state.url } />
    }
}

export function ImageView ({ url }) {
    return url && <img className={ ImageStyle.image } src={ url } />;
}