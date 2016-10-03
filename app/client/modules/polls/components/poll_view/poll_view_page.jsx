import React from 'react';

import UserSignInOrSignUp from '../../../auth/components/user_sign_in_or_sign_up.jsx';
import PollView from '../../containers/poll_view.js';

class PollViewPage extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m6 offset-m3">
            <PollView />
          </div>
        </div>
      </div>
    )
  }
}

export default PollViewPage;