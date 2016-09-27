import React from 'react';

MainHeader = React.createClass({
  // mixins: [ReactMeteorData],
  // getMeteorData() {
  //   return {
  //     currentUser: Meteor.user()
  //   }
  // },
  handleLogout() {
    Meteor.logout();
    FlowRouter.go('Home');
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
    let userProfile;
    let publicPolls;
    let { currentUser } = this.data;

    if (currentUser) {
      newPoll = (
        <li><a href={ FlowRouter.path('NewPoll') }>New Poll</a></li>
      )
      myPolls = (
        <li><a href={ FlowRouter.path('UserPolls', { username: currentUser.username }) }>My Polls</a></li>
      )
      publicPolls = (
        <li><a href={ FlowRouter.path('PublicPolls') }>Public Polls</a></li>
      )
      userProfile = (
        <li><a href={ FlowRouter.path('UserProfile', { username: currentUser.username }) }>Profile</a></li>
      )
      loginButton = (
        <li><a href="#" onClick={ this.handleLogout }>Logout</a></li>
      )
    } else {
      loginButton = (
        <li><a href={ FlowRouter.path('SignIn') }>Sign In</a></li>
      )
      signUpButton = (
        <li><a href={ FlowRouter.path('SignUp') }>Sign Up</a></li>
      )
    }

    return (
      <nav>
        <C.LoaderLine />
        <div className="nav-wrapper green darken-1">
          <div className="row">
            <div className="col s12">
              <a href="/" className="brand-logo">
                <i className="material-icons dp48">thumbs_up_down</i>
                <span className="hide-on-med-and-down">VoteApp</span>
              </a>
              <a href="#" data-activates="mobileSidebar" className="button-collapse">
                <i className="material-icons">menu</i>
              </a>
              <ul id="nav" className="right hide-on-med-and-down">
                { newPoll }
                { myPolls }
                { publicPolls }
                { userProfile }
                { loginButton }
                { signUpButton }
              </ul>
              <ul className="side-nav" id="mobileSidebar">
                { newPoll }
                { myPolls }
                { publicPolls }
                { userProfile }
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