import React from 'react';

import Highcharts from 'highcharts';

class BarsChart extends React.Component {
  componentWillReceiveProps(props) {
    const { pollItemOptions } = props;

    const chart = this.chart || null;
    if (chart && pollItemOptions.length) {
      pollItemOptions.forEach(function (option, i) {
        chart.series[i].data[i] && chart.series[i].data[i].update([`${option.text} (${option.votes})`, option.votes]);
      });
    }
  }

  componentDidMount() {
    const { pollItem, pollItemOptions } = this.props;
    if (pollItem && pollItemOptions) {
      this.chart = new Highcharts.Chart(this.chartProps());
    }
  }

  chartProps() {
    const { pollItem, pollItemOptions } = this.props;
    const { params } = this.props;
    let showLabels = false;
    let showLegend = true;
    let labelsDistance = 0;
    if (params) {
      if (params.labels === '1') showLabels = true;
      if (params.legend === '0') showLegend = false;
      if (params.labelsDistance) labelsDistance = parseInt(params.labelsDistance);
    }

    let chartProps = {
      credits: {
        text: 'VoteApp.xyz',
        href: 'http://voteapp.xyz'
      },
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'bar',
        renderTo: 'chart-' + pollItem._id
      },
      exporting: { enabled: false },
      title: {
        text: ''
      },
      tooltip: {
        pointFormat: ''
      },
      yAxis: {
        min: 0,
        title: {
            text: ''
        }
      },
      plotOptions: {
        series: {
          stacking: 'normal'
        },
        bar: {
          showInLegend: false
        }
      }
    };

    let series = [];
    let categories = [];

    for (var i = 0; i < pollItemOptions.length; i++) {
      categories[i] = pollItemOptions[i].text;
      let data = Array.apply(null, Array(pollItemOptions.length)).map(Number.prototype.valueOf, 0);
      data[i] = pollItemOptions[i].votes;
      series[i] = {
        name: pollItemOptions[i].text,
        data: data
      };
    }

    chartProps.series = series;
    chartProps.xAxis = {
      categories: categories
    };

    return chartProps;
  }

  render() {
    const { pollItem, pollItemOptions } = this.props;
    return (
      <div className="chart" id={ "chart-" + pollItem._id }></div>
    );
  }
}

BarsChart.PropTypes = {
  pollItemId: React.PropTypes.string.required,
  params: React.PropTypes.object
}

export default BarsChart