export default {
	setUsername({ Meteor, Notificator }, updatedName) {
		if(updatedName === Meteor.user().username) {
			return;
		}

		if(!updatedName) {
			Notificator.error('Username is required!');
			return;
		}

		Meteor.call('users.setUsername', updatedName, (err) => {
			if(err) {
				Notificator.error(err.reason)
			} else {
				Notificator.succes('Your name has changed')
			}
		})	
	},

	setPassword({ LocalState, Accounts, Notificator }, oldPass, newPass, confirmPass) {
		if(!newPass || !oldPass || !confirmPass) {
			Notificator.error('Please, fill all fileds!');
		}

		if(newPass !== confirmPass) {
			Notificator.error("These passwords don't match. Try again?")
		}

     	Accounts.changePassword(oldPass, newPass, (err) => {
     		if(err) {
     			Notificator.error(err.reason);
     		} else {
     			Notificator.succes('Your password has changed!')
     		}
     	})
	},

	setEmail({ Meteor, Notificator },  newEmail) {
		const oldEmail = Meteor.user().emails[0].address;
        const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		const errors = {};
		
		if(oldEmail === newEmail) {
			return;
		}

		if (!newEmail) {
            Notificator.error("Email required");
        	return;
        } else if (!emailPattern.test(newEmail)) {
            Notificator.error("Email is not valid");
        	return;
        }

        Meteor.call('users.setEmail', oldEmail, newEmail,(err) => {
        	if(err) {
        		Notificator.error(err.reason);
        	} else {
        		Notificator.succes('Your email has changed!')
        	}
        })
	},

	setAvatar({ Meteor, Notificator }, imageFile) {
		function getImageURL(file, callback) {
			let encodedImage = {};
			
			function readerOnload(e) {
	    		const base64 = btoa(e.target.result);
	    		const imageURL = 'data:' + encodedImage.imageType + ';base64,' + base64;
	    		callback(imageURL);
			}

			const reader = new FileReader();
	  		encodedImage.filetype = file.type;
	  		encodedImage.size = file.size;
	  		encodedImage.filename = file.name;

			reader.onload = readerOnload;
		  	reader.readAsBinaryString(file);	
		}

		getImageURL(imageFile, (url) => {
			Meteor.call('avatars.setAvatar', url, (err) => {
				if(err) {
					Notificator.error(err.reason);
				}
			})
		})
	}
}