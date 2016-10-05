import React from 'react';

import FormErrors from '../../../core/components/general/form_errors.jsx';
import FormInput from '../../../core/components/general/form_input.jsx';
import Tooltipped from '../../../core/components/general/tooltipped.jsx';
import EditPollItemOption from '../../containers/edit_poll_item_option.js';

class EditPollItem extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        active: props.pollItem.active
      }
  }

  handleKeyUp(e) {
    const { handleKeyUp, pollItem } = this.props;
    handleKeyUp(e, pollItem._id);
  }

  updateText(e) {
    const { updateText, pollItem } = this.props;
    updateText(e, pollItem._id);
  }

  componentDidMount() {
    $('.modal-trigger').leanModal({
      complete: function () {
        $('.lean-overlay').remove();
      }
    });
  }

  
  renderVotes(vote, index) {
    const { pollItemOptions } = this.props;

    let pollItemOption;
    pollItemOptions.forEach((item) => {
      if(item._id == vote.pollItemOptionId) {
        pollItemOption = item;
      }
    });

    return (
      <li className="collection-item avatar" key={ index }>
        <i className="material-icons circle grey">done</i>
        <span className="title">{ pollItemOption && pollItemOption.text }</span>
        <p>{ vote.email } - { moment(vote.createdAt).fromNow() }</p>
      </li>
    )
  }

  renderPollItemOption(option, index) {
      return (
        <div key={ index }>
          <EditPollItemOption pollItemOption={ option } index={ index + 1 }/>
        </div>
      )
  }
  
  handleDescriptionKeyUp(e) {
      const { handleDescriptionKeyUp, pollItem} = this.props;
      handleDescriptionKeyUp(e, pollItem._id)
  }

  updateDescription(e) {
      const { updateDescription, pollItem } = this.props;
      updateDescription(e, pollItem._id)
  }

  handleChartTypeChange(e) {
    const { handleChartTypeChange, pollItem } = this.props;
    handleChartTypeChange(e, pollItem._id);
  }

  toggleDisabled(e) {
    const { toggleDisabled, pollItem } = this.props;
    toggleDisabled(e, pollItem);
  }


  render() {
    const { 
      pollItemOptions, 
      votes, 
      pollItem,
      removePollItem,
      addPollItemOption,
      toggleActive,
      toggleShowResults,
    } = this.props;

    const  errors = {}
    
    return (
      <div className="poll-item">
        <form>
          <FormErrors errors={ errors } />
          <div className="poll-item-question">
            <FormInput 
              hasError={ !!errors.question } 
              name="Question" 
              type="text" 
              label="Question" 
              onKeyUp={ this.handleKeyUp.bind(this) } 
              onBlur={ this.updateText.bind(this) } 
              value={ pollItem.text } 
              placeholder="Enter your question here"
            />
            <Tooltipped position="bottom" text="Remove this question">
              <i 
                className="remove-poll-item material-icons dp48" 
                onClick={ removePollItem.bind(null, pollItem._id) }>
                delete
              </i>
            </Tooltipped>
          </div>

          <div className="poll-item-description">
            <FormInput 
              type="textarea" 
              className="materialize-textarea" 
              name="Description" 
              label="Description" 
              hasError={ !!errors.description } 
              onKeyUp={ this.handleDescriptionKeyUp.bind(this) } 
              onBlur={ this.updateDescription.bind(this) } 
              value={ pollItem.description } 
              placeholder="Enter your description here"
            />
          </div>
          <div className="chart-type">
            <label>Chart type</label>
            <select 
              className="chart-type-select" 
              value={ pollItem.chartType } 
              onChange={ this.handleChartTypeChange.bind(this) }>
              <option value="" disabled>Choose a chart type</option>
              <option value="pie" data-icon="images/sample-1.jpg" className="circle">Pie</option>
              <option value="bars" data-icon="images/office.jpg" className="circle">Bars</option>
            </select>
          </div>
          <div className="control-checkboxes">
            <p>
              <Tooltipped position="bottom" text="Enable/disable voting">
                <span>
                  <input 
                    type="checkbox" 
                    id={ "disabled-checkbox-" + pollItem._id } 
                    onChange={ this.toggleDisabled.bind(this) } 
                    checked={ pollItem.disabled } 
                  />
                  <label htmlFor={ "disabled-checkbox-" + pollItem._id }>Disabled</label>
                </span>
              </Tooltipped>
            </p>
            <p>
              <Tooltipped position="bottom" text="Show/hide results">
                <span>
                  <input 
                    type="checkbox" 
                    id={ "show-results-checkbox-" + pollItem._id } 
                    onChange={ toggleShowResults.bind(null, pollItem) } 
                    checked={ pollItem.showResults } 
                  />
                  <label htmlFor={ "show-results-checkbox-" + pollItem._id }>Show Results</label>
                </span>
              </Tooltipped>
            </p>
          </div>

          { pollItemOptions.map(this.renderPollItemOption) }

          <div className="text-right">
            <div className="switch pull-left">
              <Tooltipped position="bottom" text="Visibility">
                <label>
                  Off
                  <input 
                    type="checkbox" 
                    onChange={ toggleActive.bind(null, pollItem) } 
                    checked={ pollItem.active }
                  />
                  <span className="lever"></span>
                  On
                </label>
              </Tooltipped>
            </div>
            <div className="control-buttons">
              <Tooltipped position="bottom" text="Add new option">
                <a 
                  onClick={ addPollItemOption.bind(null, pollItem._id) } 
                  className="btn btn-small waves-effect waves-light add-option-btn"
                >
                  <i className="material-icons">add</i>
                </a>
              </Tooltipped>
              <Tooltipped position="bottom" text="Show votes">
                <a
                  className="btn-floating btn-small waves-effect waves-light modal-trigger" 
                  href={ "#showVotes" + pollItem._id }>
                  <i className="material-icons">supervisor_account</i>
                </a>
              </Tooltipped>
              <Tooltipped position="bottom" text="Open the chart">
                <a 
                  href={ FlowRouter.path('Chart', { pollId: pollItem.pollId, pollItemId: pollItem._id }) } 
                  className="btn btn-small waves-effect grey waves-light" 
                  target="_blank">
                  <i className="material-icons">open_in_new</i>
                </a>
              </Tooltipped>            
            </div>
           
          </div>
        </form>

        <div id={ "showVotes" + pollItem._id } className="modal bottom-sheet">
          <div className="modal-content">
            <h4>Votes</h4>
            <ul className="collection">
              { votes.map(this.renderVotes.bind(this)) }
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

EditPollItem.PropTypes = {
  pollItem: React.PropTypes.object.isRequired
}

export default EditPollItem;