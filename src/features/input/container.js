import React, { Component } from 'react'
import Header from './components/Header/Header'
import Entry from './components/Entry/Entry'
import './container.css'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './Actions'

class InputContainer extends Component {
  render () {
    // TODO: Pass in redux data to entry section
    return (
      <div className = "input-container">
        <Header/>
        <Entry
          currentText = {this.props.currentText}
          entryIsFocused = {this.props.entryIsFocused}

          editText = {this.props.actions.editText}
          analyzeText = {this.props.actions.analyzeText}
          handleEntryFocus = {this.props.actions.handleEntryFocus}
          handleEntryBlur = {this.props.actions.handleEntryBlur}
          />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

function mapStateToProps(state){
  return {
    analyzedText: state.Input.analyzedText,
    currentText: state.Input.currentText,
    phraseData: state.Input.phrase,
    entryIsFocused: state.Input.entryIsFocused
  };
}

//Connect to redux here
export default connect(mapStateToProps, mapDispatchToProps)(InputContainer)
