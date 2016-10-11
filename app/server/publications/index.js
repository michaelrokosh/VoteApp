import pollsPubs from './polls.js';
import pollItemsPubs from './poll_items.js';
import pollItemsOptionsPubs from './poll_item_options.js';
import votesPubs from './votes.js';


export default () => {
	pollsPubs();
	pollItemsPubs();
	pollItemsOptionsPubs();
	votesPubs();
}