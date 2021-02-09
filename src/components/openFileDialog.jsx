import React, { Component } from 'react';

class OpenFileDialog extends Component {
    
    updateText=(newText)=>{
        this.setState({textValue:newText});
    }
    handleInputFileChange=(event)=> {

    const fileInput=event.target;

      
       
        //if we didnd't already have the "fileInput" var in scope, we could use "event.target" to get it
        if(fileInput.files.length>=1) {
            //In this example, I'm putting the selected file's name in the title. You don't need to do this
            document.title = fileInput.files[0].name;
        }
         else {
           document.title = "FileReader Example";
        }

       var fr = new FileReader();
        fr.readAsArrayBuffer(fileInput.files[0]);
        fr.onload = (event)=> {
            this.props.onFileLoaded(fr.result);
        }
        
    }
    render() { 
        return ( 
        <div>
        <h1>File Reader Example:</h1>
        <input id="fileInput" onChange={this.handleInputFileChange} type="file" accept=".ch8"/>
        </div>
         );
    }
}
 
export default OpenFileDialog;
//        <textarea  name="File Editor" id="fileEditor" readOnly={true} placeholder="Your file's contents will show up here once you select the file!" value={this.state.textValue}></textarea>
