import React from 'react';

import Tooltipped from '../../../core/components/general/tooltipped.jsx';
import FormInput from '../../../core/components/general/form_input.jsx';
import FormErrors from '../../../core/components/general/form_errors.jsx'

class EditPollItemOption extends React.Component {
  handleKeyUp(e) {
      if(e.which === 13) {
        this.updateText(e);
      }
  }

  updateText(e) {
    const {  updateText, pollItemOption } = this.props;
    const updatedText = e.target.value;
    
    updateText(updatedText, pollItemOption._id);
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
          onKeyUp={ e => this.handleKeyUp(e) } 
          onBlur={ e => this.updateText(e) } 
          value={ pollItemOption.text }
        />
        <Tooltipped position="bottom" text="Remove this option">
          <i 
            className="remove-poll-item-option material-icons dp48" 
            onClick={ () => removePollItemOption(pollItemOption._id) }>
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