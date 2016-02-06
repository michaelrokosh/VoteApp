C.EditablePoll = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      currentUser: Meteor.user(),
      poll: Polls.findOne({ _id: FlowRouter.getParam('_id') }),
      pollItems: PollItems.find({ pollId: FlowRouter.getParam('_id') }).fetch()
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

    PollItems.insert({
      text: question,
      userId: currentUser._id,
      pollId: poll._id,
      active: false,
      showResults: false,
      disabled: true
    }, function (err, pollItemId) {
      if (!err) {
        let pollItemOptions = e.target.getElementsByClassName('poll-item-option');
        for (let i = 0; i < pollItemOptions.length; i++) {
          PollItemOptions.insert({
            pollItemId: pollItemId,
            pollId: poll._id,
            text: pollItemOptions[i].value,
            rank: i + 1,
            votes: 0
          });
        }
      }
      e.target.reset();
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
    const { currentUser, poll, pollItems } = this.data;

    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m6 offset-m3">
            <h1 className="text-center">{ poll.name }</h1>

            { pollItems.map(this.renderPollItem) }
            
            <h4>Add new question</h4>
            <form onSubmit={this.addNewPollItem}>
              <C.FormErrors errors={this.state.errors} />
              <C.FormInput hasError={!!this.state.errors.question} name="Question" type="text" label="Question" placeholder="Are oranges better than tangerines?" />
              <C.FormInput hasError={!!this.state.errors.question} name="1" type="text" className="poll-item-option" label="1" placeholder="Yes" />
              <C.FormInput hasError={!!this.state.errors.question} name="2" type="text" className="poll-item-option" label="2" placeholder="No" />
              <input type="submit" className="btn" value="Add"/>
            </form>
          </div>
        </div>
        <a className="btn-floating btn-large waves-effect waves-light preview-btn" href={ FlowRouter.path('PollPreview', { _id: poll._id }) } target="_blank">
          <i className="material-icons">visibility</i>
        </a>
      </div>
    );
  }
});
