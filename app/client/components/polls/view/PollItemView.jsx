C.PollItemView = React.createClass({
  PropTypes: {
    pollItem: React.PropTypes.object.isRequired
  },

  mixins: [ReactMeteorData],

  getMeteorData() {
    let pollItemOptions = PollItemOptions.find({ pollItemId: this.props.pollItem._id }).fetch();
    let { pollItem } = this.props;

    try {
      if (myNewChart) {
        pollItemOptions.forEach(function (option, i) {
          myNewChart.series[0].data[i].update(option.votes);
        });
        myNewChart.update();
      }
    } catch (e) {}
    return {
      pollItemOptions: pollItemOptions
    }
  },

  componentDidMount() {
    let { pollItem } = this.props;
    let { pollItemOptions } = this.data;

    myNewChart = new Highcharts.Chart(this.chartProps());
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
        renderTo: pollItem._id
      },
      title: {
        text: pollItem.text
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
      <div className="poll-item">
        <h5>{ pollItem.text }</h5>
        <div id={ pollItem._id }></div>
        {
          pollItemOptions.map((option, i) => {
            return <C.PollItemOptionView pollItemOption={ option }/>
          })
        }
      </div>
    );
  }
});
