import React from 'react';
import GameButton from './GameButton';
import BlackCadre from './BlackCadre';
import RestrictedMovesDialog from './RestrictedMovesDialog';

class GameConfig extends React.Component {

	state = {
		boardSize: 'rad3x1',
		valueColors: false,
		playingHints: false,
		noNegatives: false,
		restrictedMoves: false,
		moveDirs: 'addIncSubDec',
		valuePool: 'radFixed1000'
	};

	onStartGame = (evt) => {
		this.props.onStartGame(Object.assign(
			{},
			this.state,
			{ valuePool: this.mapValuePool(this.state.valuePool), boardSize: this.mapBoardSize(this.state.boardSize) })
		);
	};

	onChangeRadBs = (evt) => (this.setState({ boardSize: evt.target.id }));

	onChangeChGp = (evt) => {
		if (evt.target.name === 'ch-value-colors') {
			this.setState({ valueColors: evt.target.checked });
		}
		else if (evt.target.name === 'ch-playing-hints') {
			if (evt.target.checked) {
				this.setState({ playingHints: true, noNegatives: false });
			}
			else {
				this.setState({ playingHints: false });
			}
		}
		else if (evt.target.name === 'ch-no-negatives') {
			if (evt.target.checked) {
				this.setState({ noNegatives: true, playingHints: false });
			}
			else {
				this.setState({ noNegatives: false });
			}
		}
		else if (evt.target.name === 'ch-restricted-moves') {
			if (evt.target.checked) {
				this.setState({ restrictedMoves: true });
			}
			else {
				this.setState({ restrictedMoves: false });
			}
		}
	};

	onChangeRadVp = (evt) => (this.setState({ valuePool: evt.target.id }));

	onGameRules = (evt) => (this.props.onGameRules('gameRulesEnglish'));

	handleRestrictedMoves = (stateChange) => (this.setState(stateChange));

	componentDidMount() {
	}

	mapValuePool = (poolId) => {
		switch (poolId) {
			case 'radRand-10_10': return { lb: -10, ub: 10 };
			case 'radRand-100_100': return { lb: -100, ub: 100 };
			case 'radRand-1000_1000': return { lb: -1000, ub: 1000 };
			case 'radRand-10000_10000': return { lb: -10000, ub: 10000 };
			case 'radRand-100000_100000': return { lb: -100000, ub: 100000 };
			case 'radFixed0': return { lb: 0, ub: 0 };
			case 'radFixed10': return { lb: 10, ub: 10 };
			case 'radFixed100': return { lb: 100, ub: 100 };
			case 'radFixed1000': return { lb: 1000, ub: 1000};
			case 'radFixed10000': return { lb: 10000, ub: 10000};
			case 'radFixed100000': return { lb: 100000, ub: 100000};
			case 'radFixed1000000': return { lb: 1000000, ub: 1000000};
			default: return { lb: 0, ub: 0 };
		}
	};

	mapBoardSize = (boardSizeId => {
		switch (boardSizeId) {
			case 'rad2x1': return 2;
			case 'rad3x1': return 3;
			case 'rad4x1': return 4;
			case 'rad5x1': return 5;
		}
	})

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
			width: 286,
			fontSize: 22,
			textAlign: 'left',
			marginLeft: 10,
			display: 'inline-block'
		};
		const configDifficultyChecksStyle = {
			textAlign: 'left',
			marginLeft: 30
		};
		const chDivStyle = {
			width: 278,
			fontSize: '18pt',
			display: 'inline-block'
		};
		const hSeparatorStyle = {
			width: 250,
			height: 10
		}
		return (
			<div style={rootStyle}>
				<BlackCadre width={600} borderWidth={15} padding={10} title='Connected Sums Game &nbsp;&nbsp;&nbsp;&nbsp; Created by J.C. Verheul'>
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
										<input id='rad3x1' type='radio' name='rg-bs' defaultChecked={this.state.boardSize === 'rad3x1'} onChange={this.onChangeRadBs} />
										<label><b>&nbsp; 3 x 1</b></label>
									</div>
									<div style={radBsStyle} >
										<input id='rad4x1' type='radio' name='rg-bs' defaultChecked={this.state.boardSize === 'rad4x1'} onChange={this.onChangeRadBs} />
										<label><b>&nbsp; 4 x 1</b></label>
									</div>
									<div style={radBsStyle} >
										<input id='rad5x1' type='radio' name='rg-bs' defaultChecked={this.state.boardSize === 'rad5x1'} onChange={this.onChangeRadBs} />
										<label><b>&nbsp; 5 x 1</b></label>
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
									<input id='radFixed100000' type='radio' name='rg-vp' defaultChecked={this.state.valuePool === 'radFixed100000'} onChange={this.onChangeRadVp} />
									<label><b>&nbsp; Fixed 100000</b></label>
								</div>
								<div style={radVpStyle} >
									<input id='radFixed1000000' type='radio' name='rg-vp' defaultChecked={this.state.valuePool === 'radFixed1000000'} onChange={this.onChangeRadVp} />
									<label><b>&nbsp; Fixed 1000000</b></label>
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
								<div style={radVpStyle} >
									<input id='radRand-10000_10000' type='radio' name='rg-vp' defaultChecked={this.state.valuePool === 'radRand-10000_10000'} onChange={this.onChangeRadVp} />
									<label><b>&nbsp; Random -10000...10000</b></label>
								</div>
								<div style={radVpStyle} >
									<input id='radRand-100000_100000' type='radio' name='rg-vp' defaultChecked={this.state.valuePool === 'radRand-100000_100000'} onChange={this.onChangeRadVp} />
									<label><b>&nbsp; Random -100000...100000</b></label>
								</div>
							</div>
							</BlackCadre>
							<div style={hSeparatorStyle} />
							<GameButton click={this.onStartGame} width={350} radius={10}>Start Game</GameButton>
							<GameButton click={this.onGameRules} width={350} radius={10}>Game Rules</GameButton>
						</div>
					</BlackCadre>
				</BlackCadre>
			</div>
		);
	}
}

export default GameConfig;
