export default {
	signUp({ Meteor, Notificator }, email, username, password, repeatPassword) {
        const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        const errors = {};

        if (!email) {
            Notificator.error("Email required");
            return;
        } else if (!emailPattern.test(email)) {
            Notificator.error("Email is not valid");
            return;
        }

        if (!username) {
            Notificator.error("Username required");
            return;
        }

        if (!password) {
            Notificator.error("Password required");
            return;
        }

        if (!repeatPassword || repeatPassword !== password) {
            Notificator.error("These passwords don't match. Try again?");
            return;
        }

   

        Accounts.createUser({
            username: username,
            email: email, 
            password: password
        }, (err) => {
            if(err) {
                Notificator.error(err.reason)
                return;
            } else {
                Meteor.call('avatars.setAvatar', 'http://icookgood.ru/users/media/avatar/7/');
                FlowRouter.go('Home');
            }
        });
	}
} 