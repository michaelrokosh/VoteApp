import React from 'react';

import FormInput from '../../../../core/components/general/form_input.jsx';
import FormErrors from '../../../../core/components/general/form_errors.jsx';
import AddAvatar from './add_avatar_window.jsx';
import Tooltipped from '../../../../core/components/general/tooltipped.jsx';

class EditUserProfile extends React.Component {
  constructor() {
    super();

    this.state = {
      openAddAvatarForm: false
    }
  }
  
  toggleAddAvatarForm() {
    this.setState({openAddAvatarForm: !this.state.openAddAvatarForm})
  }

  setEmail(e) {
    const { setEmail } = this.props;
    const newEmail = e.target.value;

    setEmail(newEmail);
  }

  setPassword(e) {
    e.preventDefault();
    
    const { setPassword } = this.props;
    const oldPassword = e.target.oldpassword.value;
    const newPassword = e.target.newpassword.value;
    const repeatPassword = e.target.repeatpassword.value;
  
    setPassword(oldPassword, newPassword, repeatPassword);
  }

  setUsername(e) {
    const { setUsername } = this.props;
    const updatedName = e.target.value;
    
    setUsername(updatedName);
  }

  render() {
    const { 
      user, 
      setAvatar,
      avatar,
      getPath
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
                changeAvatar={ setAvatar }
              />
              <div className="row">
                <div className="col s12 m8 offset-m2">  
                      <FormInput 
                          name="username"
                          type="text"
                          label="Your name"
                          value={ user.username }
                          onBlur={ e => this.setUsername(e) }
                        />
                        <FormInput 
                          name="email"
                          type="email"
                          label="E-mail"
                          value={ user.emails[0].address }
                          onBlur={ e => this.setEmail(e) }
                        />
                        
                        <h5>Change password</h5>
                        <form onSubmit={ e => this.setPassword(e) }>
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
                          <input type="submit" className="btn btn-default"/>
                      </form>
                       <Tooltipped position="left" text="Preview">
                          <a 
                            className="btn-floating btn-large waves-effect waves-light preview-btn" 
                            href={getPath('UserProfilePage', { username: user.username })}
                            target="_blank">
                            <i className="material-icons">visibility</i>
                          </a>
                       </Tooltipped>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EditUserProfile;