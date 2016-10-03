import React from 'react';

import Tooltipped from '../../../core/components/general/tooltipped.jsx';

class PollsPreviewItem extends React.Component {
  render() {
    const { 
      poll, 
      userId, 
      index,
      togglePrivatePoll
    } = this.props;

    let privateToggleContainer;
    let editButton;

    if (userId === poll.userId) {
      privateToggleContainer = (
        <Tooltipped position="bottom" text="Private/public poll">
          <span>
            <input 
              type="checkbox" 
              id={ "togglePrivatePoll" + poll._id } 
              onChange={ togglePrivatePoll.bind(null, poll._id) } 
              checked={ poll.isPrivate } 
            />
            <label htmlFor={ "togglePrivatePoll" + poll._id }>Private</label>
          </span>
        </Tooltipped>
      );

      editButton = <a href={ FlowRouter.path('EditPoll', { _id: poll._id }) }>Edit</a>;
    }

    return (
       <div className="col s12 m12" key={ index }>
        <div className="poll-item-card card white">
          <div className="card-content black-text">
            <span className="card-title">{ poll.name }</span>
            <div className="poll-item-card-description black-text">
              <p>{ poll.description ? poll.description : '' }</p>
              <small className="created-at">{ poll.createdAt && moment(poll.createdAt).fromNow() }</small>
            </div>
          </div>
          <div className="card-action">
            <a href={ FlowRouter.path('Poll', { _id: poll._id }) }>Open</a>
            { editButton }
            { privateToggleContainer }
          </div>
        </div>
      </div>
    )
  }
}

PollsPreviewItem.PropTypes = {
  userId: React.PropTypes.string
}

export default PollsPreviewItem;