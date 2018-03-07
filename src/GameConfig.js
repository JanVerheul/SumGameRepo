import React from 'react';
import GameButton from './GameButton';
import BlackCadre from './BlackCadre';
import RestrictedMovesDialog from './RestrictedMovesDialog';

import * as Util from './Util';

class GameConfig extends React.Component {

	state = {
		boardSize: 'rad3x1',
		valueColors: false,
		playingHints: false,
		noNegatives: false,
		restrictedMoves: false,
		addInc: false,
		subDec: false,
		valuePool: 'radFixed1000'
	};

	onStartGame = (evt) => {
		this.props.onStartGame(this.state);
	};

	// Kan weg hier???
	mapBoardSize = (boardSize) => {
		switch (boardSize) {
			case 'rad2x1': return { h: 2, v: 1 };
			case 'rad2x3': return { h: 2, v: 3 };
			case 'rad3x1': return { h: 3, v: 1 };
			case 'rad3x3': return { h: 3, v: 3 };
			case 'rad4x1': return { h: 4, v: 1 };
			case 'rad4x3': return { h: 4, v: 3 };
			case 'rad5x1': return { h: 5, v: 1 };
			case 'rad5x3': return { h: 5, v: 3 };
			default: return { h: 0, v: 0 };
		}
	};

	onChangeRadBs = (evt) => (this.setState({ boardSize: evt.target.id }));

	onChangeChGp = (evt) => {
		if (evt.target.name === 'ch-value-colors') {
			this.setState({ valueColors: evt.target.checked });
		}
		else if (evt.target.name === 'ch-playing-hints') {
			if (evt.target.checked) {
				this.setState({ playingHints: true, noNegatives: false, restrictedMoves: false });
			}
		}
		else if (evt.target.name === 'ch-no-negatives') {
			if (evt.target.checked) {
				this.setState({ noNegatives: true, playingHints: false });
			}
		}
		else if (evt.target.name === 'ch-restricted-moves') {
			if (evt.target.checked) {
				this.setState({ restrictedMoves: true, playingHints: false });
			}
		}
	};

	onChangeRadVp = (evt) => (this.setState({ valuePool: evt.target.id }));

	handleRestrictedMoves = (stateChange) => (this.setState(stateChange));

	componentDidMount() {
	}

	render() {
		const rootStyle = {
			textAlign: 'center'
		}
		const radBsStyle = {
			width: 146,
			fontSize: 22,
			display: 'inline-block'
		};
		const radVpStyle = {
			width: 246,
			fontSize: 22,
			textAlign: 'left',
			marginLeft: 30,
			display: 'inline-block'
		};
		const configDifficultyChecksStyle = {
			textAlign: 'left',
			marginLeft: 45
		};
		const chDivStyle = {
			width: 268,
			fontSize: '18pt',
			display: 'inline-block'
		};
		const hSeparatorStyle = {
			width: 250,
			height: 10
		}
		return (
			<div style={rootStyle}>
				<BlackCadre width={436} borderWidth={15} padding={10} title='Game Configuration'>
					<div>
						<BlackCadre width={350} borderWidth={15} title='Board Size' >
							<div>
								<div style={hSeparatorStyle} />
								<div style={radBsStyle} >
									<input id='rad2x1' type='radio' name='rg-bs' defaultChecked={this.state.boardSize === 'rad2x1'} onChange={this.onChangeRadBs} />
									<label><b>&nbsp; 2 x 1</b></label>
								</div>
								<div style={radBsStyle} >
									<input id='rad2x3' type='radio' name='rg-bs' defaultChecked={this.state.boardSize === 'rad2x3'} onChange={this.onChangeRadBs} />
									<label><b>&nbsp; 2 x 3</b></label>
								</div>
								<div style={radBsStyle} >
									<input id='rad3x1' type='radio' name='rg-bs' defaultChecked={this.state.boardSize === 'rad3x1'} onChange={this.onChangeRadBs} />
									<label><b>&nbsp; 3 x 1</b></label>
								</div>
								<div style={radBsStyle} >
									<input id='rad3x3' type='radio' name='rg-bs' defaultChecked={this.state.boardSize === 'rad3x3'} onChange={this.onChangeRadBs} />
									<label><b>&nbsp; 3 x 3</b></label>
								</div>
								<div style={radBsStyle} >
									<input id='rad4x1' type='radio' name='rg-bs' defaultChecked={this.state.boardSize === 'rad4x1'} onChange={this.onChangeRadBs} />
									<label><b>&nbsp; 4 x 1</b></label>
								</div>
								<div style={radBsStyle} >
									<input id='rad4x3' type='radio' name='rg-bs' defaultChecked={this.state.boardSize === 'rad4x3'} onChange={this.onChangeRadBs} />
									<label><b>&nbsp; 4 x 3</b></label>
								</div>
								<div style={radBsStyle} >
									<input id='rad5x1' type='radio' name='rg-bs' defaultChecked={this.state.boardSize === 'rad5x1'} onChange={this.onChangeRadBs} />
									<label><b>&nbsp; 5 x 1</b></label>
								</div>
								<div style={radBsStyle} >
									<input id='rad5x3' type='radio' name='rg-bs' defaultChecked={this.state.boardSize === 'rad5x3'} onChange={this.onChangeRadBs} />
									<label><b>&nbsp; 5 x 3</b></label>
								</div>
								<div style={hSeparatorStyle} />
							</div>
						</BlackCadre>
						<div style={hSeparatorStyle} />
						<BlackCadre width={350} borderWidth={15} padding={10} title='Game Parameters' >
							<div style={configDifficultyChecksStyle} >
								<div style={chDivStyle} >
									<input type='checkbox' name='ch-value-colors' checked={this.state.valueColors} onChange={this.onChangeChGp} />
									<label><b>&nbsp; Cell Valued Colors</b></label>
								</div>
								<div style={chDivStyle} >
									<input type='checkbox' name='ch-playing-hints' checked={this.state.playingHints} onChange={this.onChangeChGp} />
									<label><b>&nbsp; Playing Hints</b></label>
								</div>
								<div style={chDivStyle} >
									<input type='checkbox' name='ch-no-negatives' checked={this.state.noNegatives} onChange={this.onChangeChGp} />
									<label><b>&nbsp; No Negatives</b></label>
								</div>
								<div style={chDivStyle} >
									<input type='checkbox' name='ch-restricted-moves' checked={this.state.restrictedMoves} onChange={this.onChangeChGp} />
									<label><b>&nbsp; Restricted Moves</b></label>
								</div>
								{ ( this.state.restrictedMoves ? <RestrictedMovesDialog handleRestrictedMoves={this.handleRestrictedMoves}/> : <span /> ) }
							</div>
						</BlackCadre>
						<div style={hSeparatorStyle} />
						<BlackCadre width={350} borderWidth={15} padding={10} title='Value Pool' >
						<div>
							<div style={hSeparatorStyle} />
							<div style={radVpStyle} >
								<input id='radFixed10' type='radio' name='rg-vp' defaultChecked={this.state.valuePool === 'radFixed10'} onChange={this.onChangeRadVp} />
								<label><b>&nbsp; Fixed 10</b></label>
							</div>
							<div style={radVpStyle} >
								<input id='radFixed100' type='radio' name='rg-vp' defaultChecked={this.state.valuePool === 'radFixed100'} onChange={this.onChangeRadVp} />
								<label><b>&nbsp; Fixed 100</b></label>
							</div>
							<div style={radVpStyle} >
								<input id='radFixed1000' type='radio' name='rg-vp' defaultChecked={this.state.valuePool === 'radFixed1000'} onChange={this.onChangeRadVp} />
								<label><b>&nbsp; Fixed 1000</b></label>
							</div>
							<div style={radVpStyle} >
								<input id='radFixed10000' type='radio' name='rg-vp' defaultChecked={this.state.valuePool === 'radFixed10000'} onChange={this.onChangeRadVp} />
								<label><b>&nbsp; Fixed 10000</b></label>
							</div>
							<div style={radVpStyle} >
								<input id='radRand1_10' type='radio' name='rg-vp' defaultChecked={this.state.valuePool === 'radRand1_10'} onChange={this.onChangeRadVp} />
								<label><b>&nbsp; Random 1...10</b></label>
							</div>
							<div style={radVpStyle} >
								<input id='radRand-10_10' type='radio' name='rg-vp' defaultChecked={this.state.valuePool === 'radRand-10_10'} onChange={this.onChangeRadVp} />
								<label><b>&nbsp; Random -10...10</b></label>
							</div>
							<div style={radVpStyle} >
								<input id='radRand-100_100' type='radio' name='rg-vp' defaultChecked={this.state.valuePool === 'radRand-100_100'} onChange={this.onChangeRadVp} />
								<label><b>&nbsp; Random -100...100</b></label>
							</div>
							<div style={radVpStyle} >
								<input id='radRand-1000_1000' type='radio' name='rg-vp' defaultChecked={this.state.valuePool === 'radRand-1000_1000'} onChange={this.onChangeRadVp} />
								<label><b>&nbsp; Random -1000...1000</b></label>
							</div>
						</div>
						</BlackCadre>
						<div style={hSeparatorStyle} />
						<GameButton click={this.onStartGame} width={350} radius={10}>Start Game</GameButton>
					</div>
				</BlackCadre>
			</div>
		);
	}
}

export default GameConfig;
