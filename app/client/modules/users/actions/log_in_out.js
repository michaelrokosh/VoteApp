import React from 'react';
import ReactDOM from 'react-dom';

export default {
	handleLogout({ Meteor, FlowRouter }) {
	    Meteor.logout();
	    FlowRouter.go('Home');
	},

	signIn({ Meteor, LocalState, Notificator }, emailOrUsername, password) {
        if (!emailOrUsername) {
            Notificator.error("Email/username is required");
        }

        if (!password) {
            Notificator.error("Password required");
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