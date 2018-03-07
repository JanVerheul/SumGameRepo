
// function for computing cell connections

const fixedValues = [-13, 0, 8, 0, 0, 0];

export const computeChange = (cells, cellIndex, direction) => {
	const factor = (direction === 'PA' || direction === 'PB' ? 1 : -1);
	const order = (direction === 'PA' || direction === 'MA' ? 'A' : 'B');
	const oldVal = cells[cellIndex];
	const newVal = oldVal + factor;
	const numToChange = cells.length;
	for (let i = 0; i < numToChange; i++) {
		const nextValue = (i === cellIndex ? newVal : cells[i] + (order === 'A' ? newVal : oldVal) * factor);
		cells[i] = nextValue;
	}
	return cells;
};

export const getNegativesGuardList = (cells) => {
	let result = [];
	for (let i = 0; i < cells.length; i++) {
		let guard = {};
		const newCellsMB = computeChange(JSON.parse(JSON.stringify(cells)), i, 'MB');
		if (containsNegatives(newCellsMB)) {
			guard.MB = 'MB';
		}
		const newCellsMA = computeChange(JSON.parse(JSON.stringify(cells)), i, 'MA');
		if (containsNegatives(newCellsMA)) {
			guard.MA = 'MA';
		}
		result.push(guard);
	}
	return result;
};

const containsNegatives = (cells) => {
	for (let i = 0; i < cells.length; i++) {
		if (cells[i] < 0) {
			return true;
		}
	}
	return false;
};

// functions for generating cell content

const generateCellNumber = ({ lb, ub }) => ((lb === ub ? lb : lb + Math.floor(Math.random() * (ub - lb + 1))));

export const generateCells = (number, valuePool, noNegatives) => {
	let res = [];
	if (valuePool.lb === 0) {
		for (let i = 0; i < number; i++) {
			res.push(fixedValues[i]);
		}
	}
	else {
		for (let i = 0; i < number; i++) {
			const val = generateCellNumber(valuePool);
			res.push(noNegatives ? Math.abs(val) : val);
		}
	}
	return res;
};

// general utility functions

export const formatPlayingTime = (numSeconds) => {
	const seconds = numSeconds % 60;
	numSeconds = numSeconds - seconds;
	numSeconds = numSeconds / 60;
	const minutes = numSeconds % 60;
	numSeconds = numSeconds - minutes;
	const hours = numSeconds % 60;
	return `${twoPos(hours)} : ${twoPos(minutes)} : ${twoPos(seconds)}`;
}

export const formatDate = (epochNum) => {
	const date = new Date(epochNum);
	return date.getFullYear() + '-' + twoPos(date.getMonth() + 1) + '-' + twoPos(date.getDate());
}

export const foldl = (iterable, f, initial) => {
	let accu = initial;
	for (let i = 0; i < iterable.length; i++) {
		accu = f(accu, iterable[i]);
	}
	return accu;
}

const twoPos = (num) => (num < 10 ? '0' + num : num);


// functions for calculating hints

export const calcHint = (cells, mod, boardType) => {
	const res = strategyFour(new PlaySeq(cells));
	return res;
};

const strategyOne = (playSeq) => {
	if (playSeq.allZeroes()) return { direction: 'NO', index: 0};
	else if (playSeq.numEquals(-1) === 1 && playSeq.numEquals(1) === playSeq.size() -1) return { direction: 'PB', index: playSeq.indicesEquals(-1)[0] };
	else if (playSeq.allPositives()) return { direction: 'MB', index: playSeq.indicesSmallest()[0] };
	else if (playSeq.allZeroOrOnes()) return { direction: 'PB', index: playSeq.indicesZero()[0] };
	else if (!playSeq.hasNegatives()) return { direction: 'PB', index: playSeq.indicesLargest()[0] };
	else if (playSeq.allNegatives()) return { direction: 'MB', index: playSeq.indicesSmallest()[0] };
	else if (!playSeq.hasPositives()) return { direction: 'MB', index: playSeq.indicesSmallest()[0] };
	else return { direction: 'PB', index: playSeq.indicesLargest()[0] };
}

const compareTrials = (leastTrial, newTrial) => {
	let leastTrialPlaySeq = leastTrial.newPlaySeq;
	let newTrialPlaySeq = newTrial.newPlaySeq;
	if (leastTrialPlaySeq.absLargest() < newTrialPlaySeq.absLargest()) return false;
	else if (leastTrialPlaySeq.absLargest() > newTrialPlaySeq.absLargest()) return true;
	else if (leastTrialPlaySeq.absSum() < newTrialPlaySeq.absSum()) return false;
	else return true;
}

const strategyFour = (playSeq) => {
	if (playSeq.absLargest() <= 2) return strategyOne(playSeq);
	else if (playSeq.numLessThan(-1) === 0 && playSeq.numEquals(-1) === 1 && playSeq.numEquals(0) > 0) return { direction: 'MB', index: playSeq.indicesEquals(0)[0] };
	else {
		let trials = [];
		for (let i = 0; i < playSeq.size(); i++) {
			trials.push({ trial: { direction: 'PB', index: i }, newPlaySeq: playSeq.addInc(i) });
		}
		for (let i = 0; i < playSeq.size(); i++) {
			trials.push({ trial: { direction: 'MB', index: i }, newPlaySeq: playSeq.subDec(i) });
		}
		let leastTrial = trials[0];
		for (let i = 1; i < trials.length; i++) {
			if (compareTrials(leastTrial, trials[i])) {
				leastTrial = trials[i]
			}
		}
		return leastTrial.trial;
	}
}

const predicateAllOne = (accu, value) => (accu && (value === 1));
const allOne = (intList) => (foldl(intList, predicateAllOne, true));

const predicateAllZeroOne = (accu, value) => (accu && (value === 0 || value === 1));
const allZeroOne = (intList) => (foldl(intList, predicateAllZeroOne, true));

const predicateNonePositive = (accu, value) => (accu && (value <= 0));
const nonePositive = (intList) => (foldl(intList, predicateNonePositive, true));

const predicateAllPositive = (accu, value) => (accu && (value > 0));
const allPositive = (intList) => (foldl(intList, predicateAllPositive, true));

const predicateNoneNegative = (accu, value) => (accu && (value >= 0));
const noneNegative = (intList) => (foldl(intList, predicateNoneNegative, true));

const predicateIndexesLowest = ({ indexes, lowestValue, index }, value) => {
	if (value < lowestValue) {
		return { indexes: [index], lowestValue: value, index: index + 1 };
	}
	else if (value === lowestValue) {
		return { indexes: indexes.concat([index]), lowestValue: lowestValue, index: index + 1 };
	}
	else {
		return { indexes: indexes, lowestValue: lowestValue, index: index + 1};
	}
};
const getIndexesLowest = (intList) => (foldl(intList, predicateIndexesLowest, { indexes: [], lowestValue: Infinity, index: 0 }).indexes);

const predicateIndexesHighest = ({ indexes, highestValue, index }, value) => {
	if (value > highestValue) {
		return { indexes: [index], highestValue: value, index: index + 1 };
	}
	else if (value === highestValue) {
		return { indexes: indexes.concat([index]), highestValue: highestValue, index: index + 1 };
	}
	else {
		return { indexes: indexes, highestValue: highestValue, index: index + 1 };
	}
};
const getIndexesHighest = (intList) => (foldl(intList, predicateIndexesHighest, { indexes: [], highestValue: -Infinity, index: 0 }).indexes);

const getIndexesAll = (intList) => (intList.map((value, index) => index));

const predicateIndexesZeroes = ({ indexes, index }, value) => {
	if (value === 0) {
		return { indexes: indexes.concat([index]), index: index + 1 };
	}
	else {
		return { indexes: indexes, index: index + 1};
	}
};
const getIndexesZeroes = (intList) => (foldl(intList, predicateIndexesZeroes, { indexes: [], index: 0 }).indexes);

const randSel = (lst) => {
	const index = Math.floor(Math.random() * lst.length);
	return lst[index];
};

export class PlaySeq {
	constructor(playSeqArray) {
		this.playSeq = playSeqArray;
	}
	addInc(index) {
        let v = this.playSeq[index];
        let newSeq = [];
		for (let i = 0; i < this.playSeq.length; i++) {
			if (i === index) {
				newSeq[i] = v + 1;
			}
			else {
				newSeq[i] = this.playSeq[i] + v;
			}
		}
        return new PlaySeq(newSeq);
    }
    incAdd(index) {
		let v = this.playSeq[index] + 1;
        let newSeq = [];
		for (let i = 0; i < this.playSeq.length; i++) {
			if (i === index) {
				newSeq[i] = v;
			}
			else {
				newSeq[i] = this.playSeq[i] + v;
			}
		}
        return new PlaySeq(newSeq);
    }
    subDec(index) {
		let v = this.playSeq[index];
        let newSeq = [];
		for (let i = 0; i < this.playSeq.length; i++) {
			if (i === index) {
				newSeq[i] = v - 1;
			}
			else {
				newSeq[i] = this.playSeq[i] - v;
			}
		}
        return new PlaySeq(newSeq);
    }
    decSub(index) {
		let v = this.playSeq[index] - 1;
        let newSeq = [];
		for (let i = 0; i < this.playSeq.length; i++) {
			if (i === index) {
				newSeq[i] = v;
			}
			else {
				newSeq[i] = this.playSeq[i] + v;
			}
		}
        return new PlaySeq(newSeq);
    }
    size() {
		return this.playSeq.length;
	}
    hasNegatives() {
		return this.foldLeft(false, this.playSeq, (b, i) => b || i < 0);
	}
    hasPositives() {
		return this.foldLeft(false, this.playSeq, (b, i) => b || i > 0);
	}
    allNegatives() {
		return this.foldLeft(true, this.playSeq, (b, i) => b && i < 0);
	}
    allPositives() {
		return this.foldLeft(true, this.playSeq, (b, i) => b && i > 0);
	}
    allZeroes() {
		return this.foldLeft(true, this.playSeq, (b, i) => b && i === 0);
	}
    allOnes() {
		return this.foldLeft(true, this.playSeq, (b, i) => b && i === 1);
	}
    allZeroOrOnes() {
		return this.foldLeft(true, this.playSeq, (b, i) => b && (i === 0 || i === 1));
	}
    allZeroOrAbsOnes() {
		return this.foldLeft(true, this.playSeq, (b, i) => b && (i === 0 || i === 1 || i === -1));
	}
    largest() {
		return Math.max(...this.playSeq);
	}
    smallest() {
		return Math.min(...this.playSeq);
	}
    absLargest() {
		return Math.max(...this.map(this.playSeq, (v) => Math.abs(v)));
	}
    absSum() {
		return this.sum(this.map(this.playSeq, (v) => Math.abs(v)));
	}
    numEquals(n) {
		return this.sum(this.map(this.playSeq, (v) => (v === n ? 1 : 0)));
	}
    numLessThan(n) {
		return this.sum(this.map(this.playSeq, (v) => (v < n ? 1 : 0)));
	}
    numGreaterThan(n) {
		return this.sum(this.map(this.playSeq, (v) => (v > n ? 1 : 0)));
	}
    smallestPositive() {
		return Math.min(...this.filter(this.playSeq, (v) => (v > 0)));
	}
    largestNegative() {
		return Math.max(...this.filter(this.playSeq, (v) => (v < 0)));
	}
    indicesLargest() {
		let result = [];
		let largest = this.largest();
		for (let i = 0; i < this.playSeq.length; i++) {
			if (this.playSeq[i] === largest) {
				result.push(i);
			}
		}
		return result;
	}
    indicesSmallest() {
		let result = [];
		let smallest = this.smallest();
		for (let i = 0; i < this.playSeq.length; i++) {
			if (this.playSeq[i] === smallest) {
				result.push(i);
			}
		}
		return result;
	}
    indicesPositives() {
		let result = [];
		for (let i = 0; i < this.playSeq.length; i++) {
			if (this.playSeq[i] > 0) {
				result.push(i);
			}
		}
		return result;
	}
    indicesNegatives() {
		let result = [];
		for (let i = 0; i < this.playSeq.length; i++) {
			if (this.playSeq[i] < 0) {
				result.push(i);
			}
		}
		return result;
	}
    indicesZero() {
		let result = [];
		for (let i = 0; i < this.playSeq.length; i++) {
			if (this.playSeq[i] === 0) {
				result.push(i);
			}
		}
		return result;
	}
    indicesEquals(n: Int) {
		let result = [];
		for (let i = 0; i < this.playSeq.length; i++) {
			if (this.playSeq[i] === n) {
				result.push(i);
			}
		}
		return result;
	}
    maxInIndices(indexList) {
		let select = this.map(indexList, (v) => this.playSeq[v]);
		return Math.max(...select);
	}
    minInIndices(indexList) {
		let select = this.map(indexList, (v) => this.playSeq[v]);
		return Math.min(...select);
	}
    maxOfIndices(indexList) {
		let result = [];
        let maxVal = this.maxInIndices(indexList);
		for (let i = 0; i < indexList; i++) {
			if (this.playSeq[indexList[i]] === maxVal) {
				result.push(indexList[i]);
			}
		}
        return result;
    }
    minOfIndices(indexList) {
		let result = [];
        let minVal = this.minInIndices(indexList);
		for (let i = 0; i < indexList; i++) {
			if (this.playSeq[indexList[i]] === minVal) {
				result.push(indexList[i]);
			}
		}
        return result;
    }
    toString() {
		return JSON.stringify(this.playSeq);
	}
    toExtStr() {
		return "PlaySeq" + JSON.stringify(this.playSeq);
	}
	foldLeft(accu, inArray, f) {
		if (inArray.length <= 0) {
			return accu;
		}
		else {
			let result = accu;
			for (let i = 0; i < inArray.length; i++) {
				result = f(result, inArray[i]);
			}
			return result;
		}
	}
	map(inArray, f) {
		let result = [];
		for (let i = 0; i < inArray.length; i++) {
			result.push(f(inArray[i]));
		}
		return result;
	}
	sum(inArray) {
		return this.foldLeft(0, inArray, (a, v) => a + v);
	}
	filter(inArray, f) {
		let result = [];
		for (let i = 0; i < inArray.length; i++) {
			if (f(inArray[i])) {
				result.push(inArray[i]);
			}
		}
		return result;
	}
}
