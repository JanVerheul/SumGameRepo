import React, { Component } from 'react';

class GameButton extends React.Component {

	state = { hover: false };

	onMouseEnter = () => {
		this.setState({ hover: true });
	}

	onMouseLeave = () => {
		this.setState({ hover: false });
	}

	render() {
		const buttonParentStyle = {
			width: this.props.width,
			height: 38,
			marginTop: 5,
			marginBottom: 5,
			marginLeft: 5,
			marginRight: 5,
			fontSize: '20pt',
			borderStyle: 'solid',
			borderRadius: (this.props.radius ? this.props.radius : 5),
			borderWidth: 'medium',
			borderColor: 'black',
			display: 'inline-block'
		};
		const buttonStyle = Object.assign({}, buttonParentStyle, {
			color: 'white',
			backgroundColor: 'black',
		});
		const buttonStyleHover = Object.assign({}, buttonParentStyle, {
			color: 'black',
			backgroundColor: 'white',
		});
		return (
			<button
				style={(this.state.hover ? buttonStyleHover : buttonStyle)}
				onClick={this.props.click}
				onMouseEnter={this.onMouseEnter}
				onMouseLeave={this.onMouseLeave}
			>
				{this.props.children}!
			</button>
		);
	}
}

export default GameButton;
