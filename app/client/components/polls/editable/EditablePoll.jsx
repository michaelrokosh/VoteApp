C.EditablePoll = React.createClass({
  PropTypes: {
    pollId: React.PropTypes.string
  },

  mixins: [ReactMeteorData],
  getMeteorData() {
    const pollHandle = Meteor.subscribe('poll', this.props.pollId);
    const pollItemsHandle = Meteor.subscribe('pollItems', this.props.pollId);
    const pollItemOptionsHandle = Meteor.subscribe('pollItemOptionsByPollId', this.props.pollId);
    let data = {
      isReady: false
    };
    
    if (pollHandle.ready() && pollItemsHandle.ready() && pollItemOptionsHandle.ready()) {
      data.poll = Polls.findOne({ _id: this.props.pollId });
      data.pollItems = PollItems.find({ pollId: this.props.pollId }).fetch();
      data.pollItemOptions = PollItemOptions.find({ pollId: this.props.pollId }).fetch();
      data.isReady = true;
      data.currentUser = Meteor.user();
    }

    return data;
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

  renderPollItem(pollItem, index) {
    return (
      <div key={ index }>
        <C.PollItem pollItem={ pollItem }/>
      </div>
    )
  },

  render() {
    const { currentUser, poll, pollItems, isReady } = this.data;

    if (!isReady) {
      Session.set('isLoading', true);
      return <C.MainLoader />
    }

    Session.set('isLoading', false);

    return (
      <div className="editable-poll">
        <h2 className="text-center">{ poll.name }</h2>

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
