import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import FlipMove from 'react-flip-move';
import Sentence from './components/Sentence/Sentence'
import './App.css';

import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "normalize.css/normalize.css";


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      sentences: [
        "I would love to go see a movie with you!",
        "After, would you want to hang out?",
        "We could get some ice cream or something."
      ],
      depthOn: false
    }
  }

  generateRandomContent = () => {
    var text = "";
    var currtext = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for(var j = 0; j < 5; j++) {
    currtext = "";
    for (var i = 0; i < 10; i++) {
      currtext += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    text += " " + currtext
  }

    return text;
  }

  toggleDepth = () => {
    this.setState({
      depthOn: !this.state.depthOn
    });
  }

  generateSizeData = (arr, i, scaleFactor) => {

    let dist;
    //For odd lengths
    if (arr.length%2 == 1) {
      //if the index is ahead or behind the mid point
      let mid = Math.floor(arr.length/2);
      dist = i > mid ? i - mid : mid - i;
    } else {
      //even, so highlight top two sentences
      let mid_1 = Math.floor(arr.length/2) - 1;
      let mid_2 = Math.floor(arr.length/2);
      dist = i > mid_1 ? i - mid_1 : mid_2 - i;
    }

    var data = Math.pow(scaleFactor, dist);

    return data;

  }

  render() {

    return (
      <div className="App">
        <FlipMove
          duration={750}
          easing = "ease-out">
          { this.state.sentences.map( (sentence,i) => {
              return (
                <Sentence
                  key = {"sent" + sentence}
                  sentence = {sentence}
                  sizeData = {this.generateSizeData(this.state.sentences, i, 0.8)}
                  />
              );
            }) }
        </FlipMove>
      </div>
    );
  }
}

export default App;
