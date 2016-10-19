import { useDeps, composeWithTracker, composeAll } from 'mantra-core';

import UserSignIn from '../components/user_sign_in/user_sign_in.jsx';

export const depsMapper = (context, actions) => ({
	signIn: actions.auth.signIn,
	context: () => context
});

export default useDeps(depsMapper)(UserSignIn);