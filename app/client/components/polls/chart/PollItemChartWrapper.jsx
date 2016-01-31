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
      pollItemOptions: PollItemOptions.find({ pollItemId: pollItemId }).fetch(),
      currentUser: Meteor.user()
    }
  },

  render() {
    const { pollItem, pollItemOptions, currentUser } = this.data;

    if (!pollItem || !pollItemOptions.length) {
      return <C.MainLoader />
    }

    if (this.props.showToOwnerOnly) {
      if (currentUser._id === pollItem.userId) {
        console.log('render pollItemOptions',pollItemOptions);
        return <C.PollItemChart pollItemId={ pollItem._id }/>;
      } else {
        return (
          <h1 className="text-center">Not authorized</h1>
        )
      }
    } 

    if (pollItem.showResults) {
      console.log('render pollItemOptions',pollItemOptions);
      return <C.PollItemChart pollItemId={ pollItem._id }/>;
    } else {
      return (
        <small>Results are hidden</small>
      )
    }
  }
});
