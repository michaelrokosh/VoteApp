import React from 'react';

import FormInput from '../../../core/components/general/form_input.jsx';
import FormErrors from '../../../core/components/general/form_errors.jsx';

class UserSignIn extends React.Component {
    render() {
        const { signIn, errors } = this.props;

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col s12 m12">
                        <h1>Sign In</h1>

                        <form onSubmit={ signIn }>
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