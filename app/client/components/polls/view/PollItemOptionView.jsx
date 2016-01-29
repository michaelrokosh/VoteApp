C.PollItemOptionView = React.createClass({
  PropTypes: {
    pollItemOption: React.PropTypes.object
  },

  vote() {
    Meteor.call('vote', this.props.pollItemOption._id);
  },

  render() {
    const { pollItemOption } = this.props;

    return (
      <button className="waves-effect waves-light btn-large" onClick={ this.vote }>{ pollItemOption.text } ({pollItemOption.votes})</button>
    );
  }
});
