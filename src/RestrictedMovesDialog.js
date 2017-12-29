import React from 'react';
import * as Util from './Util';

class RestrictedMovesDialog extends React.Component {
    state = { restrictedMovesId: '', addInc: false, subDec: false };

    onChange = (evt) => {
        if (evt.target.id === 'addIncSubDec') {
			this.setState({ restrictedMovesId: 'addIncSubDec', addInc: true, subDec: true });
            this.props.handleRestrictedMoves({ addInc: true, subDec: true });
		}
		else if (evt.target.id === 'incAddDecSub') {
			this.setState({ restrictedMovesId: 'incAddDecSub' });
            this.props.handleRestrictedMoves({ addInc: false, subDec: false });
		}
		else if (evt.target.id === 'addIncDecSub') {
			this.setState({ restrictedMovesId: 'addIncDecSub' });
            this.props.handleRestrictedMoves({ addInc: true, subDec: false });
		}
		else if (evt.target.id === 'incAddSubDec') {
			this.setState({ restrictedMovesId: 'incAddSubDec' });
            this.props.handleRestrictedMoves({ addInc: false, subDec: true });
		}

    }
    render() {
        const radDivStyle = {
			width: 226,
			fontSize: 22,
			display: 'inline-block'
		};
        return (
            <div>
                <div style={radDivStyle} >
                    <input id='addIncSubDec' type='radio' name='rg-rm' value={this.state.restrictedMovesId === 'addIncSubDec'} onChange={this.onChange} />
                    <label><b>&nbsp; Add-Inc / Sub-Dec</b></label>
                </div>
                <div style={radDivStyle} >
                    <input id='incAddDecSub' type='radio' name='rg-rm' value={this.state.restrictedMovesId === 'incAddDecSub'} onChange={this.onChange} />
                    <label><b>&nbsp; Inc-Add / Dec-Sub</b></label>
                </div>
                <div style={radDivStyle} >
                    <input id='addIncDecSub' type='radio' name='rg-rm' value={this.state.restrictedMovesId === 'addIncDecSub'} onChange={this.onChange} />
                    <label><b>&nbsp; Add-Inc / Dec-Sub</b></label>
                </div>
                <div style={radDivStyle} >
                    <input id='incAddSubDec' type='radio' name='rg-rm' value={this.state.restrictedMovesId === 'incAddSubDec'} onChange={this.onChange} />
                    <label><b>&nbsp; Inc-Add / Sub-Dec</b></label>
                </div>
            </div>
        );
    }
}

export default RestrictedMovesDialog;
