C.PollItemOptionView = React.createClass({
  PropTypes: {
    pollItemOption: React.PropTypes.object
  },

  mixins: [ReactMeteorData],

  getMeteorData() {
    Meteor.subscribe('vote', this.props.pollItemOption._id);

    return {
      pollItem: PollItems.findOne({ _id: this.props.pollItemOption.pollItemId }),
      vote: Votes.findOne({ 
        userId: Meteor.userId(),
        pollItemOptionId: this.props.pollItemOption._id 
      })
    }
  },

  vote(e) {
    $(e.target).closest('.poll-item').find('.vote-btn').removeClass('green');
    Meteor.call('vote', this.props.pollItemOption._id);
    $(e.target).addClass('green');
  },

  render() {
    const { pollItemOption } = this.props;
    const { pollItem } = this.data;
    let buttonLabel = pollItem.showResults ?  `${pollItemOption.text} (${pollItemOption.votes})` : pollItemOption.text;
    return (
      <button className="waves-effect waves-light btn-large vote-btn" disabled={ pollItem.disabled } onClick={ this.vote }>{ buttonLabel }</button>
    );
  }
});
