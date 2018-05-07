import React, { Component } from 'react'
import './filter.css'
import { Button } from '@blueprintjs/core'

class Filter extends Component {
  constructor(props){
    super(props)
  }

  handleGlobal = () => {
    this.props.filterGlobal();
    Object.keys(this.props.data).forEach( key => {
      this.props.selectTag(key);
    });
  }

  buttonStyles = (active, key) => {

    let style = {
      margin: 2.5,
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: key,
      backgroundColor: key,
      color: "white",
      transition: "0.2s ease-out",
      backgroundImage: "none",
      opacity: 0.8
    }

    if(active) {
      style.opacity = 1
      style.backgroundColor = key
    }

    return style
  }

  render () {

    // TODO: create active/inactive states for global and specific filters

    return (
      <div
        className = "filter">

        <Button
          active = {this.props.active}
          text={this.props.purpose}
          onClick = {this.handleGlobal}
          style = {{marginBottom: 10}}
        />

        <div className = "tag-buttons">
          { Object.keys(this.props.data).map( (key, i) => {

            let a =  this.props.selectedData.includes(key);

            return(

              <Button
                onMouseOver = {this.handleHover}
                onMouseOut = {this.handleHover}
                active = {this.props.active ? true : a}
                onClick = {()=>this.props.selectTag(key)}
                style = {this.buttonStyles(a, this.props.data[key])}

                key = {i}
                text = {key}
                color = {this.props.data[key]}/>
            )
            })
          }
        </div>

      </div>
    )
  }
}

export default Filter;
