import React, { Component } from 'react';

import './App.css';
import './semantic-dist/semantic.css';

import GameBoard from './GameBoard';
import GameConfig from './GameConfig';
import GameRoot from './GameRoot';

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">Connected Sums Game</h1>
				</header>
				<GameRoot />
			</div>
		);
	}
}

export default App;
