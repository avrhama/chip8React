import React, { Component } from 'react';
class Key {
    constructor(keyCode){
        this.pressed=false;
        this.keyCode=keyCode;
    }
  
}
class Joypad extends Component {
   // state = { keysCodes:[48,49,50,51,52,53,54,55,56,57,65,66,67,68,69,70] }

    constructor(props){
       
        super(props);
        this.pressedKey=undefined;
       // this.keyborad=props.bus.configurations.current.keyboard.current;
        
        this.keys=new Map();
        //this.config();
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
        return this.keyboard.getKeyCode(keyIndex);
    }
    handleKeyCodeChanged=(event)=>{
        const oldKeyCode=event.detail.oldKeyCode;
        const newKeyCode=event.detail.newKeyCode;
        this.keys.delete(oldKeyCode);
        this.keys.set(newKeyCode,new Key(newKeyCode));
    }
    config=()=>{
        let keyboard=document.getElementById("keyboard");
        keyboard.addEventListener("keyCodeChangedEvent", this.handleKeyCodeChanged, false);
        //this.keyboard=this.props.bus.configurations.configurations.current.keyboard.current;
        /*for(let keyCode of this.state.keysCodes){
            this.keys.set(keyCode,new Key(keyCode));
        }*/
        this.keyboard=this.props.bus.configurations.current.keyboard.current;
        const keysCodes=this.keyboard.getKeysCodes();//[...this.keyboard.state.keysCodes];
        for(let keyCode of keysCodes){
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
    let keyCode=event.keyCode;
    if(!this.keys.has(keyCode))
    return;
    this.keys.get(keyCode).pressed=false;
}
// componentWillMount deprecated in React 16.3
componentDidMount(){
    this.config();
    //BannerDataStore.addChangeListener(this._onchange);
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
    
}


componentWillUnmount() {
    //BannerDataStore.removeChangeListener(this._onchange);
    document.removeEventListener("keydown", this.handleKeyDown);
    document.removeEventListener("keyup", this.handleKeyUp);
    let keyboard=document.getElementById("keyboard");
    keyboard.removeEventListener("keyCodeChangedEvent", this.handleKeyCodeChanged);

}
    render() { 
        return ( <div id="joypad" tabIndex="0">

        </div> );
    }
}
 
export default Joypad;