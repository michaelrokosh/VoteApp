import React from 'react';

import Tooltipped from '../../../core/components/general/tooltipped.jsx';
import FormInput from '../../../core/components/general/form_errors.jsx';
import FormErrors from '../../../core/components/general/form_input.jsx'

class EditPollItemOptions extends React.Component {
  updateText(e) {
    const updatedText = e.target.value;

    Meteor.call('PollItemOptions/updateText', this.props.pollItemOption._id, updatedText);
    return;
  }

  handleKeyUp(e) {
    if (e.which === 13) {
      this.updateText(e);
    } 
  }

  removePollItem(e) {
    e.preventDefault();

    Meteor.call('PollItemOptions/removeById', this.props.pollItem._id);
    return;
  }

  removePollItemOption(e) {
    e.preventDefault();

    Meteor.call('PollItemOptions/removeById', this.props.pollItemOption._id);
    return;
  }

  render() {
    const { pollItemOption, index } = this.props;

    return (
      <div className="poll-item-option">
        <FormInput name={ index.toString() } type="text" className="poll-item-option" placeholder="Option label" label={ index.toString() } onKeyUp={ this.handleKeyUp } onBlur={ this.updateText } value={ pollItemOption.text }/>
        <Tooltipped position="bottom" text="Remove this option">
          <i className="remove-poll-item-option material-icons dp48" onClick={ this.removePollItemOption }>delete</i>
        </Tooltipped>
      </div>
    );
  }
}

EditPollItemOptions.PropTypes = {
    pollItemOption: React.PropTypes.object,
    index: React.PropTypes.number
}

export default EditPollItemOptions;