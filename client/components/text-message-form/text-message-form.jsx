import React from 'react';
import TextMessageFormStyle from './text-message-form.css';

import { Button } from '../button/button';

export class TextMessageFormController extends React.Component {
    constructor () {
        super();

        this.state = {
            text: ''
        };
    }

    clear () {
        this.setText('');
    }

    setText (text) {
        this.setState({
            text
        });
    }

    handleInputChange (event) {
        this.setText(event.target.value);
    }

    handleFormSubmit (event) {
        event.stopPropagation();
        event.preventDefault();

        const text = this.state.text.trim();

        if (text) {
            this.props.onFormSubmit({
                text
            });

            this.clear();
        }
    }

    render () {
        return <TextMessageFormView
            text={ this.state.text }
            onFormSubmit={event => this.handleFormSubmit(event)}
            onInputChange={event => this.handleInputChange(event)} />
    }
}

export class TextMessageFormView extends React.Component {
    handleFormSubmit (event) {
        this.props.onFormSubmit(event);
    }

    handleInputChange (event) {
        this.props.onInputChange(event);
    }

    render () {
        return (
            <form className={ TextMessageFormStyle.form } onSubmit={event => this.handleFormSubmit(event)}>
                <TextMessageInput hint="Write your message..." value={ this.props.text } onChange={event => this.handleInputChange(event)} />
                <Button type="submit">SEND</Button>
            </form>
        );
    }
}

function TextMessageInput ({ hint, value, onChange }) {
    return <input required type="text" className={ TextMessageFormStyle.input } value={ value } placeholder={ hint } onChange={ onChange } />;
}