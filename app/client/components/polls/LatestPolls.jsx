C.LatestPolls = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      polls: Polls.find({}, { sort: { createdAt: -1 } }).fetch()
    }
  },

  renderPoll(poll, index) {
    return (
      <div className="poll-item" key={ index }>
        <h4 className="text-center">
          <a href={ FlowRouter.path('Poll', { _id: poll._id }) }>{ poll.name }</a>
        </h4>
        <p className="text-center">
          <small>{ poll.createdAt && moment(poll.createdAt).fromNow() }</small>
        </p>
        <hr />
      </div>
    );
  },

  render() {
    const { polls } = this.data;

    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m6 offset-m3">
            { polls.map(this.renderPoll) }
          </div>
        </div>
      </div>
    );
  }
});
