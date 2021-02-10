import React, { Component } from "react";
import OpenFileDialog from "./openFileDialog";
import Ram from "./ram";
import Cpu from "./cpu";
import Joypad from "./joypad";
import Display from "./display";
import Configurations from "./configurations";
class Bus extends Component {
  state = {};
  constructor() {
    super();
    this.configurations = React.createRef();
    this.paused = false;
    this.ram = new Ram(this);
    this.cpu = new Cpu(this);
    this.joypad = React.createRef();
    this.display = React.createRef();
   
    
    var getUrl = window.location;
    var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
    const fileUrl=baseUrl+'/beep.wav';
    this.apu = new Audio(fileUrl);
  }
  setPaused=(paused)=>{
    this.paused=paused;
  }
  execute = () => {
    if (this.paused) return;
    let oPTT = 10;
    let oPTTCounter = 0;
    while (oPTTCounter < oPTT) {
      this.cpu.execute();
      oPTTCounter++;
    }

    this.cpu.dt.tick();
    this.cpu.st.tick();
    this.display.current.drawPixels();
    if (this.cpu.st.value > 0) {
      this.apu.play();
    }
  };
  turnOn = () => {
    this.paused=false;
    this.cpu.restart();
    this.display.current.clear();
    clearInterval(this.executeTimer);
    this.executeTimer = setInterval(this.execute, 16);
  };
  turnOff = () => {
    clearInterval(this.executeTimer);
  };
  componentWillUnmount() {
    console.log(this.executeTimer);
  }

  ramLoaded = () => {
    this.turnOn();
  };
  
  render() {
    return (
      <React.Fragment>
        <div>
          <Configurations ref={this.configurations} />
          <OpenFileDialog onFileLoaded={this.ram.loadRam} bus={this}/>
          <Display ref={this.display} configurations={this.configurations} style={{float: "left"}}/>
          <Joypad ref={this.joypad} bus={this} />
        </div>
      </React.Fragment>
    );
  }
}

export default Bus;
