import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

import UserSignIn from '../components/user_sign_in/user_sign_in.jsx';

export const composer = ({context}, onData) => {
	const { LocalState } = context();
	LocalState.setDefault('AuthErrors', {});
	const errors = LocalState.get('AuthErrors');

	onData(null, {errors});
}

export const depsMapper = (context, actions) => ({
	SignIn: actions.auth.SignIn,
	context: () => context
});

export default composeAll (
	composeWithTracker(composer), 
	useDeps(depsMapper)
)(UserSignIn);