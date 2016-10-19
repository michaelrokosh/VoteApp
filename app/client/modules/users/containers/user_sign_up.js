import { useDeps } from 'mantra-core';

import UserSignUp from '../components/user_sign_up/user_sign_up.jsx';

export const depsMapper = (context, actions) => ({
	signUp: actions.auth.signUp,
	context: () => context
});

export default useDeps(depsMapper)(UserSignUp);