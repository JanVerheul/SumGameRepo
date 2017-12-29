import React from 'react';
import CellButton from './CellButton';

class GameCell extends React.Component {
	handleClick = (direction) => {
		return () => this.props.handleClick(this.props.id, direction);
	}
	render() {
		const hint = (this.props.id === this.props.hint.index ? this.props.hint.direction : '');
		let value = this.props.value * 3;
		let colorVal = 0;
		let negative = false;
		if (value > 255) {
			value = 255;
		}
		else if (value < -255) {
			value = -255;
		}
		if (value < 0) {
			colorVal = 255 + value;
			negative = true;
		}
		else {
			colorVal = 255 - value;
			negative = false;
		}
		let clr = (colorVal < 16 ? '0' + colorVal.toString(16) : colorVal.toString(16));
		const backGroundColor = (negative ? '#' + clr + clr + 'FF' : '#FF' + clr + clr);
		const cdatStyle = {
			width: 168,
			height: 56,
			margin: 0,
			paddingTop: 13,
			paddingBottom: 0,
			fontSize: '22pt',
			display: 'inline-block',
			borderRadius: 5,
			borderStyle: 'solid',
			borderWidth: 'medium',
			borderColor: (this.props.valueColors ? backGroundColor : 'red'),
			textAlign: 'center'
		};
		const cellStyle = {
			width: 186,
			height: 186,
			margin: 5,
			padding: 5,
			borderStyle: 'solid',
			borderRadius: 10,
			borderWidth: 'medium',
			display: 'inline-block',
			backgroundColor: (this.props.valueColors ? backGroundColor : 'red')
		}
		const type = this.props.type;
		const activePb = this.props.gameOver == false && (!this.props.restrictedMoves || this.props.addInc);
		const activePa = this.props.gameOver == false && (!this.props.restrictedMoves || !this.props.addInc);
		const activeMb = this.props.gameOver == false && (!this.props.restrictedMoves || this.props.subDec);
		const activeMa = this.props.gameOver == false && (!this.props.restrictedMoves || !this.props.subDec);
		return (
			<div style={cellStyle} >
				<CellButton hint={hint === 'PB'} active={activePb} handleClick={this.handleClick('PB')} >+</CellButton>
				<CellButton hint={hint === 'PA'} active={activePa} handleClick={this.handleClick('PA')}>+</CellButton>
				<div style={cdatStyle}>{this.props.value}</div>
				<CellButton hint={hint === 'MB'} active={activeMb} handleClick={this.handleClick('MB')}>-</CellButton>
				<CellButton hint={hint === 'MA'} active={activeMa} handleClick={this.handleClick('MA')}>-</CellButton>
			</div>
		);
	}
}

export default GameCell;
