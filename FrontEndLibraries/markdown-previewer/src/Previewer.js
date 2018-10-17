import React, {Component} from 'react';
let marked = require('marked');
marked.setOptions({
  breaks: true,
});
class Previewer extends Component{

  render(){
    return(
      <div id="preview-box" class="container">
        <div id="title-bar">net-browser 1.3</div>
        <div id="preview" dangerouslySetInnerHTML={{__html: marked(this.props.markdown)}}>
        </div>
      </div>
      
    );
  }
  
}

export default Previewer;