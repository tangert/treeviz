import React, { Component } from 'react'
import { Filter } from './components/filter/filter'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './Actions'

class FiltersContainer extends Component {
  render () {
    // Coming from app state, need to pass in the data to get all of the relevant POS tags
    // from the data
    // need to grab the unique set of all the different POS's
    // from the currently visible sentenceFocused

    return(
      <div className = "filters-container">
        <Filter/>
      </div>
    );
  }
}

// Redux functions
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

function mapStateToProps(state){
  return {
    treeExpanded: state.Visualization.treeExpanded,
    sentenceFocused: state.Visualization.sentenceFocused,
    scrollDirection: state.Visualization.scrollDirection,
  };
}

//Connect to redux here
export default connect(mapStateToProps, mapDispatchToProps)(FiltersContainer)
