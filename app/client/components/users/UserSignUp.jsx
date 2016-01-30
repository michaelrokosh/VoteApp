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
        var repeatPassword = event.target.confirmpassword.value;
        var emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        var errors = {};

        if (!email) {
            errors.email = "Email required"
        } else if (!emailPattern.test(email)) {
            errors.email = "Email is not valid"
        }

        if (!password) {
            errors.password = "Password required"
        }

        if (!repeatPassword || repeatPassword !== password) {
            errors.repeatPassword = "These passwords don't match. Try again?"
        }

        this.setState({
            errors: errors
        });

        if (! _.isEmpty(errors)) {
            return;
        }

        Accounts.createUser({
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
            <div className="container">
                <div className="row">
                    <div className="col s12 m6 offset-m3">
                        <h1>Sign Up</h1>

                        <form onSubmit={this.onSubmit}>
                            <C.FormErrors errors={this.state.errors} />
                            <C.FormInput hasError={!!this.state.errors.email} name="Email" type="text" label="Email" />
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
