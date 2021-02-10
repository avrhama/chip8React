import React, { Component } from "react";


class DisplayConfig extends Component {
  state = { currPixelShape: "circle",pixelSize:10,pixelPadding:1,monochromes : ["#000000", "#FFFFFF"] };
  constructor() {
    super();
     //this.pixelSize= 10;
    //this.monochromes = ["#000000", "#FFFFFF"];
    //this.monochromes = Object.freeze({ Black: "#000000", White: "#FFFFFF" });
  }
  getMonochromes = () => {
    const monochromes = [...this.state.monochromes];
    return monochromes;
  };
  getCurrPixelShape=()=>{
      return this.state.currPixelShape;
  }
  getDisplayConfig=()=>{
    const monochromes=this.getMonochromes();
    console.log(monochromes);
    const configs={currPixelShape:this.state.currPixelShape, pixelSize:this.state.pixelSize,pixelPadding:this.state.pixelPadding,monochromes:monochromes};
return configs;
  }
  displayConfigsChanged = () => {
      console.log("fire pixel changed")
      
    var keyCodeChangedEvent = new CustomEvent("configsChangedEvent");
    let displayConfig = document.getElementById("displayConfig");
    displayConfig.dispatchEvent(keyCodeChangedEvent);
  };
  handlePixelShapeSelected = (select) => {
    const currPixelShape = select.target.value;
    if (currPixelShape !== this.state.currPixelShape) {
      this.setState({ currPixelShape }, this.displayConfigsChanged);
    }
  };
  changePixelSize=(step)=>{
    const pixelSize=this.state.pixelSize+step;
    if(pixelSize>0){
      this.setState({ pixelSize }, this.displayConfigsChanged);
    }
  }
  changePixelPadding=(step)=>{
    const pixelPadding=this.state.pixelPadding+step;
    if(pixelPadding>0){
      this.setState({ pixelPadding }, this.displayConfigsChanged);
    }
  }
  /*
  not used, but useful.
 UrlExists(url)
{
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}*/
  pixelChanged=(colorPicker,monochromeColorIndex)=>{
      const color=colorPicker.value;
      if(color!=this.state.monochromes[0]&&color!=this.state.monochromes[1]){
        colorPicker.value=color;
        const monochromes=[...this.state.monochromes];
        monochromes[monochromeColorIndex]=color;
        console.log(color,monochromeColorIndex)
        this.setState({monochromes},this.displayConfigsChanged);
      }
  }
  render() {
    return (
      <div id="displayConfig">
        <h3>Display Configurations</h3>
        <label>select pixel shape:</label>
        <select
          id="pixelShapeSelect"
          onChange={(s) => {
            this.handlePixelShapeSelected(s);
          }}
        >
          <option value="circle">Circle</option>
          <option value="rectangle">Rectangle</option>
        </select>
        <span>
        Pixel Size:
        <button onClick={()=>{this.changePixelSize(1)}} className="btn btn-light btn-sm m-2">+</button>
        <span  className="badge badge-primary">{this.state.pixelSize}</span>
        <button onClick={()=>{this.changePixelSize(-1)}} className="btn btn-light btn-sm m-2">-</button>
        </span>
        <span>
        Pixel Padding:
        <button onClick={()=>{this.changePixelPadding(1)}} className="btn btn-light btn-sm m-2">+</button>
        <span className="badge badge-primary">{this.state.pixelPadding}</span>
        <button onClick={()=>{this.changePixelPadding(-1)}} className="btn btn-light btn-sm m-2">-</button>
        </span>
        <input onChange={e => this.pixelChanged(e.target,0)} type="color" name="head" id="blackColor" value={this.state.monochromes[0]}/>
        <input onChange={e => this.pixelChanged(e.target,1)} type="color" id="whiteColor"  value={this.state.monochromes[1]}/>

      </div>
    );
  }
}

export default DisplayConfig;
