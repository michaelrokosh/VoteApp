C.EditablePoll = React.createClass({
  PropTypes: {
    pollId: React.PropTypes.string
  },

  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      currentUser: Meteor.user(),
      poll: Polls.findOne({ _id: this.props.pollId }),
      pollItems: PollItems.find({ pollId: this.props.pollId }).fetch()
    }
  },

  getInitialState() {
    return {
      errors: {}
    }
  },

  addNewPollItem(e) {
    e.preventDefault();

    const { currentUser, poll, pollItems, activePollItem } = this.data;
    let question = e.target.question.value;
    let errors = {};

    if (!question) {
      errors.question = "Question required"
    }

    this.setState({
      errors: errors
    });

    if (! _.isEmpty(errors)) {
      e.target.reset();
      return;
    }

    const pollItemOptions = e.target.getElementsByClassName('poll-item-option');
    let options = [];

    for (let i = 0; i < pollItemOptions.length; i++) {
      options.push({
        text: pollItemOptions[i].value
      });
    }

    Meteor.call('PollItems/insert', poll._id, question, options, (err, res) => {
      if (!err) {
        e.target.reset();
      }
    });
  },

  togglePrivatePoll(e) {
    Meteor.call('Polls/togglePrivate', this.data.poll._id);
  },

  renderPollItem(pollItem, index) {
    return (
      <div key={ index }>
        <C.PollItem pollItem={ pollItem }/>
      </div>
    )
  },

  render() {
    const { currentUser, poll, pollItems } = this.data;

    return (
      <div className="editable-poll">
        <h1 className="text-center">{ poll.name }</h1>
        <p>
          <C.Tooltipped position="bottom" text="Private/public poll">
            <span>
              <input type="checkbox" id="togglePrivatePoll" onChange={ this.togglePrivatePoll } checked={ poll.isPrivate } />
              <label htmlFor="togglePrivatePoll">Private</label>
            </span>
          </C.Tooltipped>
        </p>
        { pollItems.map(this.renderPollItem) }
        
        <h4>Add new question</h4>
        <form onSubmit={this.addNewPollItem}>
          <C.FormErrors errors={this.state.errors} />
          <C.FormInput hasError={!!this.state.errors.question} name="Question" type="text" label="Question" placeholder="Are oranges better than tangerines?" />
          <C.FormInput hasError={!!this.state.errors.question} name="1" type="text" className="poll-item-option" label="1" placeholder="Yes" />
          <C.FormInput hasError={!!this.state.errors.question} name="2" type="text" className="poll-item-option" label="2" placeholder="No" />
          <C.Tooltipped text="Add new poll item">
            <input type="submit" className="btn tooltipped" value="Add"/>
          </C.Tooltipped>
        </form>
        <C.Tooltipped position="left" text="Preview">
          <a className="btn-floating btn-large waves-effect waves-light preview-btn" href={ FlowRouter.path('PollPreview', { _id: poll._id }) } target="_blank">
            <i className="material-icons">visibility</i>
          </a>
        </C.Tooltipped>
      </div>
    );
  }
});
