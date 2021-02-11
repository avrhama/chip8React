import React, { Component } from "react";
import OpenFileDialog from "./openFileDialog";
import Ram from "./ram";
import Cpu from "./cpu";
import Joypad from "./joypad";
import Display from "./display";
import Configurations from "./configurations";
class Bus extends Component {
  state = { paused: false, running: false };
  constructor() {
    super();
    this.configurations = React.createRef();
    this.ram = new Ram(this);
    this.cpu = new Cpu(this);
    this.joypad = React.createRef();
    this.display = React.createRef();

    var getUrl = window.location;
    var baseUrl =
      getUrl.protocol +
      "//" +
      getUrl.host +
      "/" +
      getUrl.pathname.split("/")[1];
    const fileUrl = baseUrl + "/beep.wav";
    this.apu = new Audio(fileUrl);
  }
  setPaused = (paused) => {
    this.setState({ paused });
  };
  execute = () => {
    if (this.state.paused) return;
    let oPTTCounter = 0;
    let oPTT = 10;
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
    this.setState({ paused: false, running: true });
    this.cpu.restart();
    this.display.current.clear();
    clearInterval(this.executeTimer);
    this.executeTimer = setInterval(this.execute, 16);
  };
  turnOff = () => {
    clearInterval(this.executeTimer);
  };
  componentWillUnmount() {
    this.turnOff();
  }

  ramLoaded = () => {
    this.turnOn();
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <p className="lead"><a href="https://en.wikipedia.org/wiki/CHIP-8" >CHIP-8 interpreter</a> written in React<br />
          <sub>Credits:<a href="https://www.youtube.com/channel/UCWv7vMbMWH4-V0ZXdmDpPBA">Programming with Mosh</a> for the <a href="https://youtu.be/Ke90Tje7VS0" >React tutorial</a></sub></p>
        </div>
        <div>
          <Configurations ref={this.configurations} />
          <OpenFileDialog onFileLoaded={this.ram.loadRam} bus={this} />
          <button
            type="button"
            className="btn btn-warning"
            disabled={!this.state.running}
            onClick={() => {
              this.setPaused(!this.state.paused);
            }}
          >
            {this.state.paused && this.state.running ? "Resume" : "Pause"}
          </button>
          <Display
            ref={this.display}
            configurations={this.configurations}
            style={{ float: "left" }}
          />
          <Joypad ref={this.joypad} bus={this} />
        </div>
      </React.Fragment>
    );
  }
}

export default Bus;
