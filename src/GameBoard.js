import React from 'react';
import BlackCadre from './BlackCadre';
import GameCell from './GameCell';
import ScoreCell from './ScoreCell';
import GameOverDialog from './GameOverDialog';
import { HintCalculator } from './HintCalculator';
import * as Util from './Util';

class GameBoard extends React.Component {

	state = { cells: [], numMoves: 0, playingTime: 0, gameOver: false, hint: {} };

	componentDidMount = () => (this.startNewGame());

	componentWillUnmount = () => (clearInterval(this.timerInterval));

	handleClockTick = () => (this.setState({ playingTime: this.state.playingTime + 1 }));

	handleSumCommand = (cellIndex, direction) => {
		const boardProps = this.props.boardProperties;
		const boardConfig = this.props.boardConfig;
		const nextCells = Util.computeChange(JSON.parse(JSON.stringify(this.state.cells)), cellIndex, direction);
		const hint = (boardConfig.playingHints ? this.hintCalculator.calcHint(nextCells) : {});
		this.setState({
			cells: nextCells,
			numMoves: this.state.numMoves + 1,
			hint: hint
		});
		const allZero = Util.foldl(nextCells, (accu, cell) => (accu && (cell === 0)), true);
		if (allZero) {
			clearInterval(this.timerInterval);
			this.setState({ gameOver: true });
		}
	}

	handleAnotherGame = () => {
		this.props.onRestartGame({});
		this.startNewGame();
	};

	handleDifferentGame = () => { this.props.onConfigGame({}); };

	handleRegisterScore = () => { this.props.onGameOver({ numMoves: this.state.numMoves, playingTime: this.state.playingTime }); };

	startNewGame = () => {
		const boardSize = this.props.boardSize;
		const boardConfig = this.props.boardConfig;
		const moveDirs = (boardConfig.restrictedMoves ? boardConfig.moveDirs : 'all');
		const cells = Util.generateCells(boardSize, boardConfig.valuePool, boardConfig.noNegatives);
		this.hintCalculator = new HintCalculator(boardSize, moveDirs);
		const hint = (boardConfig.playingHints ? this.hintCalculator.calcHint(cells) : {});
		this.setState({ cells: cells, numMoves: 0, playingTime: 0, gameOver: false, hint: hint });
		this.timerInterval = setInterval(() => this.handleClockTick(), 1000);
	};

	render() {
		const boardSize = this.props.boardSize;
		const boardConfig = this.props.boardConfig;
		const boardSizePixH = 16 + boardSize * 196;
		const cadreWidth = Math.max(600, boardSizePixH + 50);
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
		const negativesGuardList = Util.getNegativesGuardList(cells);
		let cellComponents = cells.map((cellValue, index) => (
			<GameCell
				key={'gameCell-' + index}
				id={index}
				value={cellValue}
				restrictedMoves={boardConfig.restrictedMoves}
				negativesGuard={boardConfig.noNegatives ? negativesGuardList[index] : {}}
				moveDirs={boardConfig.moveDirs}
				hint={this.state.hint}
				gameOver={this.state.gameOver}
				valueColors={boardConfig.valueColors}
				handleClick={this.handleSumCommand}
			/>
		));
		cellComponents.push(<ScoreCell key='scoreCellMoves' title='Moves:' score={this.state.numMoves} />);
		cellComponents.push(<ScoreCell key='scoreCellTime' title='Time:' score={Util.formatPlayingTime(this.state.playingTime)} />);
		if (this.state.gameOver) {
			cellComponents.push(<br key='break' />);
			cellComponents.push(<GameOverDialog key='gameOverDialog' anotherGame={this.handleAnotherGame} differentGame={this.handleDifferentGame} registerScore={this.handleRegisterScore} />)
		}
		return (
			<div style={boardRootStyle} >
				<BlackCadre width={cadreWidth} borderWidth={15} padding={10} title='Connected Sums Game &nbsp;&nbsp;&nbsp;&nbsp; Created by J.C. Verheul'>
					<div style={boardStyle} >
						{cellComponents}
					</div>
				</BlackCadre>
			</div>
		);
	}
}

export default GameBoard;
