import React, { Component } from 'react';
import GameCell from './GameCell';
import ScoreCell from './ScoreCell';
import DialogCell from './DialogCell';
import GameOverCell from './GameOverCell';
import * as Util from './Util';
import './App.css';

class GameBoard extends React.Component {

	state = { cells: [], numMoves: 0, playingTime: 0, gameOver: false, inverseCalculations: false, hint: {} };

	componentDidMount = () => (this.startNewGame());

	componentWillUnmount = () => (clearInterval(this.timerInterval));

	handleClockTick = () => (this.setState({ playingTime: this.state.playingTime + 1 }));

	handleSumCommand = (cellIndex, direction) => {
		const boardProps = this.props.boardProperties;
		const boardConfig = this.props.boardConfig;
		const boardSize = this.props.boardSize;
		const nextCells = JSON.parse(JSON.stringify(this.state.cells));
		const changeDesc = Util.computeChangeDesc(boardProps.bsH, boardProps.boardType, cellIndex, direction);
		const oldVal = nextCells[cellIndex];
		const newVal = oldVal + changeDesc.factor;
		const numToChange = changeDesc.cells.length;
		nextCells[cellIndex] = newVal;
		for (let i = 0; i < numToChange; i++) {
			const nextValue = nextCells[changeDesc.cells[i]] + (changeDesc.order === 'A' ? newVal : oldVal) * changeDesc.factor;
			nextCells[changeDesc.cells[i]] = nextValue;
		}
		const hint = (boardConfig.playingHints ? Util.calcHint(nextCells, boardProps.bsH, boardProps.boardType) : {});
		this.setState({
			cells: nextCells,
			numMoves: this.state.numMoves + 1,
			hint: hint
		});
		const allZero = Util.foldl(nextCells, (accu, cell) => (accu && (cell == 0)), true);
		if (allZero) {
			clearInterval(this.timerInterval);
			this.setState({ gameOver: true });
		}
	}

	handleAnotherGame = () => {
		this.props.onRestartGame({});
		this.startNewGame();
	};

	handleADifferentGame = () => { this.props.onConfigGame({}); };

	handleRegisterScore = () => { this.props.onGameOver({ numMoves: this.state.numMoves, playingTime: this.state.playingTime }); };

	startNewGame = () => {
		const boardProps = this.props.boardProperties;
		const boardConfig = this.props.boardConfig;
		const cells = Util.generateCells(boardProps.bsH * boardProps.bsV)
		const hint = (boardConfig.playingHints ? Util.calcHint(cells, boardProps.bsH, boardProps.boardType) : {});
		this.setState({ cells: cells, numMoves: 0, playingTime: 0, gameOver: false, hint: hint });
		this.timerInterval = setInterval(() => this.handleClockTick(), 1000);
	};

	handleChangeInverse = (val) => {
		this.setState({ inverseCalculations: val })
	};

	render() {
		const boardProps = this.props.boardProperties;
		const boardConfig = this.props.boardConfig;
		const boardSizePixH = 16 + boardProps.bsH * 196;
		const boardSizePixV = 136 + boardProps.bsV * 196;
		const boardStyle = {
			textAlign: 'center',
			width: boardSizePixH,
			padding: 5,
			borderStyle: 'solid',
			borderRadius: 15,
			borderWidth: 'medium',
			backgroundColor: 'black',
			display: 'inline-block'
		};
		const boardRootStyle = {
			textAlign: 'center',
		};
		const cells = this.state.cells;
		let cellComponents = cells.map((cellValue, index) => (
			<GameCell
				key={'product-' + index}
				id={index}
				value={cellValue}
				hint={this.state.hint}
				gameOver={this.state.gameOver}
				type={boardProps.boardType}
				valueColors={boardConfig.valueColors}
				handleClick={this.handleSumCommand}
			/>
		));
		cellComponents.push(<ScoreCell title='Moves:' score={this.state.numMoves} />);
		cellComponents.push(<ScoreCell title='Time:' score={Util.formatPlayingTime(this.state.playingTime)} />);
		if (boardConfig.inverseCalculationsDialog) {
			cellComponents.push(<DialogCell title='Inverse:' handleChangeInverse={this.handleChangeInverse} />);
		}
		if (this.state.gameOver) {
			cellComponents.push(<br/>);
			cellComponents.push(<GameOverCell anotherGame={this.handleAnotherGame} aDifferentGame={this.handleADifferentGame} registerScore={this.handleRegisterScore} />)
		}
		return (
			<div style={boardRootStyle} >
				<div style={boardStyle} >
					{cellComponents}
				</div>
			</div>
		);
	}
}

export default GameBoard;
