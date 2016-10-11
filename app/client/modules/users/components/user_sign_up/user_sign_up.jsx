import React from 'react';

import FormInput from '../../../core/components/general/form_input.jsx';
import FormErrors from '../../../core/components/general/form_errors.jsx';

class UserSignUp extends React.Component {
    render() {
        const { signUp, errors } = this.props;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col s12 m12">
                        <h1>Sign Up</h1>

                        <form onSubmit={ signUp }>
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