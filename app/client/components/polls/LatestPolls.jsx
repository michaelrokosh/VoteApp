C.LatestPolls = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      polls: Polls.find({}, { sort: { createdAt: -1 } }).fetch()
    }
  },

  renderPoll(poll, index) {
    let className = 'poll-item card white col s12 m5'
    if (index % 2 !== 0) className += ' offset-m2';

    return (
      <div className={ className } key={ index }>
        <div className="card-content black-text">
          <span className="card-title">{ poll.name }</span>
        </div>
        <div className="card-action">
          <a href={ FlowRouter.path('Poll', { _id: poll._id }) }>Go</a>
          <small className="pull-right">{ poll.createdAt && moment(poll.createdAt).fromNow() }</small>
        </div>
      </div>
    )
  },

  render() {
    const { polls } = this.data;

    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m6 offset-m3">
            <div className="row">
            { polls.map(this.renderPoll) }
            </div>
          </div>
        </div>
      </div>
    );
  }
});
