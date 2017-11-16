import React, { Component } from 'react';
import './App.css';

class BlackCadre extends React.Component {

	render() {
		const outerRimStyle = {
			textAlign: 'center',
			width: this.props.width,
			borderRadius: 15,
			display: 'inline-block',
			backgroundColor: 'black',
			color: 'white',
			paddingBottom: this.props.borderWidth
		};
		const innerRimStyle = {
			textAlign: 'center',
			width: this.props.width - 2 * this.props.borderWidth,
			borderRadius: 15,
			display: 'inline-block',
			backgroundColor: 'white',
			color: 'black',
			padding: this.props.padding
		};
		const titleStyle = {
			fontSize: '18pt',
			fontWeight: 'bold',
			marginTop: 4,
			marginBottom: 8
		};
		return (
			<div style={outerRimStyle} >
				<div style={titleStyle} > {this.props.title} </div>
				<div style={innerRimStyle} > {this.props.children} </div>
			</div>
		);
	}
}

export default BlackCadre;
