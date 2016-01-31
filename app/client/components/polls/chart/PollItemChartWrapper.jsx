C.PollItemChartWrapper = React.createClass({
  PropTypes: {
    pollItemId: React.PropTypes.string.required,
    showToOwnerOnly: React.PropTypes.boolean
  },

  mixins: [ReactMeteorData],

  getMeteorData() {
    const { pollItemId } = this.props;
    return {
      pollItem: PollItems.findOne({ _id: pollItemId }),
      currentUser: Meteor.user()
    }
  },

  render() {
    const { pollItem, currentUser } = this.data;
    let chart;

    if (this.props.showToOwnerOnly) {
      if (currentUser._id === pollItem.userId) {
        return <C.PollItemChart pollItemId={ pollItem._id }/>;
      } else {
        return (
          <h1 className="text-center">Not authorized</h1>
        )
      }
    } 
    
    if (!pollItem.showResults) {
      return <C.PollItemChart pollItemId={ pollItem._id }/>;
    } else {
      return (
        <small>Results are hidden</small>
      )
    }
  }
});
