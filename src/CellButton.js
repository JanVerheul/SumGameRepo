import React, { Component } from 'react';

class GameCell extends React.Component {

	state = { hover: false };

	handleClick = () => (this.props.active ? this.props.handleClick() : null);

	handleMouseEnter = () => (this.setState({ hover: true }));

	handleMouseLeave = () => (this.setState({ hover: false }));

	render() {
		const cbutParent = {
			width: 69,
			height: 46,
			margin: 5,
			paddingTop: 8,
			paddingBottom: 0,
			fontSize: '22pt',
			display: 'inline-block',
			borderRadius: 5,
			borderStyle: 'solid',
			borderWidth: 'medium',
			borderColor: 'black',
			textAlign: 'center',
		};
		const cbutStyle = Object.assign({}, cbutParent, {
			color: 'black',
			backgroundColor: 'white'
		});
		const cbutStyleHint = Object.assign({}, cbutParent, {
			color: 'black',
			backgroundColor: 'yellow'
		});
		const cbutStyleHover = Object.assign({}, cbutParent, {
			color: 'white',
			backgroundColor: 'black'
		});
		const cbutStyleHintHover = Object.assign({}, cbutParent, {
			color: 'white',
			backgroundColor: 'brown'
		});
		const cbutStyleDisabled = Object.assign({}, cbutParent, {
			color: '#666666',
			backgroundColor: '#AAAAAA'
		});
		const style = (this.props.active ? (this.state.hover ? (this.props.hint ? cbutStyleHintHover : cbutStyleHover) : (this.props.hint ? cbutStyleHint : cbutStyle)) : cbutStyleDisabled);
		return (
			<div
				style={style}
				onClick={this.handleClick}
				onMouseEnter={this.handleMouseEnter}
				onMouseLeave={this.handleMouseLeave}
			>
				{this.props.children}
			</div>
		);
	}
}

export default GameCell;
