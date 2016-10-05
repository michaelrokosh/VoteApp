import React from 'react';

import PollView from '../../../polls/containers/poll_view.js';
import EditPoll from '../../../polls/containers/edit_poll.js';

class DemoPollPage extends React.Component {


  // mixins: [ReactMeteorData],
  // getMeteorData() {
  //   const pollHandle = Meteor.subscribe('poll', this.props.pollId);
  //   const pollItemsHandle = Meteor.subscribe('pollItems', this.props.pollId);
  //   const pollItemOptionsHandle = Meteor.subscribe('pollItemOptionsByPollId', this.props.pollId);
  //   let data = {
  //     isReady: false
  //   };
    
  //   if (pollHandle.ready() && pollItemsHandle.ready() && pollItemOptionsHandle.ready()) {
  //     data.poll = Polls.findOne({ _id: this.props.pollId });
  //     data.pollItems = PollItems.find({ pollId: this.props.pollId }).fetch();
  //     data.pollItemOptions = PollItemOptions.find({ pollId: this.props.pollId }).fetch();
  //     data.isReady = true;
  //     data.currentUser = Meteor.user();
  //   }

    // = pollHandle.ready() && pollItemsHandle.ready() && pollItemOptionsHandle.ready();

  //   return data;
  // },

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