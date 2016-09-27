import React from 'react';
import MainHeader from './main_header.jsx';
import MainFooter from './main_footer.jsx';

const MainLayout = ({content}) => (
	<div>
        <MainHeader />
        <div id="main">
          {content}
        </div>
       	<MainFooter />
	</div>
)

export default MainLayout;