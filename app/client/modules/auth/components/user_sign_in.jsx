import React from 'react';

class UserSignIn extends React.Component {
    // onSubmit(event) {
    //     event.preventDefault();

    //     var emailOrUsername = $(event.target).find("[name=emailorusername]").val();
    //     var password = $(event.target).find("[name=password]").val();

    //     var errors = {};

    //     if (!emailOrUsername) {
    //         errors.emailOrUsername = "Email/username is required"
    //     }

    //     if (!password) {
    //         errors.password = "Password required"
    //     }

    //     this.setState({
    //         errors: errors
    //     });

    //     if (! _.isEmpty(errors)) {
    //         return;
    //     }

    //     Meteor.loginWithPassword(emailOrUsername, password, (err) => {
    //         if (err) {
    //             this.setState({
    //                 errors: {'none': err.reason}
    //             });

    //             return;
    //         } else {
    //             FlowRouter.go('Home');
    //         }
    //     });
    // },
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col s12 m12">
                        <h1>Sign In</h1>

                        <form onSubmit={this.onSubmit}>
                            <C.FormErrors errors={this.state.errors} />
                            <C.FormInput hasError={!!this.state.errors.emailOrUsername} name="EmailOrUsername" type="text" label="Email/Username" />
                            <C.FormInput hasError={!!this.state.errors.password} name="Password" type="password" label="Password" />
                            <input type="submit" className="btn btn-default"/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserSignIn;