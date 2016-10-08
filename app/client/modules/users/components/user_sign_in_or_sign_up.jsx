import React from 'react';

import UserSignIn from '../containers/user_sign_in.js';
import UserSignUp from '../containers/user_sign_up.js';

class UserSignInOrSignUp extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m5">
            <UserSignIn />
          </div>
          <div className="col s12 m5 offset-m2">
            <UserSignUp />
          </div>
        </div>
      </div>
    )
  }
}

export default UserSignInOrSignUp;