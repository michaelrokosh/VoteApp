C.PollItemChart = React.createClass({
  PropTypes: {
    pollItemId: React.PropTypes.string.required,
    params: React.PropTypes.object
  },

  mixins: [ReactMeteorData],

  getMeteorData() {
    const pollItemOptions = PollItemOptions.find({ pollItemId: this.props.pollItemId }).fetch();
    const { pollItemId } = this.props;
    const chart = this.chart || null;
    if (chart && pollItemOptions.length) {
      pollItemOptions.forEach(function (option, i) {
        chart.series[0].data[i] && chart.series[0].data[i].update([`${option.text} (${option.votes})`, option.votes]);
      });
    }
    return {
      pollItemOptions: pollItemOptions,
      pollItem: PollItems.findOne({ _id: pollItemId })
    }
  },

  componentDidMount() {
    const { pollItem, pollItemOptions } = this.data;
    if (pollItem && pollItemOptions) {
      this.chart = new Highcharts.Chart(this.chartProps());
    }
  },

  chartProps() {
    const { pollItem, pollItemOptions } = this.data;
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
        type: 'pie',
        renderTo: 'chart-' + pollItem._id
      },
      exporting: { enabled: false },
      title: {
        text: ''
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: false,
          cursor: 'pointer',
          dataLabels: {
            enabled: showLabels,
            distance: labelsDistance
          },
          showInLegend: false
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
      series[0].data.push([`${option.text} (${option.votes})`, option.votes]);
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
