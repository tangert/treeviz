import React, { Component } from 'react';
import { Button, Menu, Icon, Intent, MenuItem, MenuDivider, Popover, Position, PopoverInteractionKind } from "@blueprintjs/core";
import Tag from './Tag/Tag';
import './Word.css';

// TODO:
  /*
  Need to restrucutre component to handle "POS" and "NER" focus so that you can pass in different sized chunks?
  Or, keep each word it's own component/div and then highlight and focus differnet NER

  - Draw links between NER's ???? just a simple line in between the divs
  - Use library: react-line-to
*/

class Word extends Component {
  constructor(props){
    super(props)
    this.state = {
      isOpen: false,
      rect: {},
    }
  }

  //FIXME: need a way to check the last/current state of the window to adjust DOM node
  componentDidMount() {
    let rect = this.mainButton.getBoundingClientRect();
    this.setState({
      rect: rect,
    });
  }

  //CSS functions
  mainStyles = (isOpen) => {

    let { pos, ner, colorData, positionData, focused, container, selectedPos, selectedNer } = this.props;

    let style = {
      padding: 5,
      borderRadius: 5,
      transition: "0.3s ease-out"
    };

    if (isOpen) {

      style.transform = "scale(1.15)";
      style.borderWidth = "1px"

      style.padding = 5
      style.marginBottom = -5
      style.marginLeft = 5
      style.marginRight = 5

      style.backgroundColor = "white"

      style.borderColor = "rgba(0,0,0,0.2)"
      style.borderStyle = "solid"
      style.zIndex = 999
    }

    if (selectedPos.includes(pos)) {
      style.backgroundColor = colorData.pos[pos]
      style.color = "white"
    }

    if (selectedNer.includes(ner)) {
      style.backgroundColor = colorData.ner[ner]
      style.color = "white"
    }

    return style;
  }

  containerStyles = () => {
    let style = {};
    let { positionData, focused, container, expanded } = this.props;

    if (focused) {
      style.position = "absolute"
      style.transform = `translate(${positionData.x - this.props.container.width/2}px,${positionData.y}px)`
      style.borderColor = "rgba(0,0,0,0.2)";
      style.borderWidth = 1;
      style.borderStyle = "solid";
      style.borderRadius = 5;
      style.boxShadow = "0px 0px 70px 0px rgba(0,0,0,0.15)";
    }

    if (expanded) {
      style.zIndex = 9999;
    }

    return style;
  }

  renderContent = () => {
    return (
      <div
        ref={(el) => this.mainButton = el}
        style = {this.mainStyles(this.state.isOpen)}
        >
          {this.props.word}
      </div>
    );
  }

  renderPopoverContent = () => {
    return (
      <div>
          <h5>Popover Title</h5>
          <p>...</p>
          <button class="pt-button pt-popover-dismiss">Close popover</button>
      </div>
    );
  }

  /*
  POPOVER EVENT HANDLERS
  */
  renderOffsets() {
    let { positionData, focused, container } = this.props;

    if(focused) {
      let offset_x = positionData.x;
      let offset_y = positionData.y;
      let offset = `${offset_x}px, ${-offset_y}px`

      console.log("offset: " + offset)
      console.log("          ")
      return offset

    } else {
      return 0
    }
  }

  handleInteraction(state){
    this.setState({
      isOpen: state
    });
  }

  willOpen(){
    console.log("about to open")
    //perhaps send a notification to parent to prevent opening the sentence
  }

  didOpen(){
    console.log("opened")
  }

  menuItemStyles = () => {
    return {
      display: "flex",
      alignItems: "center",
      transition: "0.15s",
    }
  }

  render(){

    let { pos, lem, ner, colorData } = this.props

    const menu = (
      <Menu
        className = "word-popover-menu"
        >
          <MenuItem
            text={"POS: "}
            style = {this.menuItemStyles()}
            labelElement = {
              <Tag content = {pos}
                   color = {colorData.pos[pos]}
              />
            }
          />

        {
          ner !== undefined ?
          <MenuItem
            text={"NER: "}
            style = {this.menuItemStyles()}
            labelElement = {
              <Tag content = {ner}
                   color = {colorData.ner[ner]}
              />
            }
          />
          :
          console.log("No NER data")
        }

          <MenuItem
            text={"Lemma: "}
            style = {this.menuItemStyles()}
            labelElement = {
              <Tag content = {lem}
                   color = {"rgba(0,0,0,0.25)"}
              />
            }
          />

          <Button
            style = {{width: "100%"}}
            text = {"Show Corefs"}
          />
      </Menu>
    );

    return (

      <Popover
          interactionKind={PopoverInteractionKind.CLICK}
          popoverClassName="pt-popover-content-sizing"
          position={Position.TOP}
          hoverOpenDelay = {75}
          hoverCloseDelay = {75}
          minimal = {false}

          modifiers = {
            {
              offset: {
              	offset: this.renderOffsets()
              }
            }
          }

          onInteraction={(state)=>this.handleInteraction(state)}
          onClose={this.handlePopoverClose}
          popoverWillOpen = {this.willOpen}
          popoverDidOpen = {this.didOpen}
          disabled = {this.props.focused}

          isOpen={this.state.isOpen}
          style = {this.containerStyles()}

          content = {
            menu
          }

          target = {
            <div className = "word-container"
              ref={(el) => this.wordContainerNode = el}
              style = {this.containerStyles()}
              >
                {this.renderContent()}
            </div>
          }
      />
    );
  }
}

export default Word;
