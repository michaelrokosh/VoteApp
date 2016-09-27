import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

import UserSignUp from '../components/user_sign_up/user_sign_up.jsx';


export const composer = ({context}, onData) => {
	const { LocalState } = context();
	LocalState.setDefault('SignUpErros', {});
	const errors = LocalState.get('SignUpErros');

	onData(null, {errors});
}

export const depsMapper = (context, actions) => ({
	SignUp: actions.auth.SignUp,
	context: () => context
});

export default composeAll (
	composeWithTracker(composer),
	useDeps(depsMapper)
)(UserSignUp);