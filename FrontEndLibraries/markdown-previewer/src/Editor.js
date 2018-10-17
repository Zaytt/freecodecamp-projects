import React, {Component} from 'react';


class Editor extends Component{
  
  render(){
    return(
      <div id="editor-box" class="container">
        <div id="title-bar">mark-editor.exe</div>
        <div id="editor-container">
          <textarea id="editor" onChange={this.props.updateMarkdown} >
            {this.props.markdown}
          </textarea>
        </div>
      </div>
      
    );
  }
}

export default Editor;