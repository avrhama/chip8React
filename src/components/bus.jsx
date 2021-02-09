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
    this.paused = false;
    this.ram = new Ram(this);
    //this.opcodes=new Opcodes(this);
    //this.opcodes.opcodes.get('0.0').operation()
    this.cpu = new Cpu(this);
    this.joypad = React.createRef();
    this.display = React.createRef();
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
      console.log("Make Noise!");
    }
  };
  turnOn = () => {
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
          <OpenFileDialog onFileLoaded={this.ram.loadRam} />
          <Display ref={this.display} style={{float: "left"}}/>
          <Configurations />
          <Joypad ref={this.joypad} bus={this} />
        </div>
      </React.Fragment>
    );
  }
}

export default Bus;
