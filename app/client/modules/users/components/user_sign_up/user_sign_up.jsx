import React from 'react';

import FormInput from '../../../core/components/general/form_input.jsx';
import FormErrors from '../../../core/components/general/form_errors.jsx';

class UserSignUp extends React.Component {
    signUp(e) {
        e.preventDefault();
        const { signUp } = this.props;

        const email = e.target.email.value;
        const password = e.target.password.value;
        const username = e.target.username.value;
        const repeatPassword = e.target.confirmpassword.value;
    
        signUp(email, username, password, repeatPassword);
    }

    render() {
        const {  errors } = this.props;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col s12 m12">
                        <h1>Sign Up</h1>

                        <form onSubmit={ e => this.signUp(e) }>
                            <FormErrors errors={ errors } />
                            <FormInput hasError={ !!errors.email } name="Email" type="email" label="Email" />
                            <FormInput hasError={ !!errors.username } name="Username" type="text" label="Username (other users will see it)" />
                            <FormInput hasError={ !!errors.password } name="Password" type="password" label="Password" />
                            <FormInput hasError={!!errors.repeatPassword} name="ConfirmPassword" type="password" label="Confirm your password" />
                            <input type="submit" className="btn btn-default"/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserSignUp;