import React from 'react';

import BarsChart from '../../../charts/containers/bars_chart.js';
import PieChart from '../../../charts/containers/pie_chart.js';

class PollItemChartWrapper extends React.Component {
  render() {
    const { 
      pollItem, 
      pollItemOptions, 
      isUser,
      params
    } = this.props;

    let chartComponent;

    if (pollItem.chartType === 'bars') {
      chartComponent = <BarsChart pollItemId={ pollItem._id } params={ params }/>;
    } else {
      chartComponent = <PieChart pollItemId={ pollItem._id } params={ params }/>;
    }

    if (pollItem.showResults) {
      return chartComponent;
    } else {
      return (
        <small>Results are hidden</small>
      )
    }

    if (currentUser && currentUser._id === pollItem.userId || pollItem.showResults) {
      return chartComponent;
    } else {
      return (
        <h3>Results are hidden</h3>
      )
    }
  }
}

PollItemChartWrapper.PropTypes = {
  pollItemId: React.PropTypes.string.required,
  params: React.PropTypes.object
}

export default PollItemChartWrapper;
