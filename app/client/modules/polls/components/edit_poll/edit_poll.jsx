import React from 'react';

import FormErrors from '../../../core/components/general/form_errors.jsx';
import FormInput from '../../../core/components/general/form_input.jsx';
import Tooltipped from '../../../core/components/general/tooltipped.jsx';
import EditPollItem from '../../containers/edit_poll_item.js';

class EditPoll extends React.Component {
  renderPollItem(pollItem, index) {
    return (
      <div key={ index }>
        <EditPollItem pollItem={ pollItem }/>
      </div>
    )
  }

  addNewPollItem(e) {
    const { poll, pollItems, addNewPollItem } = this.props;
    addNewPollItem(e, poll, pollItems)
  }

  render() {
    const { poll, pollItems, isReady, addNewPollItem, errors } = this.props;

    return (
      <div className="editable-poll">
        <h2 className="text-center">{ poll.name }</h2>

        { pollItems.map(this.renderPollItem) }
        
        <h4>Add new question</h4>
        <form onSubmit={ this.addNewPollItem.bind(this) }>
          <FormErrors errors={ errors } />
          <FormInput 
            hasError={ !!errors.question }  
            name="question" 
            type="text" 
            label="Question" 
            placeholder="Are oranges better than tangerines?" 
          />
          <FormInput 
            hasError={ !!errors.question } 
            name="1" 
            type="text" 
            className="poll-item-option" 
            label="1" 
            placeholder="Yes" 
          />
          <FormInput 
            hasError={ !!errors.question } 
            name="2" 
            type="text" 
            className="poll-item-option" 
            label="2" 
            placeholder="No" 
          />
          <Tooltipped text="Add new poll item">
            <input type="submit" className="btn tooltipped" value="Add"/>
          </Tooltipped>
        </form>

        <Tooltipped position="left" text="Preview">
          <a 
            className="btn-floating btn-large waves-effect waves-light preview-btn" 
            href={ FlowRouter.path('PollPreview', { _id: poll._id }) } 
            target="_blank">
            <i className="material-icons">visibility</i>
          </a>
        </Tooltipped>
      </div>
    );
  }
}


EditPoll.PropTypes = {
  pollId: React.PropTypes.string
}

export default EditPoll;