import React from 'react';

ChartLayout = React.createClass({
  render() {
    return (
      <div id="chart">
        {this.props.content}
      </div>
    )
  }
});