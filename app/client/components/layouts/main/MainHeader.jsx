C.MainHeader = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      currentUser: Meteor.user()
    }
  },
  handleLogout() {
    Meteor.logout();
  },

  componentDidMount() {
    $(".button-collapse").sideNav({
      closeOnClick: true 
    });
  },

  render() {
    let loginButton;
    let signUpButton;
    let newPoll;
    let myPolls;
    let latestPolls;
    let { currentUser } = this.data;

    if (currentUser) {
      newPoll = (
        <li><a href="/polls/new">New Poll</a></li>
      )
      myPolls = (
        <li><a href={ "/" + currentUser._id + "/polls" }>My Polls</a></li>
      )
      latestPolls = (
        <li><a href="/polls">Public Polls</a></li>
      )
      loginButton = (
        <li><a href="#" onClick={this.handleLogout}>Logout</a></li>
      )
    } else {
      loginButton = (
        <li><a href="/sign-in">Sign In</a></li>
      )
      signUpButton = (
        <li><a href="/sign-up">Sign Up</a></li>
      )
    }

    return (
      <nav>
        <div className="nav-wrapper">
          <div className="row">
            <div className="col s12">
              <a href="/" className="brand-logo">VoteApp</a>
              <a href="#" data-activates="mobileSidebar" className="button-collapse">
                <i className="material-icons">menu</i>
              </a>
              <ul id="nav" className="right hide-on-med-and-down">
                { newPoll }
                { myPolls }
                { latestPolls }
                { loginButton }
                { signUpButton }
              </ul>
              <ul className="side-nav" id="mobileSidebar">
                { newPoll }
                { myPolls }
                { latestPolls }
                { loginButton }
                { signUpButton }
              </ul>
            </div>
          </div>
        </div>
      </nav>
    )
  }
});