import React, { Component } from "react";
import Keyboard from "./keyboard";
import DisplayConfig from "./displayConfig"
class Configurations extends Component {
  state = {};
  constructor(){
    super();
    this.keyboard=React.createRef();
  }
  render() {
    return (
      <div>
        <DisplayConfig ref={ds=>{this.displayConfig=ds}}/>
        <Keyboard ref={this.keyboard}/>
      </div>
    );
  }
}

export default Configurations;
