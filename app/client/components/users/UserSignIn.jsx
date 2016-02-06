C.UserSignIn = React.createClass({
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

        var email = $(event.target).find("[name=email]").val();
        var password = $(event.target).find("[name=password]").val();

        var errors = {};

        if (!email) {
            errors.email = "Email required"
        }

        if (!password) {
            errors.password = "Password required"
        }

        this.setState({
            errors: errors
        });

        if (! _.isEmpty(errors)) {
            return;
        }

        Meteor.loginWithPassword(email, password, (err) => {
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
                        <h1>Sign In</h1>

                        <form onSubmit={this.onSubmit}>
                            <C.FormErrors errors={this.state.errors} />
                            <C.FormInput hasError={!!this.state.errors.email} name="Email" type="text" label="Email" />
                            <C.FormInput hasError={!!this.state.errors.password} name="Password" type="password" label="Password" />
                            <input type="submit" className="btn btn-default"/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
});
