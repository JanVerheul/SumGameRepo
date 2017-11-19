import React, { Component } from 'react';

class ScoreCell extends React.Component {

	render() {
		const fieldStyle = {
			width: 160,
			height: 40,
			margin: 5,
			padding: 6,
			fontSize: '22pt',
			borderRadius: 5,
			borderStyle: 'solid',
			borderWidth: 'medium',
			borderColor: 'black',
			textAlign: 'center',
			backgroundColor: 'white'
		};
		const cellStyle = {
			width: 186,
			height: 110,
			margin: 5,
			padding: 5,
			borderStyle: 'solid',
			borderRadius: 15,
			borderWidth: 'medium',
			display: 'inline-block',
			backgroundColor: 'red'
		}
		return (
			<div style={cellStyle} >
				<div style={fieldStyle}>{this.props.title}</div>
				<div style={fieldStyle}>{this.props.score}</div>
			</div>
		);
	}
}

export default ScoreCell;
