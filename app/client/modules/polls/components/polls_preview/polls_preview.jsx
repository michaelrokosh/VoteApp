import React from 'react';

import PollsPreviewItem from './polls_preview_item.jsx';

class PollsPreview extends React.Component {
	render() {
		const { polls, userId, togglePrivatePoll } = this.props;
	    let infoContainer;

	    if (polls.length === 0) {
	      infoContainer = (
	        <p>No polls...</p>
	      )
	    }

	    return (
	      <div className="container">
	        <div className="row">
	          <div className="col s12 m12">
	            <div className="row">
	              { infoContainer }
	              { 
	              	polls.map((poll, i) => {
	              		return (
	              			<PollsPreviewItem 
	              				poll={ poll } 
	              				userId={ userId } 
	              				key={ poll._id }
	              				index={ i }
	              				togglePrivatePoll={ togglePrivatePoll }
	              			/>
	              		)
	              	})
	              }

	            </div>
	          </div>
	        </div>
	      </div>
	    );
	}
}

export default PollsPreview;