import { useDeps, composeWithTracker, composeAll } from 'mantra-core';

import UserSignUp from '../components/user_sign_up/user_sign_up.jsx';
import MainLoader from '../../core/components/layouts/main_loader.jsx';

export const composer = ({ context }, onData) => {
	const { APP_ERRORS } = context();
	APP_ERRORS.setDefault('SignUp', {});
	const errors = APP_ERRORS.get('SignUp');

	onData(null, { errors });
}

export const depsMapper = (context, actions) => ({
	signUp: actions.auth.signUp,
	clearErrors: actions.appErrors.clearErrors,
	context: () => context
});

export default composeAll (
	composeWithTracker(composer, MainLoader),
	useDeps(depsMapper)
)(UserSignUp);