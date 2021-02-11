import React, { Component } from "react";
import "../styles/activeBtn.css";
class Keyboard extends Component {
  state = {
    keysCodes: [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 65, 66, 67, 68, 69, 70],
  };
  constructor() {
    super();
    this.currClicked = undefined;
  }
  getKeysCodes=()=>{
    const keysCodes=[...this.state.keysCodes];
    return keysCodes;
  }
  getKeyCode=(keyIndex)=>{
        
    if(keyIndex<this.state.keysCodes.length)
    return this.state.keysCodes[keyIndex];
    return this.state.keysCodes[0];
}
  keyCodeChanged=(event,oldKeyCode,newKeyCode)=>{
    var keyCodeChangedEvent = new CustomEvent("keyCodeChangedEvent", {detail:{oldKeyCode:oldKeyCode,newKeyCode:newKeyCode}});
    let keyboard=document.getElementById("keyboard");
    keyboard.dispatchEvent(keyCodeChangedEvent);
  }
  handleKeyDown=(event)=>{
    if(this.currClicked!=undefined&&this.currClicked.state.iskeyclicked){
      let keyCode=event.keyCode;
      if(this.state.keysCodes.includes(keyCode)){
      return;
      }
      const keyIndex=parseInt(this.currClicked.props.keyName,16);
      const keysCodes = [...this.state.keysCodes];
      const oldKeyCode=keysCodes[keyIndex];
      keysCodes[keyIndex]=keyCode;
    this.setState({keysCodes},()=>{this.keyCodeChanged(event,oldKeyCode,keyCode)});
    this.currClicked.setState({ iskeyclicked: false });
    }
  }
  handleClick = (key) => {
    if (this.currClicked != undefined && this.currClicked != key) {
      this.currClicked.setState({ iskeyclicked: false });
    }

    const iskeyclicked = !key.state.iskeyclicked;
    this.currClicked = key;
    key.setState({ iskeyclicked: iskeyclicked });
  };
  handleFocusOut=()=>{
    if (this.currClicked != undefined&&this.currClicked.state.iskeyclicked) {
      this.currClicked.key.current.click();
      this.currClicked=undefined;
    }
  };
  render() {
    return (
      <div id="container" style={{ float: "left" }}>
        <ul id="keyboard" onBlur={()=>{this.handleFocusOut()}} onKeyDown={(event)=>{this.handleKeyDown(event)}} tabIndex="0">
          <Key onKeyClicked={this.handleClick} keyName="1" keyLetter={String.fromCharCode(this.state.keysCodes[1])} />
          <Key onKeyClicked={this.handleClick} keyName="2" keyLetter={String.fromCharCode(this.state.keysCodes[2])} />
          <Key onKeyClicked={this.handleClick} keyName="3" keyLetter={String.fromCharCode(this.state.keysCodes[3])} />
          <Key onKeyClicked={this.handleClick} keyName="C" keyLetter={String.fromCharCode(this.state.keysCodes[12])}/>
          <br />
          <br />
          <br />
          <Key onKeyClicked={this.handleClick} keyName="4" keyLetter={String.fromCharCode(this.state.keysCodes[4])} />
          <Key onKeyClicked={this.handleClick} keyName="5" keyLetter={String.fromCharCode(this.state.keysCodes[5])} />
          <Key onKeyClicked={this.handleClick} keyName="6" keyLetter={String.fromCharCode(this.state.keysCodes[6])} />
          <Key onKeyClicked={this.handleClick} keyName="D" keyLetter={String.fromCharCode(this.state.keysCodes[13])} />
          <br />
          <br />
          <br />
          <Key onKeyClicked={this.handleClick} keyName="7" keyLetter={String.fromCharCode(this.state.keysCodes[7])} />
          <Key onKeyClicked={this.handleClick} keyName="8" keyLetter={String.fromCharCode(this.state.keysCodes[8])} />
          <Key onKeyClicked={this.handleClick} keyName="9" keyLetter={String.fromCharCode(this.state.keysCodes[9])} />
          <Key onKeyClicked={this.handleClick} keyName="E" keyLetter={String.fromCharCode(this.state.keysCodes[14])} />
          <br />
          <br />
          <br />
          <Key onKeyClicked={this.handleClick} keyName="A" keyLetter={String.fromCharCode(this.state.keysCodes[10])} />
          <Key onKeyClicked={this.handleClick} keyName="0" keyLetter={String.fromCharCode(this.state.keysCodes[0])} />
          <Key onKeyClicked={this.handleClick} keyName="B" keyLetter={String.fromCharCode(this.state.keysCodes[11])} />
          <Key onKeyClicked={this.handleClick} keyName="F" keyLetter={String.fromCharCode(this.state.keysCodes[15])} />
        </ul>
      </div>
    );
  }
}

export default Keyboard;
class Key extends Component {
  state = { iskeyclicked: false };
  constructor() {
    super();
    this.key = React.createRef();
  }

  render() {
    return (
      <li
        iskeyclicked={this.state.iskeyclicked ? 1 : 0}
        ref={this.key}
        className="letter"
        onClick={() => this.props.onKeyClicked(this)}
      >
        <b>{this.props.keyName}</b>
        <sub>{this.props.keyLetter}</sub>
      </li>
    );
  }
}