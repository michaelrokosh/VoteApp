C.PollItem = React.createClass({
  PropTypes: {
    pollItem: React.PropTypes.object.isRequired
  },

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      pollItemOptions: PollItemOptions.find({ pollItemId: this.props.pollItem._id }).fetch(),
      pollItem: PollItems.findOne({ _id: this.props.pollItem._id })
    }
  },

  getInitialState() {
    return {
      errors: {},
      active: this.props.pollItem.active
    }
  },

  updateText(e) { 
    let updatedText = e.target.value;
    PollItems.update({ _id: this.props.pollItem._id }, { $set: { text: updatedText } }, { autoConvert: false });
  },

  removePollItem(e) {
    Meteor.call('pollItems/remove', this.props.pollItem._id);
  },

  addPollItemOption(e) {
    Meteor.call('insertPollItemOption', this.props.pollItem._id);
  },

  toggleActive(e) {
    Meteor.call('pollItems/toggleActive', this.props.pollItem._id, !this.props.pollItem.active); 
  },

  toggleDisabled(e) {
    Meteor.call('pollItems/toggleDisabled', this.props.pollItem._id, !this.props.pollItem.disabled); 
  },

  toggleShowResults(e) {
    Meteor.call('pollItems/toggleShowResults', this.props.pollItem._id, !this.props.pollItem.showResults); 
  },

  renderPollItemOption(option, index) {
    return (
      <div key={ index }>
        <C.PollItemOption pollItemOption={ option } index={ index + 1 }/>
      </div>
    )
  },

  // getVotes() {
  //   Meteor.call('getVotes', this.props.pollItem._id, function (err, res) {
  //     console.log(err || res);
  //     let message = '';
  //     _.each(res, function (vote) {
  //       let email = vote.voter && vote.voter.emails && vote.voter.emails[0].address;
  //       let option = vote.pollItemOption.text;
  //       message += email + ' - ' + option + ' - ' + vote.createdAt.toString() + '\n';
  //     });

  //     alert(message); 
  //   }); 
  // },

  render() {
    let { pollItemOptions } = this.data;
    let { pollItem } = this.props;

    return (
      <div className="poll-item">
        <form onSubmit={ this.updatePollItem }>
          <C.FormErrors errors={ this.state.errors } />
          <div className="poll-item-question">
            <C.FormInput hasError={ !!this.state.errors.question } onChange={ this.updateText } name="Question" type="text" label="Question" value={ this.props.pollItem.text } placeholder="Enter your question here"/>
            <i className="remove-poll-item material-icons dp48" onClick={ this.removePollItem }>delete</i>
          </div>
          <div className="control-checkboxes">
            <p>
              <input type="checkbox" id={ "disabled-checkbox-" + pollItem._id } onChange={ this.toggleDisabled } checked={ this.props.pollItem.disabled } />
              <label htmlFor={ "disabled-checkbox-" + pollItem._id }>Disabled</label>
            </p>
            <p>
              <input type="checkbox" id={ "show-results-checkbox-" + pollItem._id } onChange={ this.toggleShowResults } checked={ this.props.pollItem.showResults } />
              <label htmlFor={ "show-results-checkbox-" + pollItem._id }>Show Results</label>
            </p>
          </div>

          { this.data.pollItemOptions.map(this.renderPollItemOption) }

          <div className="text-right">
            <div className="switch pull-left">
              <label>
                Off
                <input type="checkbox" onChange={ this.toggleActive } checked={ this.props.pollItem.active }/>
                <span className="lever"></span>
                On
              </label>
            </div>
            <div className="control-buttons">
              <a onClick={ this.addPollItemOption } className="btn btn-small waves-effect waves-light add-option-btn">
                <i className="material-icons">add</i>
              </a>
              <a href={ FlowRouter.path('Chart', { pollId: pollItem.pollId, pollItemId: pollItem._id }) } className="btn btn-small waves-effect grey waves-light" target="_blank">
                <i className="material-icons">open_in_new</i>
              </a>
              {/* 
                <a onClick={ this.getVotes } className="btn-floating btn-small waves-effect waves-light">
                  <i className="material-icons">supervisor_account</i>
                </a>
              */}
            </div>
            {/* <input type="button" className="btn red remove-poll-item" onClick={ this.removePollItem } value="Remove"/>*/}
          </div>
        </form>
      </div>
    );
  }
});
