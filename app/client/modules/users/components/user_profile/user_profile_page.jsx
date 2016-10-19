import React from 'react';

import Tooltipped from '../../../core/components/general/tooltipped.jsx';

class UserProfilePage extends React.Component {
  render() {
    const { 
      user,
      avatar
    } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m12">
            <div className="container">
              <div className="row">
                <div className="col s4 m2 offset-m5 offset-s4" title="Change avatar">
                  <img className="user-avatar" src={ avatar.imageURL } />
                </div>
              </div>
              <div className="row">
                <div className="col s12 m8 offset-m2">  
                   <h4 className="center">{ user.username }</h4> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default UserProfilePage;