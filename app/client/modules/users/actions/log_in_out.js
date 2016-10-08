export default {
	handleLogout({ Meteor, FlowRouter }) {
	    Meteor.logout();
	    FlowRouter.go('Home');
	},

	signIn({ Meteor, LocalState }, e) {
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

      	LocalState.set('SignInErrors', errors);

        if (! _.isEmpty(errors)) {
            return;
        }

        Meteor.loginWithPassword(emailOrUsername, password, (err) => {
            if (err) {
            	errors.serverErr = err.reason;
               	LocalState.set('SignInErrors', errors);
                return;
            } else {
                FlowRouter.go('Home');
            }
        });
    }
}