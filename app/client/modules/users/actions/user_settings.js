export default {
	updateName({ Meteor, Accounts }, updatedName) {
		console.log(Accounts)
	},

	changePassword({ APP_ERRORS, Accounts }, oldPass, newPass, confirmPass, callback) {
		const errors = {};
		
		if(!newPass || !oldPass || !confirmPass) {
			errors.emptyField = "Please, fill all fileds!"
		}

		if(newPass !== confirmPass) {
			errors.repeatPassword = "These passwords don't match. Try again?"
		}

		APP_ERRORS.set('ChangePassword', errors);

        if (! _.isEmpty(errors)) {
            return;
        }


     	Accounts.changePassword(oldPass, newPass, (err) => {
     		if(err) {
     			err.accountsErr = err.reason;
				APP_ERRORS.set('ChangePassword', errors);
     		} else {
     			callback(true);
     		}
     	})
	},

	changeEmail({ Meteor, APP_ERRORS },  newEmail) {
		const oldEmail = Meteor.user().emails[0].address;
        const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		const errors = {};
		
		if(oldEmail === newEmail) {
			return;
		}

		if (!newEmail) {
            errors.email = "Email required";
        } else if (!emailPattern.test(newEmail)) {
            errors.email = "Email is not valid";
        }

        APP_ERRORS.set('ChangeEmailAndName', errors);
        
        if(!_.isEmpty(errors)) {
        	return;
        }

        Meteor.call('users.changeEmail', oldEmail, newEmail,(err) => {
        	if(err) {
        		errors.email = err.reason;
        		APP_ERRORS.set('ChangeEmailAndName', errors);
        	}
        })
	}
}