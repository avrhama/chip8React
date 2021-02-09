import React, { Component } from "react";
import "../styles/activeBtn.css";
class Keyboard extends Component {
 
 // state = { keysCodes:[48,49,50,51,52,53,54,55,56,57,65,66,67,68,69,70] }
  constructor(){
      super();
      this.lastCliked=undefined;
  }
  handleClick=(key)=>{
    //$(his.letter.current).css("background-color", "yellow");
    //this.letter.current.style= 'box-shadow: 0 0 20px #0a4aaf';
    if(this.lastCliked!=undefined&&this.lastCliked!=key){
       // this.lastCliked.state.iskeyclicked=false;
        this.lastCliked.setState({iskeyclicked:false});
    }

    const iskeyclicked=!key.state.iskeyclicked;
    this.lastCliked=key;
    key.setState({iskeyclicked:iskeyclicked})
    
}
  render() {
    return (
      <div id="container" style={{float: "right"}}>
        <ul id="keyboard">
        {counters.map((counter) => (
          <Counter
            onDelete={onDelete}
            key={counter.id}
            counter={counter}
            value={counter.value}
            onIncrement={onIncrement}
          ></Counter>
        ))}


          <Key onKeyClicked={this.handleClick} keyLetter="1"/>
          <Key onKeyClicked={this.handleClick} keyLetter="2"/>
          <Key onKeyClicked={this.handleClick} keyLetter="3"/>
          <Key onKeyClicked={this.handleClick} keyLetter="C"/><br/><br/><br/>
          <Key onKeyClicked={this.handleClick} keyLetter="4"/>
          <Key onKeyClicked={this.handleClick} keyLetter="5"/>
          <Key onKeyClicked={this.handleClick} keyLetter="6"/>
          <Key onKeyClicked={this.handleClick} keyLetter="D"/><br/><br/><br/>
          <Key onKeyClicked={this.handleClick} keyLetter="7"/>
          <Key onKeyClicked={this.handleClick} keyLetter="8"/>
          <Key onKeyClicked={this.handleClick} keyLetter="9"/>
          <Key onKeyClicked={this.handleClick} keyLetter="E"/><br/><br/><br/>
          <Key onKeyClicked={this.handleClick} keyLetter="A"/>
          <Key onKeyClicked={this.handleClick} keyLetter="0"/>
          <Key onKeyClicked={this.handleClick} keyLetter="B"/>
          <Key onKeyClicked={this.handleClick} keyLetter="F"/>
        </ul>
      </div>
    );
  }
}

export default Keyboard;
class Key extends Component {
    state={iskeyclicked:false}
    constructor(){
        super();
        this.letter=React.createRef();
        //this.isKeyClicked=false;
    }
    
  render() {
    return <li iskeyclicked={this.state.iskeyclicked ? 1 : 0} ref={this.letter} className="letter" onClick={()=>this.props.onKeyClicked(this)}>
        <b>{this.props.keyLetter}</b>
        <sub>{this.props.keyLetter}</sub>
        
        </li>;
  }
}
