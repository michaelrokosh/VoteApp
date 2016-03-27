C.UserProfilePage = React.createClass({
  mixins: [],
  PropTypes: {
    username: React.PropTypes.string
  },

  mixins: [ReactMeteorData],
  getMeteorData() {
    const pollsHandler = Meteor.subscribe('userPollsByUsername', this.props.username);
    return {
      user: Meteor.users.findOne({ username: this.props.username }),
      isReady: FlowRouter.subsReady() && pollsHandler.ready()
    }
  },

  render() {
    const { user, isReady } = this.data;

    if (!isReady) {
      Session.set('isLoading', true);
      return <C.MainLoader />
    }

    Session.set('isLoading', false);

    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m12">
            <h1 className="text-center">{ user.username }</h1>   
            <C.LatestPolls userId={ user._id } /> 
          </div>
        </div>
      </div>
    )
  }
});
