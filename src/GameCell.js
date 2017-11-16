import React, { Component } from 'react';
import './App.css';
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
			width: 56,
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
			borderRadius: 15,
			borderWidth: 'medium',
			display: 'inline-block',
			backgroundColor: (this.props.valueColors ? backGroundColor : 'red')
		}
		const type = this.props.type;
		const activeAllTypes = this.props.gameOver == false;
		const activeLine2D = this.props.gameOver == false && type === 'line2d';
		const activeAll2D = this.props.gameover == false && (type === 'line2d' || type === 'cross2d');
		
		return (
			<div style={cellStyle} >
				<CellButton hint={hint === 'NW'} active={activeLine2D} handleClick={this.handleClick('NW')} >+</CellButton>
				<CellButton hint={hint === 'NN'} active={activeLine2D} handleClick={this.handleClick('NN')}>+</CellButton>
				<CellButton hint={hint === 'NE'} active={activeAll2D} handleClick={this.handleClick('NE')}>+</CellButton>
				<CellButton hint={hint === 'WW'} active={activeAllTypes} handleClick={this.handleClick('WW')}>-</CellButton>
				<div style={cdatStyle}>{this.props.value}</div>
				<CellButton hint={hint === 'EE'} active={activeAllTypes} handleClick={this.handleClick('EE')}>+</CellButton>
				<CellButton hint={hint === 'SW'} active={activeAll2D} handleClick={this.handleClick('SW')}>-</CellButton>
				<CellButton hint={hint === 'SS'} active={activeLine2D} handleClick={this.handleClick('SS')}>-</CellButton>
				<CellButton hint={hint === 'SE'} active={activeLine2D} handleClick={this.handleClick('SE')}>-</CellButton>
			</div>
		);
	}
}

export default GameCell;
