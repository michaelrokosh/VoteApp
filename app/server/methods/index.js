import pollsMethods from './polls.js';
import pollItemsMethods from './poll_items.js';
import pollItemsOptions from './poll_item_options.js';
import votesMethods from './votes.js';

export default () => {
	pollsMethods();
	pollItemsMethods();
	pollItemsOptions();
	votesMethods();
}