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
    }else{
        this.props.bus.setPaused(false)
    }
  };
  render() {
    return (
      <div>
        <input
          id="fileInput"
          onClick={() => {
            this.props.bus.setPaused(true);
            console.log("paused!")
          }}
          onChange={this.handleInputFileChange}
          type="file"
          accept=".ch8"
        />
      </div>
    );
  }
}

export default OpenFileDialog;
