import React, { Component } from 'react';
import Word from './../Word/Word'
import { tree, hierarchy } from 'd3-hierarchy';
import { linkVertical, svg } from 'd3';
import { Button, Position, PopoverInteractionKind, Intent } from "@blueprintjs/core";
import './Sentence.css';

class Sentence extends Component {

  constructor(props){
    super(props)
    this.state = {
      mounted: false,
      focused: false,
      expanded: false,
      rect: {},
      treeLayout: {},
      expandedTree: {},
      root: {},
      nodes: {},
      links: {},
      diagonal: {},
    };

    console.log(this.props)
  }

// FIXME: make the height of the sentence when foxued a function of
// how many levels in the dependency tree there are.
  componentDidMount() {

    let rect = this.sentenceNode.getBoundingClientRect();
    let focusedHeight = rect.height*8

    let treeLayout = tree().size([rect.width, focusedHeight]);
    let expandedTree = this.genExpandedTree(this.props.tokens);
    let root = treeLayout(hierarchy(expandedTree));

    // let diagonal = svg.diagonal().projection((d) => [d.x, d.y]);

    let descendants = root.descendants();
    // let links = treeLayout.links(descendants);

    this.setState({
      mounted: true,
      rect: rect,
      expandedTree: expandedTree,
      treeLayout: treeLayout,
      root: root,
      nodes: descendants,
      // links: links, s
      // diagonal: diagonal
    });
  }

// Generates a fake expanded tree
  genExpandedTree = (data) => {

    console.log(data)

    //Base case: one or two children left
    if (data.length < 3) {

      let toReturn = [];
      let children;

      if (data.length === 0 || data.length === 1) {
        children = null;
      } else {
        children = []
        for(var i = 0; i < data.length; i++) {
          let child = {"name": data[i]};
          children.push(child);
        }
      }

      toReturn.push({
        "name": data[0],
        "children": children
      });

      return toReturn;
    }

    //Build the tree
    let tree = {};
    let children = [];

    //Get the children for this node
    for(var i = 1; i < 3; i++) {
      let child = {
        "name": data[i]
      }
      children.push(child);
    }

    //Assign initial values
    tree.name = data[0];
    tree.children = children;
    data.splice(0,3);

    //Assign the children of the 2nd element to a new expanded tree
    tree.children[1].children = [this.genExpandedTree(data)]

    return tree;
  }

// Generates the main styles for the sentence container
  mainStyles = () => {
    let { sizeData, depthOn } = this.props;
    let { focused, expanded } = this.state;

    let style = {}
    style.backgroundColor = "white";


    if(depthOn) {
      style.transform =  "scale(" + sizeData + ")";
    }

    if(focused) {

      style.height = this.state.rect.height*8 + "px";
      style.marginTop = 30
      style.marginBottom = 50
      style.border = "none"
    }

    if(expanded) {
      style.transform = "scale(1.5)"
      style.zIndex = 999;
      style.boxShadow = "0px 0px 70px 0px rgba(0,0,0,0.25)";

      //implement with more redux attention
      // style.position = "absolute"

    }

    return style;
  }

// Handles the expansion of the tree
  handleExpand = () => {
    let { expanded } = this.state;
      this.setState({
        expanded: !expanded,
    });
    this.props.expandTree();
  }

  handleFocus = () => {
    let { focused } = this.state;
      this.setState({
        focused: !focused,
      });
    this.props.focusSentence();
  }

// Renders the links for the word nodes
  renderLinks = () => {
    let { links } = this.state;
    return (
      links.map( link => {
        return (
          <path key={`${link.source.id}-${link.target.id}`} className="link"
            d={this.state.diagonal(link)} />
        )
      })
    )
  }

// Renders all of the word content for each sentence
// Maps the data from the d3 nodes
  renderWords = () => {

    if(this.state.mounted) {

      var words = (this.state.nodes.map( (node, i) => {
        return (
          <Word
            container = {this.state.rect}

            word = {node.data.name}
            positionData = {{"x": node.x, "y": node.y}}

            pos = {this.props.pos[i]}
            lem = {this.props.lem[i]}

            key = {"word" + node.data.name + i}
            offset = {5}

            focused = {this.state.focused}
            expanded = {this.state.expanded}
            />

        )
      }));

      return words;
    }

  }

  render() {
    return (
      <div
        className="sentence-container"
        style = {this.mainStyles()}
        ref={(el) => this.sentenceNode = el}
        >

        { this.renderWords() }

        <div
          className = "sentence-focus-button"
          style = {{
            display: "flex",
            flexDirection: "horizontal",
            justifyContent: "space-between"
          }}>

          <Button
            icon = "layout-hierarchy"
            onClick = {this.handleFocus}
            active = {this.state.focused}
            >
          </Button>

          <Button
            style = {{marginLeft: 5}}
            icon = "maximize"
            onClick = {this.handleExpand}
            active = {this.state.expanded}
            >
          </Button>

        </div>

      </div>

    );
  }
}

export default Sentence;
