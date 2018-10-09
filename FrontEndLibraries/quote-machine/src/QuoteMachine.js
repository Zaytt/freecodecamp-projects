import React, { Component, Fragment } from 'react';


class QuoteMachine extends Component {
    constructor(){
        super();
        this.state = {
            quote: '',
            character: '',
            img: ''
        }
        this.END_POINT = 'https://thesimpsonsquoteapi.glitch.me/quotes';
        this.getRandomQuote();
    }
    getRandomQuote = (event) =>{
        fetch(this.END_POINT)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if(data){
                    this.setState({
                        quote: data[0].quote,
                        character: data[0].character,
                        img: data[0].image
                    });
                } else {
                    this.setState({
                       quote: "Error 404: No quote found.",
                       character: ''
                    
                    });
                }
              
        })
    }
    
    
    render(){
        return (
        <Fragment>
            <h1>Simpsons Quotes</h1>
            <div>
                <button className="btn btn-warning" id="new-quote" onClick={this.getRandomQuote}>New Quote</button>

                <a style={{ textDecoration: 'none' }} id="tweet-quote" href={'https://twitter.com/intent/tweet?text=' + "%27 " + this.state.quote + ' %27 - ' + this.state.character + ' %23simpsons %23quotes'} title="Tweet this quote!" target="_blank">
                    <h2 id="text" className = "box2 sb9 center-text">{this.state.quote}</h2>
                </a>
            </div>
            
            <img id="author" className="char-image"src={this.state.img} />
            
        </Fragment>
        )
    }
}

export default QuoteMachine;