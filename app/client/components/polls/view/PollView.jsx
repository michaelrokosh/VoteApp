C.PollView = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      currentUser: Meteor.user(),
      poll: Polls.findOne({ _id: FlowRouter.getParam('_id') }),
      activePollItems: PollItems.find({ 
        pollId: FlowRouter.getParam('_id'),
        active: true
      }).fetch()
    }
  },

  getInitialState() {
    return {
    }
  },

  render() {
    const { currentUser, poll, activePollItems } = this.data;

    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m6 offset-m3">
            <h1 className="text-center">{ poll.name }</h1>
            {
              activePollItems.map((pollItem) => {
                return <C.PollItemView pollItem={ pollItem }/>
              })
            }
          </div>
        </div>
      </div>
    );
  }
});
