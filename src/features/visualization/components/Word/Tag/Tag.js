import React, { Component } from 'react';

class Tag extends Component {
  render(){
    return(
      <div
        style = {{
          backgroundColor: this.props.color,
          color: "white",
          padding: 5,
          borderRadius: 5,
          fontWeight: "bold"
        }}
        className = "word-tag">
        {this.props.content}
      </div>
    );
  }
}

export default Tag;
