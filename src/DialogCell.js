import React, { Component } from 'react';
import './App.css';

class DialogCell extends React.Component {

	state = { inverse: false };

	handleChange = (evt) => {
		this.setState({ inverse: evt.target.checked });
		this.props.handleChangeInverse(evt.target.checked);
 	};

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
				<div style={fieldStyle}><input type='checkbox' name='ch-inverse' value={this.state.inverse} onChange={this.handleChange} /></div>
			</div>
		);
	}
}

export default DialogCell;
