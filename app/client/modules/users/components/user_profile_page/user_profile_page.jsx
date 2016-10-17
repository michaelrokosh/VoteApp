import React from 'react';

import PollsPreview from '../../../polls/containers/polls_preview/polls_preview.js';
import FormInput from '../../../core/components/general/form_input.jsx';
import FormErrors from '../../../core/components/general/form_errors.jsx';
import AddAvatar from './add_avatar_window.jsx';

class UserProfilePage extends React.Component {
  constructor() {
    super();

    this.state = {
      passwordChanged: false,
      openAddAvatarForm: false
    }
  }
  
  componentWillUnmount() {
    const { clearErrors } = this.props;
    clearErrors();
  }

  toggleAddAvatarForm() {
    this.setState({openAddAvatarForm: !this.state.openAddAvatarForm})
  }

  changeEmailKeyUp(e) {
    if(e.which === 13) {
      this.changeEmail(e);
    }
  }

  changeEmail(e) {
    const { changeEmail } = this.props;
    const newEmail = e.target.value;

    changeEmail(newEmail);
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
    const { 
      user, 
      changePassErrors,
      changeEmailAndNameErrors,
      changeAvatar,
      avatar
    } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m12">
            <div className="container">
              <div className="row">
                <div className="col s4 m2 offset-m5 offset-s4" title="Change avatar">
                  <img className="user-avatar" src={ avatar.imageURL } onClick={ () => this.toggleAddAvatarForm() }/>
                </div>
              </div>
              <AddAvatar 
                isOpen={ this.state.openAddAvatarForm } 
                changeAvatar={ changeAvatar }
              />
              <div className="row">
                <div className="col s12 m8 offset-m2">  
                      <FormErrors errors={ changeEmailAndNameErrors } />
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
                          onKeyUp={ e => this.changeEmailKeyUp(e) }
                          onBlur={ e => this.changeEmail(e) }
                        />
                        
                        <h5>Change password</h5>
                        <form onSubmit={ e => this.changePassword(e) }>
                          <FormErrors errors={ changePassErrors } />
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