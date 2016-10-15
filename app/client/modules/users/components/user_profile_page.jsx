import React from 'react';

import PollsPreview from '../../polls/containers/polls_preview/polls_preview.js';
import FormInput from '../../core/components/general/form_input.jsx';
import FormErrors from '../../core/components/general/form_errors.jsx';

class UserProfilePage extends React.Component {
  constructor() {
    super();

    this.state = {
      passwordChanged: false
    }
  }

  changePassword(e) {
    e.preventDefault();
    
    const { changePassword } = this.props;
    const oldPassword = e.target.oldpassword.value;
    const newPassword = e.target.newpassword.value;
    const repeatPassword = e.target.repeatpassword.value;
  
    changePassword(oldPassword, newPassword, repeatPassword, (res) => {
      if(res) {
        this.setState({passwordChanged: true});
      }
    });
  }

  updateNameKeyUp(e) {
    if(e.which === 13) {
      this.updateName(e);
    }
  }

  updateName(e) {
    const { updateName } = this.props;
    const updatedName = e.target.value;
    
    updateName(updatedName);
  }

  render() {
    const { user, errors} = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m12">
            <div className="container">
              <div className="row">
                <div className="col s4 m2 offset-m5 offset-s4" title="Change avatar">
                  <img className="user-avatar" src=""/>
                </div>
              </div>
              <div className="row">
                <div className="col s12 m8 offset-m2">  
                      <FormInput 
                          name="username"
                          type="text"
                          label="Your name"
                          value={ user.username }
                          onKeyUp={ e => this.updateNameKeyUp(e) }
                          onBlur={ e => this.updateName(e) }
                        />
                        <FormInput 
                          name="email"
                          type="email"
                          label="E-mail"
                          value={ user.emails[0].address }
                        />
                        
                        <h5>Change password</h5>
                        <form onSubmit={ e => this.changePassword(e) }>
                          <FormErrors errors={ errors } />
                          <FormInput 
                            name="oldPassword"
                            type="password"
                            label="Old password"
                          />
                          <FormInput 
                            name="newPassword"
                            type="password"
                            label="New password"
                          />
                          <FormInput 
                            name="repeatPassword"
                            type="password"
                            label="Confirm password"
                          />
                          {
                            this.state.passwordChanged ? 
                              <p style={{color: '#43A047'}}>Your password changed!</p>:null
                          }
                          
                          <input type="submit" className="btn btn-default"/>
                      </form>
                  </div>
                </div>
              </div>
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