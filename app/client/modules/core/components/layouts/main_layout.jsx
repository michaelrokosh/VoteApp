import React from 'react';
import ReactDOM from 'react-dom';

import MainHeader from '../../containers/main_header.js';
import MainFooter from './main_footer.jsx';

class MainLayout extends React.Component {
	render() {
		return (
			<div>
		        <MainHeader />
		        <div id="notificator-container"></div>
		        <div id="main">
		          { this.props.content }
		        </div>
		       	<MainFooter />
			</div>
		)
	}
}


export default MainLayout;