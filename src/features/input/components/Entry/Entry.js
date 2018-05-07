import React, { Component } from 'react'
import './Entry.css'

// EXAMPLE PYTHON REQUEST TO API
  /*

  import requests

  request = {
    'input': 'Emory University is a private research university in the Druid Hills neighborhood of the city of Atlanta, Georgia, United States. The university was founded as Emory College in 1836 in Oxford, Georgia by the Methodist Episcopal Church and was named in honor of Methodist bishop John Emory. In 1915, the college relocated to its present location in Druid Hills and was rechartered as Emory University. The university is the second-oldest private institution of higher education in Georgia and among the fifty oldest private universities in the United States. Emory University has nine academic divisions: Emory College of Arts and Sciences, Oxford College, Goizueta Business School, Laney Graduate School, School of Law, School of Medicine, Nell Hodgson Woodruff School of Nursing, Rollins School of Public Health, and the Candler School of Theology. Emory University, the Georgia Institute of Technology, and Peking University in Beijing, China jointly administer the Wallace H. Coulter Department of Biomedical Engineering. The university operates the Confucius Institute in Atlanta in partnership with Nanjing University. Emory has a growing faculty research partnership with the Korea Advanced Institute of Science and Technology (KAIST). Emory University students come from all 50 states, 6 territories of the United States, and over 100 foreign countries.',
    'task': 'all',
    'tool': 'spacy'
  }

  url = 'https://elit.cloud/api/public/decode'
  r = requests.post(url, json=request)
  if r.status_code == 200:
      print(r.text)
  else:
      print(r.status_code)
*/

class Entry extends Component {
  constructor(props){
    super(props);
    this.state = {
      focused: false,
    }

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);

  }

  // Add listeners for clicking outside the input box
  componentDidMount() {
      document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside);
  }


  editText = (e) => {
    this.props.editText(e.target.value);
  }

  analyzeText = () => {

    if(this.props.currentText !== "") {

      let dataToAnalyze = {
        "input": this.props.currentText,
        "task": "all",
        "tool": "spacy"
      };

      this.props.analyzeText(dataToAnalyze);
      this.handleEntryBlur();
    } else {
      console.log("need text");
    }
  }

  handleEntryFocus = () => {
    //only if the text area is focused…add local state
    this.props.handleEntryFocus(true)
  }

  handleEntryBlur = () => {
    this.props.handleEntryFocus(false)
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef(node) {
      this.wrapperRef = node;
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
      if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
        if(this.props.entryIsFocused) {
          this.handleEntryBlur();
        }
      }
  }

  render() {

    let entryStyle = {};
    let textAreaStyle = {};
    let buttonStyle = {};

    if(this.props.entryIsFocused) {

      entryStyle = {
        zIndex: 999,
        flexDirection: "column",
        // position: "absolute",
        // marginTop: "100px"
        marginBottom: 20
      };

      textAreaStyle = {
        minHeight: "40vh",
        width: "75vw",
        maxWidth: "1000px",
        marginBottom: "20px"
      }

      buttonStyle = {
        backgroundColor: "lightblue",
        color: "white",
        fontSize: "0.75em",
        // marginTop: "25px",
        maxWidth: "100%",
        minHeight: "50px",
        width: "25%"
      }
    }

    if(this.props.currentText === "") {
      buttonStyle.opacity = "0.5";
      buttonStyle.backgroundColor = "lightgrey";
      buttonStyle.border = "none";
      buttonStyle.color = "white";
      buttonStyle.userSelect = "none";
    }

    return(
      <div className = "entry-section-container"
        style = {entryStyle}
        ref={this.setWrapperRef}>

          <textarea
            value = {this.props.currentText}
            onChange = {this.editText}
            style = {textAreaStyle}
            onFocus = {this.handleEntryFocus}
            className = "entry-textarea"
            placeholder = "Enter any text to analyze its grammatical structure.">
          </textarea>

          <button style = {buttonStyle} onClick = {this.analyzeText} className = "analyze-text-btn">Analyze</button>

      </div>
    );
  }
}

export default Entry
