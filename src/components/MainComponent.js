import React, { Component } from 'react';
import {Card, CardBody} from 'reactstrap';
import {HashLoader} from 'react-spinners';
const Loading = (props) => {
	return (
		<div style={{height:"100vh"}} className="d-flex align-items-center justify-content-center">
			<HashLoader
				size="50"
				color={props.color}
			/>
		</div>
	);
};

class Main extends Component {

	constructor(props) {
	  super(props);
	  this.state = {
	  	quotes: [],
	  	quote: '',
	  	author: '',
			themes: []
	  };
	  this.fetchRandomQuote = this.fetchRandomQuote.bind(this);
	}

	fetchRandomQuote(){
		let index = parseInt(Math.random()*this.state.quotes.length);
		if(this.state.quotes){
			this.setState({
				quote: this.state.quotes[index].quote,
				author: this.state.quotes[index].author
			});
		}
		this.changeTheme();
	}

	changeTheme(){
		let index = parseInt(Math.random()*this.state.themes.length);
		this.setState({
			backgroundColor: this.state.themes[index].light,
			color: this.state.themes[index].dark
		});
	}

	componentDidMount(){
		const lightColors = ["#FFCDD2", "#F8BBD0", "#E1BEE7",
			"#D1C4E9", "#BBDEFB", "#B2EBF2",
			"#C8E6C9", "#DCEDC8", "#FFF9C4",
			"#FFE0B2", "#FFCCBC", "#D7CCC8",
			"#F5F5F5", "#CFD8DC"
		];
		const darkColors = ["#B71C1C", "#880E4F", "#4A148C",
			"#311B92", "#0D47A1", "#006064",
			"#1B5E20", "#33691E", "#F57F17",
			"#E65100", "#BF360C", "#3E2723",
			"#212121", "#263238"
		];
		let themes = [];
		for(let i=0; i<lightColors.length; i++){
			themes.push({
				light: lightColors[i],
				dark: darkColors[i]
			});
		}
		this.setState({themes: themes},()=>{
			this.changeTheme();
		});
		setTimeout(
			() => {
				fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
				.then(response => response.json())
				.then(response => {
					this.setState({quotes: response.quotes});
					this.fetchRandomQuote();
				})
				.catch(error => console.log("Fetch Quotes Failed", error));
			}, 2000
		)

	}
	render(){
		if(!this.state.quotes.length){
			return <Loading color={this.state.color}/>;
		}else{
			return (
				<div className="d-flex flex-column align-content-stretch">
					<div id="main" className="d-flex align-items-center justify-content-center" style={{backgroundColor: this.state.backgroundColor}}>
					<Card id="quote-box" style={{border: "1px solid " + this.state.color, borderRadius: "10px"}}>
						<CardBody color="white">
							<div className="d-flex flex-column align-items-stretch justify-content-center">
								<div className="d-flex">
									<p className="h1 mb-4 text-justify" id="text" style={{color: this.state.color}}>
										<span className="fa fa-quote-left">{''}</span>
										{' ' + this.state.quote + ' '}
										<span className="fa fa-quote-right">{''}</span>
									</p>
								</div>
								<div className="d-flex flex-row justify-content-end">
									<p id="author" className="h3 text-right lead font-weight-bold font-italic" style={{color: this.state.color}}>{'- ' + this.state.author}</p>
								</div>
								<div className="d-flex flex-row align-items-center justify-content-between mt-3">
									<a
										href={"https://twitter.com/intent/tweet?text="+encodeURI(this.state.quote + '\n- ' + this.state.author)}
										className="btn p-lg-2"
										id="tweet-quote"
										style={{backgroundColor: this.state.color, color: this.state.backgroundColor}}
									>
										<span className="fa fa-2x fa-twitter">{''}</span>
									</a>
									<button
										style={{backgroundColor: this.state.color, color: this.state.backgroundColor}}
										className="btn px-lg-3"
										id="new-quote"
										onClick={this.fetchRandomQuote}
									>
										<span className="fa fa-lg fa-plus">{''}</span>
										{'  New Quote'}
									</button>
								</div>
							</div>
						</CardBody>
					</Card>
				</div>
					<footer className="container">
						<div className="row p-3">
							<div className="col">
								<p className="text-center lead">Created with <span className="fa fa-heart" style={{color: "red"}}>{''}</span> by Lalit Jain</p>
							</div>
						</div>
					</footer>
				</div>
			);
		}

	}
}

export default Main;