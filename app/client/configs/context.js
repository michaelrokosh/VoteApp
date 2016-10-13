import { Meteor } from 'meteor/meteor';
import Collections from '../../lib/collections';
import { FlowRouter } from 'meteor/kadira:flow-router-ssr';
import { Accounts } from 'meteor/accounts-base';
import { ReactiveDict } from 'meteor/reactive-dict';

export default function() {
	return {
		Meteor,
		FlowRouter,
		Accounts,
		Collections,
		APP_ERRORS: new ReactiveDict(),
	}
}
