import React from 'react';

import Tooltipped from '../../../core/components/general/tooltipped.jsx';
import FormInput from '../../../core/components/general/form_input.jsx';
import FormErrors from '../../../core/components/general/form_errors.jsx'

class EditPollItemOption extends React.Component {
  handleKeyUp(e) {
    const { handleKeyUp, pollItemOption } = this.props;

    handleKeyUp(e, pollItemOption._id)
  }

  updateText(e) {
    const { updateText, pollItemOption } = this.props;

    updateText(e, pollItemOption._id);
  }

  render() {
    const { 
      pollItemOption, 
      index,
      removePollItemOption
    } = this.props;

    return (
      <div className="poll-item-option">
        <FormInput 
          name={ index.toString() } 
          type="text" 
          className="poll-item-option" 
          placeholder="Option label" 
          label={ index.toString() } 
          onKeyUp={ this.handleKeyUp.bind(this) } 
          onBlur={ this.updateText.bind(this) } 
          value={ pollItemOption.text }
        />
        <Tooltipped position="bottom" text="Remove this option">
          <i 
            className="remove-poll-item-option material-icons dp48" 
            onClick={ removePollItemOption.bind(null, pollItemOption._id) }>
            delete
          </i>
        </Tooltipped>
      </div>
    );
  }
}

EditPollItemOption.PropTypes = {
    pollItemOption: React.PropTypes.object,
    index: React.PropTypes.number
}

export default EditPollItemOption;