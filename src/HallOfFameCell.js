import React, { Component } from 'react';
import './App.css';
import GameButton from './GameButton';

class HallOfFameCell extends React.Component {

	render() {
		const cellStyle = {
			width: 660,
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
				<GameButton width={295} click={this.props.sortMoves} > Sort On Moves </GameButton>
				<GameButton width={295} click={this.props.sortTime} > Sort On Time </GameButton>
				<GameButton width={295} click={this.props.anotherGame} > Another Game </GameButton>
				<GameButton width={295} click={this.props.differentGame} > Different Game </GameButton>
			</div>
		);
	}
}

export default HallOfFameCell;
