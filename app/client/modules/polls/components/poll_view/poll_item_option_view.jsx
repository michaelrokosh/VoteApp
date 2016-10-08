import React from 'react';

import { HIGHCHARTS_COLORS } from '../../../core/bootstrap.js';

class PollItemOptionView extends React.Component {
  render() {
    const { 
      pollItemOption, 
      index, 
      pollItem, 
      vote,
      voteAction 
    } = this.props;

    const buttonStyle = {
      backgroundColor: HIGHCHARTS_COLORS[index] || HIGHCHARTS_COLORS[index - HIGHCHARTS_COLORS.length]
    };

    let buttonIcon;
    let buttonClass = 'waves-effect waves-light btn-large vote-btn';
    let buttonLabel = pollItem.showResults ?  `${pollItemOption.text} (${pollItemOption.votes})` : pollItemOption.text;
    if (vote) {
      buttonIcon = <i className="material-icons left">done</i>;
    }
    
    return (
      <button 
        className={ buttonClass } 
        style={ buttonStyle } 
        disabled={ pollItem.disabled } 
        onClick={ voteAction.bind(null, pollItemOption._id) }>
        { buttonIcon }{ buttonLabel }
      </button>
    );
  }
}

PollItemOptionView.PropTypes = {
  pollItemOption: React.PropTypes.object,
  preview: React.PropTypes.boolean,
  index: React.PropTypes.number
}

export default PollItemOptionView;