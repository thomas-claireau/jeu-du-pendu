import React, { Component } from 'react';
import faker from 'faker';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.test();
	}

	test() {
		faker.locale = 'fr';
		console.log(faker.random.word());
	}

	computeDisplay(phrase, usedLetters) {
		return phrase.replace(/\w/g, (letter) => (usedLetters.has(letter) ? letter : '_'));
	}

	render() {
		return <div className="App"></div>;
	}
}

export default App;
