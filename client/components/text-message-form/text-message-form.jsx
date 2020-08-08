import React from 'react';
import TextMessageFormStyle from './text-message-form.css';

import { Button } from '../button/button';
import { Input } from '../input/input';

export class TextMessageFormController extends React.Component {
    constructor () {
        super();

        this.state = {
            text: ''
        };
    }

    clear () {
        this.setState({
            text: ''
        });
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
            this.actionSendTextMessage({ text });

            this.clear();
        }
    }

    actionSendTextMessage (message) {
        this.props.actionSendTextMessage(message);
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
            <form onSubmit={event => this.handleFormSubmit(event)}>
                <div className={ TextMessageFormStyle.form }>
                    <Input required type="text" hint="Write your message..." value={ this.props.text } onChange={event => this.handleInputChange(event)} />
                    <Button primary raised type="submit">SEND</Button>
                </div>
            </form>
        );
    }
}