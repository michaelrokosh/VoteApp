import accountsPubs from './accounts.js';
import pollsPubs from './polls.js';
import pollItemsPubs from './poll_items.js';
import pollItemsOptionsPubs from './poll_item_options.js';
import votesPubs from './votes.js';


export default () => {
	accountsPubs();
	pollsPubs();
	pollItemsPubs();
	pollItemsOptionsPubs();
	votesPubs();
}