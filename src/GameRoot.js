import React from 'react';
import GameBoard from './GameBoard';
import GameConfig from './GameConfig';
import NameForm from './NameForm';
import HallOfFame from './HallOfFame';
import BlackCadre from './BlackCadre';
import GameButton from './GameButton';
import { gameRulesEnglish, gameRulesDutch } from './GameRules';
//import { CalcTable } from './CalcTable';
import { minBy } from './Util';

class GameRoot extends React.Component {

	state = {
		boardSize: 0,
		valueColors: false,
		playingHints: false,
		noNegatives: false,
		restrictedMoves: false,
		moveDirs: 'addIncSubDec',
		valuePool: '',
		gameState: 'config',
		hofList: []
	};

	onConfigGame = (changeObj) => {
		changeObj.gameState = 'config';
		this.setState(changeObj);
	};

	onStartGame = (changeObj) => {
//console.log('onStartGame: ' + JSON.stringify(changeObj));
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

	onGameRules = (rulesLang) => {
		const myArray = [];
		myArray.length = 10;
		this.setState({ gameState: rulesLang });
	}

	mapBoardConfig = () => {
		return {
			valueColors: this.state.valueColors,
			playingHints: this.state.playingHints,
			noNegatives: this.state.noNegatives,
			restrictedMoves: this.state.restrictedMoves,
			moveDirs: this.state.moveDirs,
			valuePool: this.state.valuePool
		};
	};

	render() {
		const rootStyle = {
			textAlign: 'center',
        };
        const titleStyle = {
			fontSize: 36,
			fontWeight: 'bold',
		};
        const explanationButtonStyle = {
			display: 'inline-box',
			float: 'right'
		}
		const rulesStyle = {
			textAlign: 'left',
            fontSize: 18,
			display: 'inline-block',
		};
		if (this.state.gameState === 'config') {
			return (
				<GameConfig
					onStartGame={this.onStartGame}
					onGameRules={this.onGameRules}
				/>
			);
		}
		else if (this.state.gameState === 'playing') {
			return (
				<GameBoard
					boardSize={this.state.boardSize}
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
		else if (this.state.gameState === 'gameRulesEnglish') {
			return (
				<div style={rootStyle} >
	                <BlackCadre width={900} borderWidth={15} padding={10} title='Connected Sums Game &nbsp;&nbsp;&nbsp;&nbsp; Created by J.C. Verheul'>
	                    <div style={rulesStyle}>
	                        <p>
	                            <span style={titleStyle}>Playing Connected Sums Game</span>
	                            <span style={explanationButtonStyle}>
	                                <GameButton click={() => this.onConfigGame({})} width={140} radius={10}>Back</GameButton>
	                            </span>
	                            <span style={explanationButtonStyle}>
	                                <GameButton click={() => this.onGameRules('gameRulesDutch')} width={140} radius={10}>Dutch</GameButton>
	                            </span>
	                        </p>
							{gameRulesEnglish}
	        			</div>
	                </BlackCadre>
	            </div>
			);
		}
		else if (this.state.gameState === 'gameRulesDutch') {
			return (
				<div style={rootStyle} >
	                <BlackCadre width={900} borderWidth={15} padding={10} title='Connected Sums Game &nbsp;&nbsp;&nbsp;&nbsp; Created by J.C. Verheul'>
	                    <div style={rulesStyle}>
	                        <p>
	                            <span style={titleStyle}>Connected Sums Game Spelen</span>
	                            <span style={explanationButtonStyle}>
	                                <GameButton click={() => this.onConfigGame({})} width={140} radius={10}>Terug</GameButton>
	                            </span>
	                            <span style={explanationButtonStyle}>
	                                <GameButton click={() => this.onGameRules('gameRulesEnglish')} width={140} radius={10}>Engels</GameButton>
	                            </span>
	                        </p>
							{gameRulesDutch}
	        			</div>
	                </BlackCadre>
	            </div>
			);
		}
	}
}

export default GameRoot;
