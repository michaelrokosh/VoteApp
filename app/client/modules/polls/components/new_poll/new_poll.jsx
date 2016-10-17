import React from 'react';

import FormErrors from '../../../core/components/general/form_errors.jsx';
import FormInput from '../../../core/components/general/form_input.jsx';
import Tooltipped from '../../../core/components/general/tooltipped.jsx';

class NewPoll extends React.Component {
    componentWillUnmount() {
        const { clearErrors } = this.props;
        clearErrors();
    }

    createPoll(e) {
        e.preventDefault();
        const { createPoll } = this.props;
        const pollName = e.target.pollname.value;
        const isPrivate = e.target.togglePrivatePoll.checked;
        
        createPoll(pollName, isPrivate);
    }

    render() {
        const { errors, createPoll } = this.props;

        return (
            <div className="container">
                <div className="row">
                    <div className="col s12 m6 offset-m3">
                        <h1>New Poll</h1>

                        <form onSubmit={ e => this.createPoll(e) }>
                            <FormErrors errors={errors} />
                            <FormInput  name="PollName" type="text" label="Poll name" />
                            <div className="pull-left">
                                <Tooltipped position="bottom" text="Private/public poll">
                                  <span>
                                    <input type="checkbox" id="togglePrivatePoll" />
                                    <label htmlFor="togglePrivatePoll">Private</label>
                                  </span>
                                </Tooltipped>
                            </div>
                            <div className="pull-right">
                                <input type="submit" className="btn"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewPoll;