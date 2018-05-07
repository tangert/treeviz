import React, { Component } from 'react';
import FlipMove from 'react-flip-move';
import Sentence from './components/Sentence/Sentence'
import { Button } from '@blueprintjs/core'
import './container.css';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './Actions'

// TODO:
/*
  Add buttons for sentence scrolling, and update current visible sentences
  to redux store with the only 10 in the container

  Use redux to simply select the 10 selected from a reference dictionary
  Render that selected/filtered list ot flip move
*/

class VisualizationContainer extends Component {

  renderChevronStyles = (direction) => {

    let amount = 10

    if (direction === "up") {
      return {
        marginBottom: amount
      }
    } else {
      return {
        marginTop: amount
      }
    }
  }

  handleScrollUp = () => {
    //

  }

  handleScrollDown = () => {

  }

  renderScrollUpButton = (renderCondition) => {
    if(renderCondition) {
      return (
        <Button icon = "chevron-up"
                style = {this.renderChevronStyles("up")}
                onClick = {this.handleScrollUp}
        />
      )
    }
  }

  renderScrollDownButton = (renderCondition) => {
    if(renderCondition) {
      return (
        <Button icon = "chevron-down"
                style = {this.renderChevronStyles("down")}
                onClick = {this.handleScrollDown}
        />
      )
    }
  }

  // Parses the NER data for the word components for easy indexing 
  parseNerData = (ner) => {

    let dataDict = {}

    ner.forEach( n => {
      let start = n[0]
      let end = n[1]
      let tag = n[2]

      for(let i = start; i < end; i++) {
        dataDict[i] = tag
      }
    });

    return dataDict
  }

  render() {

    // Render the scroll buttons if there are more than 6 sentences.
    let scrollButtonRenderCondition = this.props.data.length > 6

    return (
      <div className="visualization-container">

        { this.renderScrollUpButton(scrollButtonRenderCondition) }

        <FlipMove
          duration={750}
          easing = "ease-out">
          { this.props.data.map( (sentence,i) => {

            console.log(sentence.ner)

              return (
                <Sentence

                  key = {sentence.sid}

                  tokens = {sentence.tok}
                  dep = {sentence.dep}
                  lem = {sentence.lem}
                  pos = {sentence.pos}
                  ner = {this.parseNerData(sentence.ner)}

                  isFirst = {i===0}
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

        { this.renderScrollDownButton(scrollButtonRenderCondition) }

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
