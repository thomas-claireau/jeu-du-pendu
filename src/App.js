import React, { Component } from 'react';
import autoBind from 'react-autobind';
import faker from 'faker';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		autoBind(this, 'play');

		this.state = {
			word: this.filterWord(faker.random.word()),
			usedLetters: new Set(),
		};
	}

	filterWord(word) {
		return word
			.toUpperCase()
			.split('')
			.filter((item) => item.match(/^[A-Za-z]+$/))
			.join('');
	}

	computeDisplay(word, usedLetters) {
		console.log(word);
		console.log(usedLetters);
		return word.replace(/\w/g, (letter) => (usedLetters.has(letter) ? letter : '_'));
	}

	// autobind with react autobind
	play(event) {
		if (/[A-Za-z]/.test(event.key)) {
			this.setState((prevState) => prevState.usedLetters.add(event.key));
		}
	}

	// add event listener keydown
	componentDidMount() {
		document.addEventListener('keydown', this.play, false);
	}

	// remove event listener keydown
	componentWillUnmount() {
		document.removeEventListener('keydown', this.play, false);
	}

	render() {
		const { word, usedLetters } = this.state;
		const displayWord = this.computeDisplay(word, usedLetters);

		return (
			<div className="App">
				{displayWord.split('').map((item, index) => {
					if (item === '_') {
						return <span key={index}>{item}</span>;
					}

					return item;
				})}
			</div>
		);
	}
}

export default App;
