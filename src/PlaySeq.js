
export function PlaySeq(valArray) {
	this.valArray = valArray;
	this.processed = false;
    this.minSteps = 0;
    this.optimalDir = 'none';
	this.optimalIndex = -1;
}

PlaySeq.prototype = {
	move: function(dir, index) {
		return this[dir](index);
	},
	optMove: function() {
		return this.move(this.optimalDir, this.optimalIndex);
	},
	addInc: function(index) {
        let v = this.valArray[index];
        let newValArray = [];
		this.valArray.forEach((val, i) => {
			if (i === index) newValArray.push(v + 1)
			else newValArray.push(val + v)
		})
		const newPlaySeq = new PlaySeq(newValArray);
		newPlaySeq.minSteps = this.minSteps + 1;
		newPlaySeq.optimalDir = 'decSub';
		newPlaySeq.optimalIndex = index;
        return newPlaySeq;
    },
    incAdd: function(index) {
		let v = this.valArray[index] + 1;
        let newValArray = [];
		this.valArray.forEach((val, i) => {
			if (i === index) newValArray.push(v)
			else newValArray.push(val + v)
		})
		const newPlaySeq = new PlaySeq(newValArray);
		newPlaySeq.minSteps = this.minSteps + 1;
		newPlaySeq.optimalDir = 'subDec';
		newPlaySeq.optimalIndex = index;
        return newPlaySeq;
    },
    subDec: function(index) {
		let v = this.valArray[index];
        let newValArray = [];
		this.valArray.forEach((val, i) => {
			if (i === index) newValArray.push(v - 1)
			else newValArray.push(val - v)
		})
		const newPlaySeq = new PlaySeq(newValArray);
		newPlaySeq.minSteps = this.minSteps + 1;
		newPlaySeq.optimalDir = 'incAdd';
		newPlaySeq.optimalIndex = index;
        return newPlaySeq;
    },
    decSub: function(index) {
		let v = this.valArray[index] - 1;
        let newValArray = [];
		this.valArray.forEach((val, i) => {
			if (i === index) newValArray.push(v)
			else newValArray.push(val - v)
		})
		const newPlaySeq = new PlaySeq(newValArray);
		newPlaySeq.minSteps = this.minSteps + 1;
		newPlaySeq.optimalDir = 'addInc';
		newPlaySeq.optimalIndex = index;
        return newPlaySeq;
    },
    size: function() {
		return this.valArray.length;
	},
	toKey: function() {
		let result = 'key';
		this.valArray.forEach((elem) => {
			result = result + '_' + elem;
		});
		return result;
	},
	toDesc: function() {
		return 'DESCRIPTION ' + JSON.stringify(this);
	},
    absLargest: function() {
		return Math.max(...this.map(this.valArray, (v) => Math.abs(v)));
	},
	logAbsLargest: function() {
		return 10 * Math.log10(this.absLargest());
	},
	map: function(inArray, f) {
		let result = [];
		for (let i = 0; i < inArray.length; i++) {
			result.push(f(inArray[i]));
		}
		return result;
	},
}
