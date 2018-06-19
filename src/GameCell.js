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
		//const type = this.props.type;
		const md = this.props.moveDirs;
		const activePb = this.props.gameOver === false && (!this.props.restrictedMoves || md === 'addIncSubDec' || md === 'addIncDecSub' || md === 'all');
		const activePa = this.props.gameOver === false && (!this.props.restrictedMoves || md === 'incAddSubDec' || md === 'incAddDecSub' || md === 'all');
		const activeMb = this.props.gameOver === false && (!this.props.restrictedMoves || md === 'addIncSubDec' || md === 'incAddSubDec' || md === 'all') && (this.props.negativesGuard.subDec !== 'subDec');
		const activeMa = this.props.gameOver === false && (!this.props.restrictedMoves || md === 'addIncDecSub' || md === 'incAddDecSub' || md === 'all') && (this.props.negativesGuard.decSub !== 'decSub');
		return (
			<div style={cellStyle} >
				<CellButton hint={hint === 'addInc'} active={activePb} handleClick={this.handleClick('addInc')} >+</CellButton>
				<CellButton hint={hint === 'incAdd'} active={activePa} handleClick={this.handleClick('incAdd')}>+</CellButton>
				<div style={cdatStyle}>{this.props.value}</div>
				<CellButton hint={hint === 'subDec'} active={activeMb} handleClick={this.handleClick('subDec')}>-</CellButton>
				<CellButton hint={hint === 'decSub'} active={activeMa} handleClick={this.handleClick('decSub')}>-</CellButton>
			</div>
		);
	}
}

export default GameCell;
