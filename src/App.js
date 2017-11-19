import React, { Component } from 'react';

import './semantic-dist/semantic.css';

import GameBoard from './GameBoard';
import GameConfig from './GameConfig';
import GameRoot from './GameRoot';

class App extends Component {
	headerStyle = {
		textAlign: 'center'
	};
	render() {
		return (
			<div className="App">
				<header style={this.headerStyle} >
					<h1>Connected Sums Game</h1>
				</header>
				<GameRoot />
			</div>
		);
	}
}

export default App;
