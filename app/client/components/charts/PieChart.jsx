C.PieChart = React.createClass({
    propTypes: {
        id: React.PropTypes.string,
        chartProps: React.PropTypes.object
    },
    componentDidMount () {
        let chart = new Highcharts.Chart(this.props.chartProps);
    },

    render() {
        const { id } = this.props;
        return (
            <div id={ id }></div>
        )
    }
});