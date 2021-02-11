import React, { Component } from "react";

class OpenFileDialog extends Component {
  updateText = (newText) => {
    this.setState({ textValue: newText });
  };
  handleInputFileChange = (event) => {
    const fileInput = event.target;

    if (fileInput.files.length > 0) {

      document.title = fileInput.files[0].name;

      var fr = new FileReader();
      fr.readAsArrayBuffer(fileInput.files[0]);
     fileInput.value="";
      fr.onload = (event) => {
        this.props.onFileLoaded(fr.result);
      };
    }
  };
  render() {
    return (
    
      <div>
        
       
        <input
          id="fileInput"
          ref={(fileInput)=>{this.fileInput=fileInput}}
          hidden
          onClick={() => {
            this.props.bus.setPaused(true);
          }}
          onChange={this.handleInputFileChange}
          type="file"
          accept=".ch8"
        />
        <button type="button"
            className="btn btn-primary btn-sm" onClick={()=>{this.fileInput.click();}}>Open .CH8 File</button>
      </div>
     
    );
  }
}
export default OpenFileDialog;
