export default {
	updateName({ Meteor, Accounts }, updatedName) {
		console.log(Accounts)
	},
	changePassword({ APP_ERRORS ,Accounts }, oldPass, newPass, confirmPass, callback) {
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
	}
}