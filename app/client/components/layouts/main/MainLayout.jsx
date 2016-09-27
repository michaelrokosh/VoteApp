import React from 'react';

MainLayout = React.createClass({
  render() {
    return (
      <div>
        {this.props.header}
        <div id="main">
          {this.props.content}
        </div>
        {this.props.footer}
      </div>
    )
  }
});