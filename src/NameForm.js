import React from 'react';
import BlackCadre from './BlackCadre';
import GameButton from './GameButton';

class NameForm extends React.Component {
	onDoneButtonClick = (evt) => {
		this.props.onHallOfFame(this.refs.nameInput.value);
	};
	handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			this.props.onHallOfFame(this.refs.nameInput.value);
		}
	};
	render() {
		const rootStyle = {
			textAlign: 'center',
		};
		const textStyle = {
			textAlign: 'center',
			fontSize: '16pt',
		}
		const nameFormInputStyle = {
			width: 360,
			height: 38,
			fontSize: '16pt',
			borderStyle: 'solid',
			borderRadius: 10,
			borderWidth: 'medium',
		}
		return (
			<div style={rootStyle} >
				<BlackCadre width={500} borderWidth={15} padding={10} title='Score Registration' >
					<div style={textStyle} >
						<h2>Enter your name if you want your achievemens to be remembered by posterity</h2>
						<input autoFocus ref='nameInput' style={nameFormInputStyle} type='text' onKeyPress={this.handleKeyPress}/>
						<br />
						<GameButton click={this.onDoneButtonClick} width={360}>Done</GameButton>
					</div>
				</BlackCadre>
			</div>
		);
	}
}

export default NameForm;
