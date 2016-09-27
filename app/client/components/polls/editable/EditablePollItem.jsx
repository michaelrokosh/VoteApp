import React from 'react';

PollItem = React.createClass({
  PropTypes: {
    pollItem: React.PropTypes.object.isRequired
  },

  // mixins: [ReactMeteorData],

  // getMeteorData() {
  //   Meteor.subscribe('votesByPollItemId', this.props.pollItem._id);
  //   return {
  //     votes: Votes.find({ pollItemId: this.props.pollItem._id }, { sort: { createdAt: 1 } }).fetch(),
  //     pollItemOptions: PollItemOptions.find({ pollItemId: this.props.pollItem._id }).fetch(),
  //     pollItem: PollItems.findOne({ _id: this.props.pollItem._id })
  //   }
  // },

  getInitialState() {
    return {
      errors: {},
      active: this.props.pollItem.active
    }
  },

  componentDidMount() {
    $('.modal-trigger').leanModal({
      complete: function () {
        $('.lean-overlay').remove();
      }
    });
  },

  updateText(e) { 
    const updatedText = e.target.value;

    Meteor.call('PollItems/updateText', this.props.pollItem._id, updatedText);
  },

  handleKeyUp(e) {
    if (e.which === 13) {
      this.updateText(e);
    }
  },

  updateDescription(e) {
    const updatedDescription = e.target.value;

    Meteor.call('PollItems/updateDescription', this.props.pollItem._id, updatedDescription);
  },

  handleDescriptionKeyUp(e) {
    if (e.which === 13) {
      this.updateDescription(e);
    }
  },

  removePollItem(e) {
    Meteor.call('PollItems/removeById', this.props.pollItem._id);
  },

  addPollItemOption(e) {
    Meteor.call('PollItemOptions/insert', this.props.pollItem._id);
  },

  toggleActive(e) {
    Meteor.call('PollItems/toggleActive', this.props.pollItem._id, !this.props.pollItem.active); 
  },

  toggleDisabled(e) {
    Meteor.call('PollItems/toggleDisabled', this.props.pollItem._id, !this.props.pollItem.disabled); 
  },

  toggleShowResults(e) {
    Meteor.call('PollItems/toggleShowResults', this.props.pollItem._id, !this.props.pollItem.showResults); 
  },

  renderPollItemOption(option, index) {
    return (
      <div key={ index }>
        <C.PollItemOption pollItemOption={ option } index={ index + 1 }/>
      </div>
    )
  },

  getVotes() {
    Meteor.call('getVotes', this.props.pollItem._id, function (err, res) {
      console.log(err || res);
      let message = '';
      _.each(res, function (vote) {
        let email = vote.voter && vote.voter.emails && vote.voter.emails[0].address;
        let option = vote.pollItemOption.text;
        message += email + ' - ' + option + ' - ' + vote.createdAt.toString() + '\n';
      });

      // alert(message); 
    }); 
  },

  handleChartTypeChange(e) {
    Meteor.call('PollItems/updateChartType', this.props.pollItem._id, e.target.value);
  },

  renderVotes(vote, index) {
    const pollItemOption = PollItemOptions.findOne({ _id: vote.pollItemOptionId });
    return (
      <li className="collection-item avatar" key={ index }>
        <i className="material-icons circle grey">done</i>
        <span className="title">{ pollItemOption && pollItemOption.text }</span>
        <p>{ vote.email } - { moment(vote.createdAt).fromNow() }</p>
      </li>
    )
  },

  render() {
    let { pollItemOptions, votes } = this.data;
    let { pollItem } = this.props;

    return (
      <div className="poll-item">
        <form onSubmit={ this.updatePollItem }>
          <C.FormErrors errors={ this.state.errors } />
          <div className="poll-item-question">
            <C.FormInput hasError={ !!this.state.errors.question } onKeyUp={ this.handleKeyUp } onBlur={ this.updateText } name="Question" type="text" label="Question" value={ this.props.pollItem.text } placeholder="Enter your question here"/>
            <C.Tooltipped position="bottom" text="Remove this question">
              <i className="remove-poll-item material-icons dp48" onClick={ this.removePollItem }>delete</i>
            </C.Tooltipped>
          </div>
          <div className="poll-item-description">
            <C.FormInput type="textarea" className="materialize-textarea" hasError={ !!this.state.errors.description } onKeyUp={ this.handleDescriptionKeyUp } onBlur={ this.updateDescription } name="Description" label="Description" value={ this.props.pollItem.description } placeholder="Enter your description here"/>
          </div>
          <div className="chart-type">
            <label>Chart type</label>
            <select className="chart-type-select" value={ pollItem.chartType } onChange={ this.handleChartTypeChange }>
              <option value="" disabled>Choose a chart type</option>
              <option value="pie" data-icon="images/sample-1.jpg" className="circle">Pie</option>
              <option value="bars" data-icon="images/office.jpg" className="circle">Bars</option>
            </select>
          </div>
          <div className="control-checkboxes">
            <p>
              <C.Tooltipped position="bottom" text="Enable/disable voting">
                <span>
                  <input type="checkbox" id={ "disabled-checkbox-" + pollItem._id } onChange={ this.toggleDisabled } checked={ this.props.pollItem.disabled } />
                  <label htmlFor={ "disabled-checkbox-" + pollItem._id }>Disabled</label>
                </span>
              </C.Tooltipped>
            </p>
            <p>
              <C.Tooltipped position="bottom" text="Show/hide results">
                <span>
                  <input type="checkbox" id={ "show-results-checkbox-" + pollItem._id } onChange={ this.toggleShowResults } checked={ this.props.pollItem.showResults } />
                  <label htmlFor={ "show-results-checkbox-" + pollItem._id }>Show Results</label>
                </span>
              </C.Tooltipped>
            </p>
          </div>

          { this.data.pollItemOptions.map(this.renderPollItemOption) }

          <div className="text-right">
            <div className="switch pull-left">
              <C.Tooltipped position="bottom" text="Visibility">
                <label>
                  Off
                  <input type="checkbox" onChange={ this.toggleActive } checked={ this.props.pollItem.active }/>
                  <span className="lever"></span>
                  On
                </label>
              </C.Tooltipped>
            </div>
            <div className="control-buttons">
              <C.Tooltipped position="bottom" text="Add new option">
                <a onClick={ this.addPollItemOption } className="btn btn-small waves-effect waves-light add-option-btn">
                  <i className="material-icons">add</i>
                </a>
              </C.Tooltipped>
              <C.Tooltipped position="bottom" text="Show votes">
                <a onClick={ this.getVotes } className="btn-floating btn-small waves-effect waves-light modal-trigger" href={ "#showVotes" + pollItem._id }>
                  <i className="material-icons">supervisor_account</i>
                </a>
              </C.Tooltipped>
              <C.Tooltipped position="bottom" text="Open the chart">
                <a href={ FlowRouter.path('Chart', { pollId: pollItem.pollId, pollItemId: pollItem._id }) } className="btn btn-small waves-effect grey waves-light" target="_blank">
                  <i className="material-icons">open_in_new</i>
                </a>
              </C.Tooltipped>            
            </div>
            {/* <input type="button" className="btn red remove-poll-item" onClick={ this.removePollItem } value="Remove"/>*/}
          </div>
        </form>

        <div id={ "showVotes" + pollItem._id } className="modal bottom-sheet">
          <div className="modal-content">
            <h4>Votes</h4>
            <ul className="collection">
              { votes.map(this.renderVotes) }
            </ul>
          </div>
        </div>
      </div>
    );
  }
});
