import React from 'react';

UserSignInOrSignUp = React.createClass({
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m5">
            <C.UserSignIn />
          </div>
          <div className="col s12 m5 offset-m2">
            <C.UserSignUp />
          </div>
        </div>
      </div>
    )
  }
});