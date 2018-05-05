import React, { Component } from 'react'
import Filter from './components/filter/filter'
import './container.css'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './Actions'

class FiltersContainer extends Component {

  constructor(props) {
    super(props)
  }

  render() {

    // Coming from app state, need to pass in the data to get all of the relevant POS tags
    // from the data
    // need to grab the unique set of all the different POS's
    // from the currently visible sentenceFocused

    return (
      <div className = "filters-container">
        <Filter purpose = "NER"
                active = {this.props.nerOn}
                data = {this.props.colorData.ner}
                selectedData = {this.props.selectedNer}

                filterGlobal = {this.props.actions.filterNER}
                selectTag = {this.props.actions.selectNER}
                />

        <Filter purpose = "POS"
                active = {this.props.posOn}
                data = {this.props.colorData.pos}
                selectedData = {this.props.selectedPos}

                filterGlobal = {this.props.actions.filterPOS}
                selectTag = {this.props.actions.selectPOS}
                />
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
    posOn : state.Filters.posOn,
    nerOn: state.Filters.nerOn,
    selectedPos: state.Filters.selectedPos,
    selectedNer: state.Filters.selectedNer
  };
}

//Connect to redux here
export default connect(mapStateToProps, mapDispatchToProps)(FiltersContainer)
