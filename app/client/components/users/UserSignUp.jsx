C.UserSignUp = React.createClass({
    mixins: [],
    PropTypes: {

    },
    getInitialState() {
        return {
            errors: {}
        }
    },
    getMeteorData() {
        return {

        }
    },
    onSubmit(event) {
        event.preventDefault();

        var email = event.target.email.value;
        var password = event.target.password.value;
        var username = event.target.username.value;
        var repeatPassword = event.target.confirmpassword.value;
        var emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        var errors = {};

        if (!email) {
            errors.email = "Email required";
        } else if (!emailPattern.test(email)) {
            errors.email = "Email is not valid";
        }

        if (!username) {
            errors.username = "Username required";
        }

        if (!password) {
            errors.password = "Password required";
        }

        if (!repeatPassword || repeatPassword !== password) {
            errors.repeatPassword = "These passwords don't match. Try again?";
        }

        this.setState({
            errors: errors
        });

        if (! _.isEmpty(errors)) {
            return;
        }

        Accounts.createUser({
            username: username,
            email: email, 
            password: password
        }, (err) => {
            if (err) {
                this.setState({
                    errors: {'none': err.reason}
                });

                return;
            } else {
                FlowRouter.go('Home');
            }
        });
    },
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col s12 m12">
                        <h1>Sign Up</h1>

                        <form onSubmit={this.onSubmit}>
                            <C.FormErrors errors={this.state.errors} />
                            <C.FormInput hasError={!!this.state.errors.email} name="Email" type="email" label="Email" />
                            <C.FormInput hasError={!!this.state.errors.username} name="Username" type="text" label="Username (other users will see it)" />
                            <C.FormInput hasError={!!this.state.errors.password} name="Password" type="password" label="Password" />
                            <C.FormInput hasError={!!this.state.errors.repeatPassword} name="ConfirmPassword" type="password" label="Confirm your password" />
                            <input type="submit" className="btn btn-default"/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
});
