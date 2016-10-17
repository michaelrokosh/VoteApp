import { useDeps, composeWithTracker, composeAll } from 'mantra-core';

import UserSignIn from '../components/user_sign_in/user_sign_in.jsx';
import MainLoader from '../../core/components/layouts/main_loader.jsx';

export const composer = ({ context }, onData) => {
	const { APP_ERRORS } = context();
	APP_ERRORS.setDefault('SignIn', {});
	const errors = APP_ERRORS.get('SignIn');

	onData(null, { errors });
}

export const depsMapper = (context, actions) => ({
	signIn: actions.auth.signIn,
	clearErrors: actions.appErrors.clearErrors,
	context: () => context
});

export default composeAll (
	composeWithTracker(composer, MainLoader), 
	useDeps(depsMapper)
)(UserSignIn);