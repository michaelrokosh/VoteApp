C.PollPage = React.createClass({
  PropTypes: {
    preview: React.PropTypes.boolean,
    pollId: React.PropTypes.string
  },

  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      currentUser: Meteor.user()
    }
  },

  render() {
    if (!this.data.currentUser) {
      return <C.UserSignInOrSignUp />
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m6 offset-m3">
            <C.Poll pollId={ this.props.pollId } preview={ this.props.preview } />
          </div>
        </div>
      </div>
    )
  }
});