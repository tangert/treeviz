import React, { Component } from 'react';
import VisualizationContainer from './../features/visualization/container.js'
import './App.css';

// Blueprint.js CSS modules
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "normalize.css/normalize.css";

class App extends Component {
  // Have visualization container
  // Need to add filters container
  render() {
    return (
      <div className = "app">
        <VisualizationContainer/>
      </div>
    );
  }
}

export default App;
