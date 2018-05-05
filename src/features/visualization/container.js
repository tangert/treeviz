import React, { Component } from 'react';
import FlipMove from 'react-flip-move';
import Sentence from './components/Sentence/Sentence'
import './container.css';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './Actions'

class VisualizationContainer extends Component {

  constructor(props){
    super(props)
  }

  render() {
    return (
      <div className="VisualizationContainer">
        <FlipMove
          duration={750}
          easing = "ease-out">
          { this.props.data.map( (sentence,i) => {

              return (
                <Sentence
                  key = {sentence.sid}
                  tokens = {sentence.tok}
                  dep = {sentence.dep}
                  lem = {sentence.lem}
                  pos = {sentence.pos}
                  ner = {sentence.ner}

                  selectedNer = {this.props.selectedNer}
                  selectedPos = {this.props.selectedPos}
                  colorData = {this.props.colorData}

                  expandTree = {this.props.actions.expandTree}
                  retractTree = {this.props.actions.retractTree}

                  focusSentence = {this.props.actions.focusSentence}
                  unfocusSentence = {this.props.actions.unfocusSentence}
                  />
              );
            }) }
        </FlipMove>
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

    selectedNer: state.Filters.selectedNer,
    selectedPos: state.Filters.selectedPos
  };
}

//Connect to redux here
export default connect(mapStateToProps, mapDispatchToProps)(VisualizationContainer)
