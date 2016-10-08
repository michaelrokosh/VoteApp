import React from 'react';

import UserSignIn from '../../containers/user_sign_in.js';

class UserSignInPage extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m6 offset-m3">
            <UserSignIn />
          </div>
        </div>
      </div>
    )
  }
}

export default UserSignInPage;

