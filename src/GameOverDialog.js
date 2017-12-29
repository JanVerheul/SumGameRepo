import React from 'react';
import GameButton from './GameButton';

class GameOverDialog extends React.Component {

	render() {
		const fieldStyle = {
			width: 356,
			height: 40,
			margin: 5,
			padding: 6,
			fontSize: '22pt',
			borderRadius: 5,
			borderStyle: 'solid',
			borderWidth: 'medium',
			borderColor: 'black',
			textAlign: 'center',
			backgroundColor: 'white'
		};
		const cellStyle = {
			width: 382,
			margin: 5,
			padding: 5,
			borderStyle: 'solid',
			borderRadius: 10,
			borderWidth: 'medium',
			display: 'inline-block',
			backgroundColor: 'red'
		}
		return (
			<div style={cellStyle} >
				<div style={fieldStyle}>Game Over</div>
				<GameButton click={this.props.registerScore} width={356} > Register Score </GameButton>
				<GameButton click={this.props.anotherGame} width={356} > Another Game </GameButton>
				<GameButton click={this.props.differentGame} width={356} > Different Game </GameButton>
			</div>
		);
	}
}

export default GameOverDialog;
