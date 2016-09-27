import React from 'react';

import UserSignUp from '../../containers/user_sign_up.js';

class UserSignUpPage extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m6 offset-m3">
            <UserSignUp />
          </div>
        </div>
      </div>
    )
  }
}

export default UserSignUpPage;