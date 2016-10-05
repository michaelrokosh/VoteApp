import React from 'react';

class LoaderLine extends React.Component {
  render() {
    const { isLoading } = this.props;
    let className;

    if (isLoading) {
      loaderClass = 'loading';
    } else {
      loaderClass = 'loaded';
    }

    return (
      <div id="loader" className={ loaderClass }>
        
      </div>
    )
  }
}

export default LoaderLine;