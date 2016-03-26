C.LatestPolls = React.createClass({
  PropTypes: {
    userId: React.PropTypes.string
  },

  mixins: [ReactMeteorData],
  getMeteorData() {
    let pollsSelector = {};
    const userId = this.props.userId;
    if (userId) pollsSelector.userId = this.props.userId;

    return {
      polls: Polls.find(pollsSelector, { sort: { createdAt: -1 } }).fetch()
    }
  },

  renderPoll(poll, index) {
    const togglePrivatePoll = () => {
      Meteor.call('Polls/togglePrivate', poll._id);
    };

    let privateToggleContainer;
    let editButton;
    if (Meteor.userId() === poll.userId) {
      privateToggleContainer = (
        <C.Tooltipped position="bottom" text="Private/public poll">
          <span>
            <input type="checkbox" id={ "togglePrivatePoll" + poll._id } onChange={ togglePrivatePoll } checked={ poll.isPrivate } />
            <label htmlFor={ "togglePrivatePoll" + poll._id }>Private</label>
          </span>
        </C.Tooltipped>
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
  },

  render() {
    const { polls } = this.data;
    let infoContainer;
    if (polls.length === 0) {
      infoContainer = (
        <p>No polls...</p>
      )
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m12">
            <div className="row">
              { infoContainer }
              { polls.map(this.renderPoll) }
            </div>
          </div>
        </div>
      </div>
    );
  }
});
