import React, { Component } from 'react';
class Key {
    constructor(keyCode){
        this.pressed=false;
        this.keyCode=keyCode;
    }
  
}
class Joypad extends Component {
    state = { keysCodes:[48,49,50,51,52,53,54,55,56,57,65,66,67,68,69,70] }

    constructor(props){
       
        super(props);
        this.pressedKey=undefined;
        this.keys=new Map();
        this.config();
        //this.bus=props.bus;
       // this.setPixel=props.bus.display.setPixel;
    }
    assignKey=(keyIndex,keyCode)=>{
        if(this.keys.has(keyCode))
        return;
        const keysCodes = [...this.state.keysCodes];       
        this.keys.delete(keysCodes[keyIndex]);
        keysCodes[keyIndex]=keyCode;
        this.keys.set(keyCode,new Key(keyCode));
        this.setState({ keysCodes });
    }
    getKeyCode=(keyIndex)=>{
        
        if(keyIndex<this.state.keysCodes.length)
        return this.state.keysCodes[keyIndex];
        return this.state.keysCodes[0];
    }
    config=()=>{
        for(let keyCode of this.state.keysCodes){
            this.keys.set(keyCode,new Key(keyCode));
        }
    }
handleKeyDown = (event) => {
    
    let keyCode=event.keyCode;
    if(!this.keys.has(keyCode)||this.keys.get(keyCode).pressed)
    return;
    this.keys.get(keyCode).pressed=true;
    this.pressedKey=this.keys.get(keyCode)
    
}
handleKeyUp = (event) => {
    console.log("key up!")
    let keyCode=event.keyCode;
    if(!this.keys.has(keyCode))
    return;
    this.keys.get(keyCode).pressed=false;
}
// componentWillMount deprecated in React 16.3
componentDidMount(){
    //BannerDataStore.addChangeListener(this._onchange);
    document.addEventListener("click", this._handleDocumentClick, false);
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
}


componentWillUnmount() {
    //BannerDataStore.removeChangeListener(this._onchange);
    document.removeEventListener("click", this._handleDocumentClick, false);
    document.removeEventListener("keydown", this.handleKeyDown);
    document.removeEventListener("keyup", this.handleKeyUp);
}
    render() { 
        return ( <div>

        </div> );
    }
}
 
export default Joypad;