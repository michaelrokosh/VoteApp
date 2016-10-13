import React from 'react';
import marked from 'marked';

import PollItemOptionView from '../../containers/poll_view/poll_item_option_view.js';
import PollItemChartWrapper from '../../containers/poll_item_page/poll_item_chart_wrapper.js';

class PollItemView extends React.Component {
  render() {
    const { pollItem, preview, pollItemOptions, isPollItemView } = this.props;

    const description = marked(pollItem.description || "")
    
    return (
      <div className="poll-item">
        <h5>{ pollItem.text }</h5>
        <div className="poll-item-description" dangerouslySetInnerHTML={{__html: description}} />
        <PollItemChartWrapper pollItemId={ pollItem._id } isChartPreview={ isPollItemView }/>
        {
          pollItemOptions.map((option, i) => {
            return (
              <div key={ i }>
                <PollItemOptionView pollItemOption={ option } preview={ !!preview } index={ i } />
              </div>
            )
          })
        }
      </div>
    );
  }
}

PollItemView.PropTypes = {
  pollItem: React.PropTypes.object.isRequired,
  preview: React.PropTypes.boolean
}


export default PollItemView;