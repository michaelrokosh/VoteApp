import React from 'react';

import FormInput from '../../../core/components/general/form_input.jsx';
import FormErrors from '../../../core/components/general/form_errors.jsx';

class UserSignIn extends React.Component {
    componentWillUnmount() {
        const { clearErrors } = this.props;
        clearErrors();
    }
    
    signIn(e) {
        e.preventDefault();
        const { signIn } = this.props;
        
        const emailOrUsername = e.target[0].value;
        const password = e.target[1].value;
        
        signIn(emailOrUsername, password);
    }

    render() {
        const { errors } = this.props;

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col s12 m12">
                        <h1>Sign In</h1>

                        <form onSubmit={ e => this.signIn(e) }>
                            <FormErrors errors={ errors } />
                            <FormInput hasError={ !!errors.emailOrUsername  } name="EmailOrUsername" type="text" label="Email/Username" />
                            <FormInput hasError={ !!errors.password } name="Password" type="password" label="Password" />
                            <input type="submit" className="btn btn-default"/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserSignIn;