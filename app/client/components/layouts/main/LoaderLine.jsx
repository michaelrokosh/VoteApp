C.LoaderLine = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      isLoading: Session.get('isLoading')
    }
  },

  render() {
    const isLoading = this.data.isLoading;
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
});