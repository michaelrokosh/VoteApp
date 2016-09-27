export default {
	handleLogout({Meteor}) {
	    Meteor.logout();
	    FlowRouter.go('Home');
	},

	SignIn({Meteor, LocalState}, e) {
        e.preventDefault();

        const emailOrUsername = e.target[0].value;
        const password = e.target[1].value;

        const errors = {};

        if (!emailOrUsername) {
            errors.emailOrUsername = "Email/username is required"
        }

        if (!password) {
            errors.password = "Password required"
        }

      	LocalState.set('AuthErrors', errors);

        if (! _.isEmpty(errors)) {
            return;
        }

        Meteor.loginWithPassword(emailOrUsername, password, (err) => {
            if (err) {
            	errors.serverResponse = err.reason;
               	LocalState.set('AuthErrors', errors);
                return;
            } else {
                FlowRouter.go('Home');
            }
        });
    }
}