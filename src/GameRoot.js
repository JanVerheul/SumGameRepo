import React, { Component } from 'react';
import './App.css';

import GameBoard from './GameBoard';
import GameConfig from './GameConfig';
import NameForm from './NameForm';
import HallOfFame from './HallOfFame';

class GameRoot extends React.Component {

	state = {
		boardSize: '',
		crossConnections: false,
		noNegatives: false,
		playingHints: false,
		valueColors: false,
		inverseCalculationsDialog: false,
		gameState: 'config',
		hofList: []
	};

	onConfigGame = (changeObj) => {
		changeObj.gameState = 'config';
		this.setState(changeObj);
	};
	
	onStartGame = (changeObj) => {
		changeObj.gameState = 'playing';
		this.setState(changeObj);
	};

	onRestartGame = () => {
		this.setState({ gameState: 'playing' });
	};
	
	onGameOver = (changeObj) => {
		changeObj.gameState = 'entername';
		this.setState(changeObj);
	};
	
	onHallOfFame = (name) => {
		this.setState((state) => {
			const hofList = [...state.hofList, { name: name, date: Date.now(), moves: state.numMoves, time: state.playingTime }];
			this.setState({ hofList: hofList, gameState: 'halloffame' });
		});
	};

	mapBoardSize = () => {
		switch (this.state.boardSize) {
			case 'rad2x1': return { bsH: 2, bsV: 1, boardType: 'line1d' };
			case 'rad2x2': return { bsH: 2, bsV: 2, boardType: (this.state.crossConnections ? 'cross2d' : 'line2d') };
			case 'rad3x1': return { bsH: 3, bsV: 1, boardType: 'line1d' };
			case 'rad3x3': return { bsH: 3, bsV: 3, boardType: (this.state.crossConnections ? 'cross2d' : 'line2d') };
			case 'rad4x1': return { bsH: 4, bsV: 1, boardType: 'line1d' };
			case 'rad4x4': return { bsH: 4, bsV: 4, boardType: (this.state.crossConnections ? 'cross2d' : 'line2d') };
			case 'rad5x1': return { bsH: 5, bsV: 1, boardType: 'line1d' };
			case 'rad5x5': return { bsH: 5, bsV: 5, boardType: (this.state.crossConnections ? 'cross2d' : 'line2d') };
			default: return { bsH: 0, bsV: 0, boardType: ''};
		}
	};
	
	mapBoardConfig = () => {
		return {
			crossConnections: this.state.crossConnections,
			noNegatives: this.state.noNegatives,
			playingHints: this.state.playingHints,
			inverseCalculations: this.state.inverseCalculations,
			inverseCalculationsDialog: this.state.inverseCalculationsDialog
		};
	};
	
	render() {
		if (this.state.gameState === 'config') {
			return (
				<GameConfig onStartGame={this.onStartGame} />
			);
		}
		else if (this.state.gameState === 'playing') {
			return (
				<GameBoard
					boardProperties={this.mapBoardSize()}
					boardConfig={this.mapBoardConfig()}
					onGameOver={this.onGameOver}
					onStartGame={this.onStartGame}
					onRestartGame={this.onRestartGame}
					onConfigGame={this.onConfigGame}
				/>
			);
		}
		else if (this.state.gameState === 'entername') {
			return (
				<NameForm
					onHallOfFame={this.onHallOfFame}
				/>
			);
		}
		else if (this.state.gameState === 'halloffame') {
			return (
				<HallOfFame hofList={this.state.hofList} anotherGame={this.onRestartGame} differentGame={this.onConfigGame} />
			);
		}
	}
}

export default GameRoot;
