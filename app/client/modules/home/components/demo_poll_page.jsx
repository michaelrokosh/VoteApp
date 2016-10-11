import React from 'react';

import PollView from '../../polls/containers/poll_view/poll_view.js';
import EditPoll from '../../polls/containers/edit_poll/edit_poll.js';

class DemoPollPage extends React.Component {
  render() {
    const { 
      userId,
      pollId,
      poll, 
      preview 
    } = this.props;

    if (preview) {
      return (
        <PollView pollId={ pollId } preview={ true }/> 
      )
    }

    if (pollId === 'demoPoll' || userId && userId === poll.userId) {
      return (
        <EditPoll pollId={ pollId } />
      )
    } else {
      return (
        <PollView pollId={ pollId } />
      )
    }
  }
}

DemoPollPage.PropTypes = {
  preview: React.PropTypes.boolean,
  pollId: React.PropTypes.string
}

export default DemoPollPage;