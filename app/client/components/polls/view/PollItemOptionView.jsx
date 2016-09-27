import React from 'react';

PollItemOptionView = React.createClass({
  PropTypes: {
    pollItemOption: React.PropTypes.object,
    preview: React.PropTypes.boolean,
    index: React.PropTypes.number
  },

  // mixins: [ReactMeteorData],

  // getMeteorData() {
  //   Meteor.subscribe('vote', this.props.pollItemOption._id);

  //   return {
  //     pollItem: PollItems.findOne({ _id: this.props.pollItemOption.pollItemId }),
  //     vote: Votes.findOne({ 
  //       userId: Meteor.userId(),
  //       pollItemOptionId: this.props.pollItemOption._id 
  //     })
  //   }
  // },

  vote(e) {
    if (this.props.preview) {
      alert('You can\'n vote in the preview mode');
      return;
    }

    Meteor.call('vote', this.props.pollItemOption._id);
  },

  render() {
    const { pollItemOption, index } = this.props;
    const { pollItem, vote } = this.data;
    const buttonStyle = {
      backgroundColor: HIGHCHARTS_COLORS[index] || HIGHCHARTS_COLORS[index - HIGHCHARTS_COLORS.length]
    };

    let buttonIcon;
    let buttonClass = 'waves-effect waves-light btn-large vote-btn';
    let buttonLabel = pollItem.showResults ?  `${pollItemOption.text} (${pollItemOption.votes})` : pollItemOption.text;
    if (vote) {
      buttonIcon = <i className="material-icons left">done</i>;
    }
    
    return (
      <button className={ buttonClass } style={ buttonStyle } disabled={ pollItem.disabled } onClick={ this.vote }>{ buttonIcon }{ buttonLabel }</button>
    );
  }
});
