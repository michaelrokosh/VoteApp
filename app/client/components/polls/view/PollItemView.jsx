C.PollItemView = React.createClass({
  PropTypes: {
    pollItem: React.PropTypes.object.isRequired
  },

  mixins: [ReactMeteorData],

  getMeteorData() {
    const pollItemOptions = PollItemOptions.find({ pollItemId: this.props.pollItem._id }).fetch();
    return {
      pollItemOptions: pollItemOptions
    }
  },

  render() {
    const { pollItem } = this.props;
    const { pollItemOptions } = this.data; 

    return (
      <div className="poll-item">
        <h5>{ pollItem.text }</h5>
        <C.PollItemChartWrapper pollItemId={ pollItem._id }/>
        {
          pollItemOptions.map((option, i) => {
            return <C.PollItemOptionView pollItemOption={ option }/>
          })
        }
      </div>
    );
  }
});
