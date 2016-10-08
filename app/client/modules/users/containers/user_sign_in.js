import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

import UserSignIn from '../components/user_sign_in/user_sign_in.jsx';
import MainLoader from '../../core/components/layouts/main_loader.jsx';

export const composer = ({context}, onData) => {
	const { LocalState } = context();
	LocalState.setDefault('SignInErrors', {});
	const errors = LocalState.get('SignInErrors');

	onData(null, {errors});
}

export const depsMapper = (context, actions) => ({
	signIn: actions.auth.signIn,
	context: () => context
});

export default composeAll (
	composeWithTracker(composer, MainLoader), 
	useDeps(depsMapper)
)(UserSignIn);