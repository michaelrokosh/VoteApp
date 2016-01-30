C.PollItemView = React.createClass({
  PropTypes: {
    pollItem: React.PropTypes.object.isRequired
  },

  mixins: [ReactMeteorData],

  getMeteorData() {
    let pollItemOptions = PollItemOptions.find({ pollItemId: this.props.pollItem._id }).fetch();
    return {
      pollItemOptions: pollItemOptions
    }
  },

  render() {
    let { pollItem } = this.props;
    let { pollItemOptions } = this.data; 
    let chart;
    if (pollItem.showResults) {
      chart = <C.PollItemChart pollItem={ pollItem }/>
    } else {
      chart = ""
    }

    return (
      <div className="poll-item">
        <h5>{ pollItem.text }</h5>
        { chart }
        {
          pollItemOptions.map((option, i) => {
            return <C.PollItemOptionView pollItemOption={ option }/>
          })
        }
      </div>
    );
  }
});
