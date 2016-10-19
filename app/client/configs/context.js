import { Meteor } from 'meteor/meteor';
import Collections from '../../lib/collections';
import { FlowRouter } from 'meteor/kadira:flow-router-ssr';
import { Accounts } from 'meteor/accounts-base';
import { ReactiveDict } from 'meteor/reactive-dict';
import Notificator  from '../modules/core/helpers/notificator.js';

export default function() {
	return {
		Meteor,
		FlowRouter,
		Accounts,
		Collections,
		LocalState: new ReactiveDict(),
		Notificator
	}
}
