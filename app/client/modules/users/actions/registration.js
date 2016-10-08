export default {
	signUp({ Meteor, LocalState }, e) {
		e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;
        const username = e.target.username.value;
        const repeatPassword = e.target.confirmpassword.value;
        const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        const errors = {};

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

        LocalState.set('SignUpErros', errors);

        if (! _.isEmpty(errors)) {
            return;
        }

        Accounts.createUser({
            username: username,
            email: email, 
            password: password
        }, (err) => {
            if (err) {
                errors.serverResponse = err.reason;
                LocalState.set('SignUpErros', errors)
                return;
            } else {
                FlowRouter.go('Home');
            }
        });
	}
} 