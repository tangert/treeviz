import React, { Component } from 'react';
import FlipMove from 'react-flip-move';
import Sentence from './components/Sentence/Sentence'
import { SAMPLE_DATA } from './../../utils.js'
import './container.css';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './Actions'

/*
data format
[
  { -> list of sentence objects
    dep: [0...n] -> dependencies for each token
    lem: [0...n] -> lemmas for each token
    ner: [[tok1, tok2, label],...,[]] -> NER
    pos: [0...n] -> parts of speech for each token
    sid: n -> ID for sentence object
    tok: [0...n] -> each token!
  }
]
*/

class VisualizationContainer extends Component {

  constructor(props){
    super(props)
    this.state = {
      data: SAMPLE_DATA.output,
    }
  }

  render() {
    return (
      <div className="VisualizationContainer">
        <FlipMove
          duration={750}
          easing = "ease-out">
          { this.state.data.map( (sentence,i) => {

            console.log(i)
            console.log(sentence)

              return (
                <Sentence
                  key = {sentence.sid}
                  tokens = {sentence.tok}
                  dep = {sentence.dep}
                  lem = {sentence.lem}
                  pos = {sentence.pos}
                  ner = {sentence.ner}

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
  };
}

//Connect to redux here
export default connect(mapStateToProps, mapDispatchToProps)(VisualizationContainer)
