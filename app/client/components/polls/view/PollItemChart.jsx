C.PollItemChart = React.createClass({
  PropTypes: {
    pollItem: React.PropTypes.object.isRequired
  },

  mixins: [ReactMeteorData],

  getMeteorData() {
    let pollItemOptions = PollItemOptions.find({ pollItemId: this.props.pollItem._id }).fetch();
    let { pollItem } = this.props;
    let chart = this.chart || null;
    if (chart) {
      pollItemOptions.forEach(function (option, i) {
        chart.series[0].data[i] && chart.series[0].data[i].update(option.votes);
      });
    }
    return {
      pollItemOptions: pollItemOptions
    }
  },

  componentDidMount() {
    let { pollItem } = this.props;
    let { pollItemOptions } = this.data;
    this.chart =  new Highcharts.Chart(this.chartProps());
  },

  chartProps() {
    let { pollItem } = this.props;
    let { pollItemOptions } = this.data;
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
            enabled: false
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
      series[0].data.push({
        name: option.text,
        y: option.votes
      });
    });

    chartProps.series = series;
    return chartProps;
  },

  render() {
    let { pollItem } = this.props;
    let { pollItemOptions } = this.data;
    return (
      <div id={ "chart-" + pollItem._id }></div>
    );
  }
});
