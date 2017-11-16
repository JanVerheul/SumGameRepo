import React, { Component } from 'react';
import './App.css';
import GameButton from './GameButton';
import BlackCadre from './BlackCadre';
// kan later weg:
import * as Util from './Util';

class GameConfig extends React.Component {

	state = {
		boardSize: '',
		crossConnections: false,
		noNegatives: false,
		playingHints: false,
		valueColors: false,
		inverseCalculationsDialog: false,
		inverseCalculations: false
	};

	onStartGame = (evt) => {
		this.props.onStartGame(this.state);
	};

	mapBoardSize = (boardSize) => {
		switch (boardSize) {
			case 'rad2x1': return { h: 2, v: 1 };
			case 'rad2x2': return { h: 2, v: 2 };
			case 'rad3x1': return { h: 3, v: 1 };
			case 'rad3x3': return { h: 3, v: 3 };
			case 'rad4x1': return { h: 4, v: 1 };
			case 'rad4x4': return { h: 4, v: 4 };
			case 'rad5x1': return { h: 5, v: 1 };
			case 'rad5x5': return { h: 5, v: 5 };
		}
		return { h: 0, v: 0 };
	}
	
	onChange = (evt) => {
		if (evt.target.id === 'rad2x1') {
			this.setState({ boardSize: 'rad2x1' });
		}
		if (evt.target.id === 'rad2x2') {
			this.setState({ boardSize: 'rad2x2' });
		}
		if (evt.target.id === 'rad3x1') {
			this.setState({ boardSize: 'rad3x1' });
		}
		if (evt.target.id === 'rad3x3') {
			this.setState({ boardSize: 'rad3x3' });
		}
		if (evt.target.id === 'rad4x1') {
			this.setState({ boardSize: 'rad4x1' });
		}
		if (evt.target.id === 'rad4x4') {
			this.setState({ boardSize: 'rad4x4' });
		}
		if (evt.target.id === 'rad5x1') {
			this.setState({ boardSize: 'rad5x1' });
		}
		if (evt.target.id === 'rad5x5') {
			this.setState({ boardSize: 'rad5x5' });
		}
		if (evt.target.name === 'ch-cross-connections') {
			this.setState({ crossConnections: evt.target.checked });
		}
		if (evt.target.name === 'ch-no-negatives') {
			this.setState({ noNegatives: evt.target.checked });
		}
		if (evt.target.name === 'ch-playing-hints') {
			this.setState({ playingHints: evt.target.checked });
		}
		if (evt.target.name === 'ch-value-colors') {
			this.setState({ valueColors: evt.target.checked });
		}
		if (evt.target.name === 'ch-inverse-calculations') {
			this.setState({ inverseCalculationsDialog: evt.target.checked });
		}
	};
	
	componentDidMount() {
	}
	
	render() {

		const rootStyle = {
			textAlign: 'center'
		}
		const radDivStyle = {
			width: 146,
			fontSize: 22,
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
								<div style={radDivStyle} >
									<input id='rad2x1' type='radio' name='rg-bs' value={this.state.boardSize === 'rad2x1'} onChange={this.onChange} />
									<label><b>&nbsp; 2 x 1</b></label>
								</div>
								<div style={radDivStyle} >
									<input id='rad2x2' type='radio' name='rg-bs' value={this.state.boardSize === 'rad2x2'} onChange={this.onChange} />
									<label><b>&nbsp; 2 x 2</b></label>
								</div>
								<div style={radDivStyle} >
									<input id='rad3x1' type='radio' name='rg-bs' value={this.state.boardSize === 'rad3x1'} onChange={this.onChange} />
									<label><b>&nbsp; 3 x 1</b></label>
								</div>
								<div style={radDivStyle} >
									<input id='rad3x3' type='radio' name='rg-bs' value={this.state.boardSize === 'rad3x3'} onChange={this.onChange} />
									<label><b>&nbsp; 3 x 3</b></label>
								</div>
								<div style={radDivStyle} >
									<input id='rad4x1' type='radio' name='rg-bs' value={this.state.boardSize === 'rad4x1'} onChange={this.onChange} />
									<label><b>&nbsp; 4 x 1</b></label>
								</div>
								<div style={radDivStyle} >
									<input id='rad4x4' type='radio' name='rg-bs' value={this.state.boardSize === 'rad4x4'} onChange={this.onChange} />
									<label><b>&nbsp; 4 x 4</b></label>
								</div>
								<div style={radDivStyle} >
									<input id='rad5x1' type='radio' name='rg-bs' value={this.state.boardSize === 'rad5x1'} onChange={this.onChange} />
									<label><b>&nbsp; 5 x 1</b></label>
								</div>
								<div style={radDivStyle} >
									<input id='rad5x5' type='radio' name='rg-bs' value={this.state.boardSize === 'rad5x5'} onChange={this.onChange} />
									<label><b>&nbsp; 5 x 5</b></label>
								</div>
								<div style={hSeparatorStyle} />
							</div>
						</BlackCadre>
						<div style={hSeparatorStyle} />
						<BlackCadre width={350} borderWidth={15} padding={10} title='Game Parameters' >
							<div style={configDifficultyChecksStyle} >
								<div style={chDivStyle} >
									<input type='checkbox' name='ch-cross-connections' value={this.state.crossConnections} onChange={this.onChange} />
									<label><b>&nbsp; Cross Connections</b></label>
								</div>
								<div style={chDivStyle} >
									<input type='checkbox' name='ch-no-negatives' value={this.state.noNegatives} onChange={this.onChange} />
									<label><b>&nbsp; No Negatives</b></label>
								</div>
								<div style={chDivStyle} >
									<input type='checkbox' name='ch-playing-hints' value={this.state.playingHints} onChange={this.onChange} />
									<label><b>&nbsp; Playing Hints</b></label>
								</div>
								<div style={chDivStyle} >
									<input type='checkbox' name='ch-value-colors' value={this.state.valueColors} onChange={this.onChange} />
									<label><b>&nbsp; Cell Valued Colors</b></label>
								</div>
								<div style={chDivStyle} >
									<input type='checkbox' name='ch-inverse-calculations' value={this.state.inverseCalculations} onChange={this.onChange} />
									<label><b>&nbsp; Inverse Calculation</b></label>
								</div>
							</div>
						</BlackCadre>
						<div style={hSeparatorStyle} />
						<GameButton click={this.onStartGame} width={350}>Start Game</GameButton>
					</div>
				</BlackCadre>
			</div>
		);
	}
}

export default GameConfig;
