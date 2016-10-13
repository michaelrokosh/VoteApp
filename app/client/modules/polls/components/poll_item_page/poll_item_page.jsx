import React from 'react';

import PollItemView from '../../containers/poll_view/poll_item_view.js';

class PollItemPage extends React.Component {
	render() {
		const  { pollItem } = this.props;

		return ( 
		 	<div className="container">
        		<div className="row">
          			<div className="col s12 m6 offset-m3"> 
          				<PollItemView  pollItem={ pollItem } isPollItemView={ true }/>
					</div>
				</div>
			</div>	
		)
	}
}

export default PollItemPage;