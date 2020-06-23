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
			countTest: 0,
			limitTest: 15,
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
		return word.replace(/\w/g, (letter) => (usedLetters.has(letter) ? letter : '_'));
	}

	// autobind with react autobind library
	play(event) {
		const key = event.key.toUpperCase();

		if (/^[A-Z]+$/.test(key) && key.length === 1 && !this.state.lose && !this.state.win) {
			this.setState((prevState) => ({ usedLetters: prevState.usedLetters.add(key) }));
			this.setState((prevState) => ({ countTest: prevState.countTest++ }));
		}

		this.setGameStatus();
	}

	generateLetters(word, usedLetters) {
		usedLetters = [...usedLetters];
		word = word.split('');

		return (
			<div className="letters">
				Lettres utilisées :
				{usedLetters.map((item, index) => {
					return (
						<span key={index} className={word.includes(item) ? 'success' : 'error'}>
							{item}
						</span>
					);
				})}
			</div>
		);
	}

	generateCount(count) {
		return <div className="count">Nombre de tentatives : {count}</div>;
	}

	generateLimit(limit) {
		return <div className="limit">Nombre d'essais max : {limit}</div>;
	}

	setGameStatus() {
		this.setState((prevState) => ({
			lose: prevState.countTest >= prevState.limitTest,
			win: !this.computeDisplay(prevState.word, prevState.usedLetters).includes('_'),
		}));
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
		const { word, usedLetters, limitTest, countTest } = this.state;
		const displayWord = this.computeDisplay(word, usedLetters);

		// this.generateLetters(usedLetters);

		return (
			<div className="App">
				{displayWord.split('').map((item, index) => {
					return <span key={index}>{item}</span>;
				})}
				{this.generateLetters(word, usedLetters)}
				{this.generateLimit(limitTest)}
				{this.generateCount(countTest)}

				{this.state.win && <div className="result">Gagné!</div>}
				{this.state.lose && <div className="result">Perdu!</div>}
			</div>
		);
	}
}

export default App;
