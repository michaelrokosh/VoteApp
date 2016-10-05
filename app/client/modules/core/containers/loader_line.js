import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

import LoaderLine from '../components/layouts/loader_line.jsx';

export const composer = ({ context }, onData) => {
	const  { LocalState } = context();
	LocalState.setDefault('isLoading', false);
	const isLoading = LocalState.get('isLoading'); 

	onData(null, { isLoading });
}

export const depsMapper = (context) => ({
	context: () => context
});

export default composeAll (
	composeWithTracker(composer),
	useDeps(depsMapper)
)(LoaderLine);