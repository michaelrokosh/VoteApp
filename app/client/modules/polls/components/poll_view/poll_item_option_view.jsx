import React from 'react';

class PollItemOptionView extends React.Component {
  vote() {
    // if (this.props.preview) {
    //   alert('You can\'n vote in the preview mode');
    //   return;
    // }

    Meteor.call('vote', this.props.pollItemOption._id);
  }

  render() {
    const { pollItemOption, index, pollItem, vote } = this.props;

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
        onClick={ this.vote.bind(this) }>
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