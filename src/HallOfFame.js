import React from 'react';
import BlackCadre from './BlackCadre';
import * as Util from './Util';
import HallOfFameDialog from './HallOfFameDialog';

class HallOfFame extends React.Component {

	state = { order: 'moves' };

	sortMoves = () => {
		this.setState({ order: 'moves' });
	};

	sortTime = () => {
		this.setState({ order: 'time' });
	};

	compFunc = (elem1, elem2) => {
		if (this.state.order === 'moves') {
			if (elem1.moves - elem2.moves < 0) {
				return -1;
			}
			else if (elem1.moves - elem2.moves > 0) {
				return 1;
			}
			else {
				if (elem1.time - elem2.time < 0) {
					return -1;
				}
				else if (elem1.time - elem2.time > 0) {
					return 1;
				}
				else {
					if (elem1.date - elem2.date < 0) {
						return -1;
					}
					else if (elem1.date - elem2.date > 0) {
						return 1
					}
					else {
						return 0;
					}
				}
			}
		}
		else {
			if (elem1.time - elem2.time < 0) {
				return -1;
			}
			else if (elem1.time - elem2.time > 0) {
				return 1;
			}
			else {
				if (elem1.moves - elem2.moves < 0) {
					return -1;
				}
				else if (elem1.moves - elem2.moves > 0) {
					return 1;
				}
				else {
					if (elem1.date - elem2.date < 0) {
						return -1;
					}
					else if (elem1.date - elem2.date > 0) {
						return 1
					}
					else {
						return 0;
					}
				}
			}
		}
	}

	render() {
		const rootStyle = {
			textAlign: 'center',
		};
		const textStyle = {
			textAlign: 'center',
			fontSize: '16pt',
		}
		const tableStyle = {
			width: 660,
			borderStyle: 'solid',
			borderRadius: 10,
			borderWidth: 'medium',
			borderColor: 'black',
			borderCollapse: 'collapse',
			display: 'inline-block'
		}
		const tableElementStyle = {
			width: '10%',
			borderTopStyle: 'solid',
			borderRightStyle: 'solid',
			borderWidth: 'medium',
			borderColor: 'black',
		}
		const tableElementEdgeStyle = {
			width: '10%',
			borderTopStyle: 'solid',
			borderWidth: 'medium',
			borderColor: 'black',
		}
		const tableElementHeadStyle = {
			width: '10%',
			borderRightStyle: 'solid',
			borderWidth: 'medium',
			borderColor: 'black',
			color: 'white',
			backgroundColor: 'black'
		}
		const tableElementHeadEdgeStyle = {
			width: '10%',
			color: 'white',
			backgroundColor: 'black'
		}
		const entries = this.props.hofList.sort(this.compFunc).map((entry, index) => (
			<tr key={'hofEntry-' + index}>
				<td style={tableElementStyle} >{entry.name}</td>
				<td style={tableElementStyle} >{Util.formatDate(entry.date)}</td>
				<td style={tableElementStyle} >{entry.moves}</td>
				<td style={tableElementEdgeStyle} >{Util.formatPlayingTime(entry.time)}</td>
			</tr>
		));
		return (
			<div style={rootStyle}>
				<BlackCadre width={770} borderWidth={15} padding={10} title='Connected Sums Game &nbsp;&nbsp;&nbsp;&nbsp; Created by J.C. Verheul'>
					<BlackCadre width={720} borderWidth={15} padding={10} title='Hall  of  Fame' >
						<div style={textStyle} >
							<h2>Achievements To Be Remembered Eternally</h2>
								<table style={tableStyle} >
								<thead>
									<tr>
										<td style={tableElementHeadStyle} >Name</td>
										<td style={tableElementHeadStyle} >Date</td>
										<td style={tableElementHeadStyle} >Moves</td>
										<td style={tableElementHeadEdgeStyle} >Time</td></tr>
								</thead>
								<tbody>
									{entries}
								</tbody>
							</table>
							<HallOfFameDialog anotherGame={this.props.anotherGame} differentGame={this.props.differentGame} sortMoves={this.sortMoves} sortTime={this.sortTime} />
						</div>
					</BlackCadre>
				</BlackCadre>
			</div>
		);
	}
}

export default HallOfFame;
