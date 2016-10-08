import React from 'react';

import PollsPreview from '../../polls/containers/polls_preview/polls_preview.js';

class UserProfilePage extends React.Component {
  render() {
    const { username } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m12">
            <h1 className="text-center">{ username }</h1>   
            <PollsPreview type="userPolls"/> 
          </div>
        </div>
      </div>
    )
  }
}

UserProfilePage.PropTypes = {
   username: React.PropTypes.string
}

export default UserProfilePage;