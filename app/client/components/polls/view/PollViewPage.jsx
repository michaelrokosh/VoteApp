C.PollViewPage = React.createClass({
  PropTypes: {
    pollId: React.PropTypes.string
  },

  mixins: [ReactMeteorData],

  getMeteorData() {
    const currentUserHandle = Meteor.subscribe('currentUser');
    
    return {
      currentUser: Meteor.user(),
      isReady: currentUserHandle.ready()
    }
  },

  render() {
    if (!this.data.isReady) {
      Session.set('isLoading', true);
      return <C.MainLoader />
    }

    Session.set('isLoading', false);
    if (!this.data.currentUser) {
      return <C.UserSignInOrSignUp />
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m6 offset-m3">
            <C.PollView pollId={ this.props.pollId } />
          </div>
        </div>
      </div>
    )
  }
});