import pollsMethods from './polls.js';
import pollItemsMethods from './poll_items.js';
import pollItemsOptions from './poll_item_options.js';
import votesMethods from './votes.js';
import accountsMethods from './accounts.js';
import avatarsMethods from './avatars.js';

export default () => {
	pollsMethods();
	pollItemsMethods();
	pollItemsOptions();
	votesMethods();
	accountsMethods();
	avatarsMethods();
}