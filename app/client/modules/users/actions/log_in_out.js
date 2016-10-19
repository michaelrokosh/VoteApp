import React from 'react';
import ReactDOM from 'react-dom';

export default {
	handleLogout({ Meteor, FlowRouter }) {
	    Meteor.logout();
	    FlowRouter.go('Home');
	},

	signIn({ Meteor, LocalState, Notificator }, emailOrUsername, password) {
        const errors = {};
        if (!emailOrUsername) {
            errors.emailOrUsername = "Email/username is required"
        }

        if (!password) {
            errors.password = "Password required"
        }

        if (! _.isEmpty(errors)) {
            return;
        }

        Meteor.loginWithPassword(emailOrUsername, password, (err) => {
            if (err) {
                Notificator.error(err.reason);
                return;
            } else {
                FlowRouter.go('Home');
            }
        });
    }
}