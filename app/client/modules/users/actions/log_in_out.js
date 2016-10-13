export default {
	handleLogout({ Meteor, FlowRouter }) {
	    Meteor.logout();
	    FlowRouter.go('Home');
	},

	signIn({ Meteor, APP_ERRORS }, emailOrUsername, password) {
        const errors = {};
        if (!emailOrUsername) {
            errors.emailOrUsername = "Email/username is required"
        }

        if (!password) {
            errors.password = "Password required"
        }

        APP_ERRORS.set('SignIn', errors);

        if (! _.isEmpty(errors)) {
            return;
        }

        Meteor.loginWithPassword(emailOrUsername, password, (err) => {
            if (err) {
                errors.serverErr = err.reason;
                APP_ERRORS.set('SignIn', errors);
                return;
            } else {
                FlowRouter.go('Home');
            }
        });
    }
}