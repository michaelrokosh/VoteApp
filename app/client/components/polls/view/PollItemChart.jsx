C.PollItemChart = React.createClass({
  PropTypes: {
    pollItemId: React.PropTypes.string.required
  },

  mixins: [ReactMeteorData],

  getMeteorData() {
    const pollItemOptions = PollItemOptions.find({ pollItemId: this.props.pollItemId }).fetch();
    const { pollItemId } = this.props;
    const chart = this.chart || null;
    if (chart) {
      pollItemOptions.forEach(function (option, i) {
        chart.series[0].data[i] && chart.series[0].data[i].update([option.text, option.votes]);
      });
    }
    return {
      pollItemOptions: pollItemOptions,
      pollItem: PollItems.findOne({ _id: pollItemId })
    }
  },

  componentDidMount() {
    const { pollItem, pollItemOptions } = this.data;
    this.chart =  new Highcharts.Chart(this.chartProps());
  },

  chartProps() {
    const { pollItem, pollItemOptions } = this.data;
    let chartProps = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        renderTo: 'chart-' + pollItem._id
      },
      title: {
        text: ''
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true
          },
          showInLegend: true
        }
      }
    };

    let series = [];
    series.push({
      name: 'Votes',
      colorByPoint: true,
      data: []
    });

    pollItemOptions.forEach(function (option) {
      series[0].data.push([option.text, option.votes]);
    });

    chartProps.series = series;
    return chartProps;
  },

  render() {
    const { pollItem, pollItemOptions } = this.data;
    return (
      <div className="chart" id={ "chart-" + pollItem._id }></div>
    );
  }
});
