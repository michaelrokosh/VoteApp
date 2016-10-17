import React from 'react';

//import LoaderLine from '../../containers/loader_line.js';

class MainHeader extends React.Component {
  componentDidMount() {
    $(".button-collapse").sideNav({
      closeOnClick: true 
    });
  }

  render() {
    let loginButton;
    let signUpButton;
    let newPoll;
    let myPolls;
    let userProfile;
    let publicPolls;
    let anonPolls;

    const { user, handleLogout, getPath } = this.props;

    if(user) {
      newPoll = (
        <li><a href={ getPath('NewPoll') }>New Poll</a></li>
      )
      myPolls = (
        <li><a href={ getPath('UserPolls', { username: user.username }) }>My Polls</a></li>
      )
      publicPolls = (
        <li><a href={ getPath('PublicPolls') }>Public Polls</a></li>
      )
      userProfile = (
        <li><a href={ getPath('UserProfile', { username: user.username }) }>Profile</a></li>
      )
      loginButton = (
        <li><a onClick={ handleLogout }>Logout</a></li>
      )
    } else {
      anonPolls = (
        <li><a href={ getPath('PollsWithoutRegistration') }>Polls</a></li>
      )
      loginButton = (
        <li><a href={ getPath('SignIn') }>Sign In</a></li>
      )
      signUpButton = (
        <li><a href={ getPath('SignUp') }>Sign Up</a></li>
      )
    }
  
    return (
      <nav>
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
                { anonPolls }
                { loginButton }
                { signUpButton }
              </ul>
              <ul className="side-nav" id="mobileSidebar">
                { newPoll }
                { myPolls }
                { publicPolls }
                { userProfile }
                { anonPolls }
                { loginButton }
                { signUpButton }
              </ul>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default MainHeader;