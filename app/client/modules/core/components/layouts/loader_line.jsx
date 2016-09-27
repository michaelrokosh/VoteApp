import React from 'react';

class LoaderLine extends React.Component {
  //mixins: [ReactMeteorData],
  // getMeteorData() {
  //   return {
  //     isLoading: Session.get('isLoading')
  //   }
  // },

  render() {
    //const isLoading = this.data.isLoading;
    // let className;
    // if (isLoading) {
    //   loaderClass = 'loading';
    // } else {
      loaderClass = 'loaded';
    //}

    return (
      <div id="loader" className={ loaderClass }>
        
      </div>
    )
  }
}

export default LoaderLine;