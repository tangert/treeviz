import React, { Component } from 'react';
import InputContainer from './../features/input/container'
import VisualizationContainer from './../features/visualization/container'
import FiltersContainer from './../features/filters/container'

import './App.css';
import { SAMPLE_DATA, stringToColor} from './../utils.js'

// Blueprint.js CSS modules
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "normalize.css/normalize.css";

/*
  JSON data format
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

class App extends Component {

  parseData = (data) => {
    // Eventually write to only parse this for
    // the current visible 10 sentences or so

    // Parses the incoming data into relevant
    // unique NER and POS tags

    let posSet = new Set();
    let nerSet = new Set();

    data.forEach( (sentence) => {
      if (sentence.hasOwnProperty("pos")) {
          let pos = sentence["pos"];
          for (let i = 0; i < pos.length; i++) {
            posSet.add(pos[i])
          }
      }

      if (sentence.hasOwnProperty("ner")) {
          let ner = sentence["ner"];
          for (let i = 0; i < ner.length; i++) {
            nerSet.add(ner[i][2])
          }
      }
    });

    let pos = Array.from(posSet)
    let ner = Array.from(nerSet)

    let dataDict = {
      "pos": {},
      "ner": {}
    }

    // go through each of the tags and
    // calculate their color, then store it as a tuple for each

    pos.forEach( tag => {
      let col = stringToColor(tag)
      dataDict.pos[tag] = col
    });

    ner.forEach ( tag => {
      let col = stringToColor(tag)
      dataDict.ner[tag] = col
    });

    return dataDict
  }

  render() {

    /*
      // Start off with sample data, then connect the app to the store and
      // Pass down the analyzed text from the input!
    */

    return (
      <div className = "app">

        <InputContainer/>

        <div className = "content-container">
          <VisualizationContainer colorData = {this.parseData(SAMPLE_DATA.output)}
                                  data = {SAMPLE_DATA.output} />

          <FiltersContainer colorData = {this.parseData(SAMPLE_DATA.output)}/>

        </div>
    </div>
    );
  }
}

export default App;
