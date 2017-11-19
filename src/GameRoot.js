import React, { Component } from 'react';
import GameBoard from './GameBoard';
import GameConfig from './GameConfig';
import NameForm from './NameForm';
import HallOfFame from './HallOfFame';

class GameRoot extends React.Component {

	state = {
		boardSize: '',
		valueColors: false,
		playingHints: false,
		noNegatives: false,
		restrictedMoves: false,
		addInc: false,
		subDec: false,
		valuePool: '',
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

	mapBoardSize = (boardSizeId) => {
		switch (boardSizeId) {
			case 'rad2x1': return { bsH: 2, bsV: 1, boardType: 'line1d' };
			case 'rad2x3': return { bsH: 2, bsV: 3, boardType: 'line2d' };
			case 'rad3x1': return { bsH: 3, bsV: 1, boardType: 'line1d' };
			case 'rad3x3': return { bsH: 3, bsV: 3, boardType: 'line2d' };
			case 'rad4x1': return { bsH: 4, bsV: 1, boardType: 'line1d' };
			case 'rad4x3': return { bsH: 4, bsV: 3, boardType: 'line2d' };
			case 'rad5x1': return { bsH: 5, bsV: 1, boardType: 'line1d' };
			case 'rad5x3': return { bsH: 5, bsV: 3, boardType: 'line2d' };
			default: return { bsH: 0, bsV: 0, boardType: ''};
		}
	};

	mapValuePool = (poolId) => {
		switch (poolId) {
			case 'radRand1_10': return { lb: 1, ub: 10 };
			case 'radRand-10_10': return { lb: -10, ub: 10 };
			case 'radRand-100_100': return { lb: -100, ub: 100 };
			case 'radRand-1000_1000': return { lb: -1000, ub: 1000 };
			case 'radFixed10': return { lb: 10, ub: 10 };
			case 'radFixed100': return { lb: 100, ub: 100 };
			case 'radFixed1000': return { lb: 1000, ub: 1000};
			case 'radFixed10000': return { lb: 10000, ub: 10000};
			default: return { lb: 0, ub: 0 };
		}
	}

	mapBoardConfig = () => {
		return {
			valueColors: this.state.valueColors,
			playingHints: this.state.playingHints,
			noNegatives: this.state.noNegatives,
			restrictedMoves: this.state.restrictedMoves,
			valuePool: this.mapValuePool(this.state.valuePool)
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
					boardProperties={this.mapBoardSize(this.state.boardSize)}
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
