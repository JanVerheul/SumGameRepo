import React, { Component } from 'react';
import './semantic-dist/semantic.css';
import GameRoot from './GameRoot';

class App extends Component {
	headerStyle = {
		textAlign: 'center'
	};
	hSeparatorStyle = {
		width: 250,
		height: 10
	};
	render() {
		return (
			<div className="App">
				<div style={this.hSeparatorStyle} />
				<GameRoot />
			</div>
		);
	}
}

export default App;
