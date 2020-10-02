import React from 'react';

import { Input } from '../input/input';
import { IconButton } from '../icon-button/icon-button';

export class MessageForm extends React.Component {
    handleSubmit (payload) {
        this.props.actionSendMessage(payload);
    }

    render () {
        return <MessageFormView
            onSubmit={payload => this.handleSubmit(payload)} />
    }
}

export class MessageFormView extends React.Component {
    handleFormSubmit (event) {
        event.preventDefault();
        event.stopPropagation();

        const text = event.target.elements.text.value.trim();

        if (text == '') {
            return;
        }

        this.props.onSubmit({
            text
        });

        event.target.reset();
    }

    // handleSendButtonClick (event) {
    //     event.target.form.submit();
    // }

    render () {
        return (
            <form onSubmit={event => this.handleFormSubmit(event)}>
                <Input
                    required
                    name="text"
                    type="text"
                    autoComplete="off"
                    placeholder="Message"
                    trailing={
                        <IconButton
                            primary
                            icon="send" />
                    } />
            </form>
        );
    }
}