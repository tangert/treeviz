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
  
  render () {

    // TODO: create active/inactive states for global and specific filters

    return (
      <div className = "filter">

        <Button
          active = {this.props.active}
          text={this.props.purpose}
          onClick = {this.handleGlobal}
        />

        { Object.keys(this.props.data).map( (key, i) => {

          return(
            <Button
              active = {this.props.selectedData.includes(key) }
              onClick = {()=>this.props.selectTag(key)}
              style = {{backgroundColor: this.props.data[key]}}
              key = {i}
              text = {key}
              color = {this.props.data[key]}/>
          )
          })
        }

      </div>
    )
  }
}

export default Filter;
