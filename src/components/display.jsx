import React, { Component } from "react";
class Display extends Component {
  state = { pixelSize: 10, padding: 1 };
  constructor() {
    super();
    this.pixels = [];
    this.width = 64;
    this.height = 32;
    this.monochromes = Object.freeze({ Black: "#000000", White: "#FFFFFF" });
    this.canvas = React.createRef();

    this.config();
    //this.setPixel=this.setPixel;
  }
  config = () => {
    let size = this.width * this.height;
    this.pixels = [];
    for (let i = 0; i < size; i++) {
      this.pixels.push({ color: "#000000", colorChanged: true });
    }
    // this.state.pixels=pixels;
    //this.setState({pixels},this.drawPixels);
    //console.log(pixels.length);
  };
  clear = () => {
    let size = this.width * this.height;
    for (let i = 0; i < size; i++) {
      this.pixels[i] = { color: "#000000", colorChanged: true };
    }
    this.drawPixels();
  };
  componentDidMount() {
    //this.updateCanvas();
    this.drawPixels();
    //this.setPixel(0,0,"#c82124");
    // this.setPixel(1,0,"#c82124")
    // this.setPixel(2,0,"#c82124")
    // this.setPixel(0,1,"#c82124")
  }

  drawPixels = () => {
    // console.log(this.state.pixels.length);
    //return;
    for (let i = 0; i < this.pixels.length; i++) {
      let x = i % this.width;
      let y = Math.floor(i / this.width);
      if (this.pixels[i].colorChanged) {
        this.drawPixel(x, y, this.pixels[i].color);
        this.pixels[i].colorChanged = false;
      }
    }
  };
  drawPixel = (x, y, color) => {
    const ctx = this.canvas.current.getContext("2d");
    const { padding, pixelSize } = this.state;
    let radius = Math.floor(pixelSize / 2);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(
      (pixelSize + padding) * x + radius,
      (pixelSize + padding) * y + radius,
      radius,
      0,
      2 * Math.PI
    );
    ctx.fill();
    ctx.closePath();
    // ctx.stroke();
  };
  setPixel = (x, y, color) => {
    let index = this.width * y + x;
    this.pixels[index].color = color;
    this.pixels[index].colorChanged = true;
  };
  getPixel = (x, y) => {
    let index = this.width * y + x;
    return this.pixels[index];
  };
  render() {
    const { padding, pixelSize } = this.state;
    return (
      <div style={{ float: "left" }}>
        <canvas
          ref={this.canvas}
          width={(pixelSize + padding) * (this.width + 1)}
          height={(pixelSize + padding) * (this.height + 1)}
        />
      </div>
    );
  }
}
export default Display;
