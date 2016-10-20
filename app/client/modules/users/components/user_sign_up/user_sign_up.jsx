import React from 'react';

import FormInput from '../../../core/components/general/form_input.jsx';
import FormErrors from '../../../core/components/general/form_errors.jsx';

class UserSignUp extends React.Component {  
    constructor() {
        super();

        this.state = {
            errors: {}
        }
    }

    signUp(e) {
        e.preventDefault();
        const { signUp } = this.props;

        const email = e.target.email.value;
        const password = e.target.password.value;
        const username = e.target.username.value;
        const repeatPassword = e.target.confirmpassword.value;
        const errors = {};

        if(!email) {
            errors.email = 'Email is reqired'
        }
        if(!password) {
            errors.password = 'Password is reqired';
        }
        if(!username) {
            errors.username = 'Username is reqired';
        }
        if(password !== repeatPassword) {
            errors.repeatPassword = "These passwords don't match. Try again?"
        }

        this.setState({errors: errors});
        if(!_.isEmpty(errors)) {
          return;
        }

        signUp(email, username, password, repeatPassword);
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col s12 m12">
                        <h1>Sign Up</h1>

                        <form onSubmit={ e => this.signUp(e) }>
                            <FormErrors errors={ errors } />
                            <FormInput name="Email" type="email" label="Email" hasError={true}/>
                            <FormInput name="Username" type="text" label="Username (other users will see it)" />
                            <FormInput name="Password" type="password" label="Password" />
                            <FormInput  name="ConfirmPassword" type="password" label="Confirm your password" />
                            <input type="submit" className="btn btn-default"/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserSignUp;