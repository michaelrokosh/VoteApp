import React from 'react';

Tooltipped = React.createClass({
  PropTypes: {
    text: React.PropTypes.string.isRequired,
    position: React.PropTypes.string,
    delay: React.PropTypes.number
  },

  componentDidMount() {
    const { text, position = "bottom", delay = 10 } = this.props;

    $(ReactDOM.findDOMNode(this)).tooltip({ 
      delay: delay 
    });
  },

  render() {
    const { text, position = "bottom", delay = 10 } = this.props;

    const childContent = React.cloneElement(this.props.children, { 
      className: this.props.children.props.className + ' tooltipped',
      'data-tooltip': text,
      'data-position': position,
      'data-delay': delay
    });

    return childContent;
  }
});
