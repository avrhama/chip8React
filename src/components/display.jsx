import React, { Component } from "react";
class Display extends Component {
  state = { pixelSize: 10, pixelPadding: 1 };
  constructor() {
    super();
    this.pixels = [];
    this.width = 64;
    this.height = 32;
    this.canvas = React.createRef();
  }
  loadConfigs(callback){
    const displayConfig=this.props.configurations.current.displayConfig
   const configs=displayConfig.getDisplayConfig();
   this.currPixelShape=configs.currPixelShape;
   this.monochromes=configs.monochromes;
   this.setState({pixelSize:configs.pixelSize,pixelPadding:configs.pixelPadding},callback);
  }
  redrawDisplay=()=>{
    const context = this.canvas.current.getContext('2d');
    context.clearRect(0, 0, this.canvas.current.width, this.canvas.current.height);
    this.drawPixels(true);
  }
  handleDisplayConfigChanged=()=>{
    this.loadConfigs(this.redrawDisplay);
  }


  config = () => {
    /*const displayConfig=this.props.configurations.current.displayConfig
   const monochromes= displayConfig.getMonochromes();
   this.monochromes={Black: monochromes[0], White:monochromes[1]}
   this.currPixelShape=displayConfig.getCurrPixelShape();*/
   this.loadConfigs();
   
    let size = this.width * this.height;
    this.pixels = [];
    for (let i = 0; i < size; i++) {
      this.pixels.push({ colorIndex: 0, colorChanged: true });
    }

  };
  clear = () => {
    let size = this.width * this.height;
    for (let i = 0; i < size; i++) {
      this.pixels[i] = { colorIndex: 0, colorChanged: true };
    }
    this.drawPixels();
  };
  componentDidMount() {
    let displayConfig=document.getElementById("displayConfig");
    displayConfig.addEventListener("configsChangedEvent", this.handleDisplayConfigChanged, false);
    this.config();
    this.drawPixels();

  }
  componentWillUnmount() {
    let displayConfig=document.getElementById("displayConfig");
    displayConfig.removeEventListener("configsChangedEvent", this.handleDisplayConfigChanged);

  }

  drawPixels = (force=false) => {
    for (let i = 0; i < this.pixels.length; i++) {
      let x = i % this.width;
      let y = Math.floor(i / this.width);
      if (this.pixels[i].colorChanged||force) {
        this.drawPixel(x, y,this.pixels[i].colorIndex);
        this.pixels[i].colorChanged = false;
      }
    }
  };
  drawPixel = (x, y, colorIndex) => {
    
    const ctx = this.canvas.current.getContext("2d");
    const { pixelPadding, pixelSize } = this.state;
    let radius = Math.floor(pixelSize / 2);
    
    ctx.fillStyle = this.monochromes[colorIndex];
    ctx.beginPath();
    if(this.currPixelShape==="circle"){
    ctx.arc(
      (pixelSize + pixelPadding) * x + radius,
      (pixelSize + pixelPadding) * y + radius,
      radius,
      0,
      2 * Math.PI
    );
   
  }else if(this.currPixelShape==="rectangle"){
    ctx.rect((pixelSize + pixelPadding) * x, (pixelSize + pixelPadding) * y, pixelSize, pixelSize);
  }
  ctx.fill();
    ctx.closePath();
    // ctx.stroke();
  };
  setPixel = (x, y, colorIndex) => {
    let index = this.width * y + x;
    this.pixels[index].colorIndex = colorIndex;
    this.pixels[index].colorChanged = true;
  };
  getPixel = (x, y) => {
    let index = this.width * y + x;
    return this.pixels[index];
  };
  render() {
    const { pixelPadding, pixelSize } = this.state;
    return (
      <div style={{ float: "left" }}>
        <canvas
          ref={this.canvas}
          width={(pixelSize + pixelPadding) * (this.width + 1)}
          height={(pixelSize + pixelPadding) * (this.height + 1)}
        />
      </div>
    );
  }
}
export default Display;
