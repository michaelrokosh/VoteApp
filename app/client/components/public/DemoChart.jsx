C.DemoChart = React.createClass({
    componentDidMount () {
        let chart = new Highcharts.Chart();
    },

    render() {
        let chartProps = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                renderTo: 'demoChart'
            },
            title: {
                text: 'What do you think about VoteApp'
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
            },
            series: [{
                name: 'Votes',
                colorByPoint: true,
                data: [{
                    name: 'Awesome!',
                    y: 56.33
                }, {
                    name: 'Cool',
                    y: 24.03,
                    sliced: true,
                    selected: true
                }, {
                    name: 'OK',
                    y: 12.38
                }, {
                    name: 'Meh...',
                    y: 7.28
                }]
            }]
        };

        return (
            <C.PieChart id="demoChart" chartProps={ chartProps }/>
        )
    }
});