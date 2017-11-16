
// functions for computing cell connections 

export const computeChangeDesc = (bsH, boardType, cellId, direction) => {
	if (boardType === 'line1d') {
		switch (direction) {
			case 'WW': {
				let res = [];
				for (let i = 0; i < bsH; i++) {
					if (i != cellId) {
						res.push(i);
					}
				}
				return { factor: -1, cells: res };
			};
			case 'EE': {
				let res = [];
				for (let i = 0; i < bsH; i++) {
					if (i != cellId) {
						res.push(i);
					}
				}
				return { factor: 1, cells: res };
			};
			default: {
				return { factor: 0, cells: [] };
			};
		}
	}
	else if (boardType === 'line2d') {
		switch (direction) {
			case 'NW': {
				return { factor: 1, cells: computeChangeDescNW(bsH, cellId) };
			}
			case 'NN': {
				return { factor: 1, cells: computeChangeDescNN(bsH, cellId) };
			}
			case 'NE': {
				return { factor: 1, cells: computeChangeDescNE(bsH, cellId) };
			}
			case 'EE': {
				return { factor: 1, cells: computeChangeDescEE(bsH, cellId) };
			}
			case 'SE': {
				return { factor: -1, cells: computeChangeDescNW(bsH, cellId) };
			}
			case 'SS': {
				return { factor: -1, cells: computeChangeDescNN(bsH, cellId) };
			}
			case 'SW': {
				return { factor: -1, cells: computeChangeDescNE(bsH, cellId) };
			}
			case 'WW': {
				return { factor: -1, cells: computeChangeDescEE(bsH, cellId) };
			}
			default: {
				return { factor: 0, cells: [] };
			}
		}
	}
	else {
		switch (direction) {
			case 'NE': {
				return { factor: 1, cells: computeChangeDescNE(bsH, cellId).concat(computeChangeDescNW(bsH, cellId)) };
			}
			case 'EE': {
				return { factor: 1, cells: computeChangeDescEE(bsH, cellId).concat(computeChangeDescNN(bsH, cellId)) };
			}
			case 'SW': {
				return { factor: -1, cells: computeChangeDescNE(bsH, cellId).concat(computeChangeDescNW(bsH, cellId)) };
			}
			case 'WW': {
				return { factor: -1, cells: computeChangeDescEE(bsH, cellId).concat(computeChangeDescNN(bsH, cellId)) };
			}
			default: {
				return { factor: 0, cells: [] };
			}
		}
	}
};

const computeChangeDescNW = (mod, cellId) => {
	let coor = transLin2Coor(cellId, mod);
	let res = [];
	for (let i = 1; i < mod; i++) {
		res.push(transCoor2Lin({ h: coor.h + i, v: coor.v + i }, mod));
	}
	return res;
}

const computeChangeDescNN = (mod, cellId) => {
	let coor = transLin2Coor(cellId, mod);
	let res = [];
	for (let i = 1; i < mod; i++) {
		res.push(transCoor2Lin({ h: coor.h, v: coor.v + i }, mod));
	}
	return res;
}

const computeChangeDescNE = (mod, cellId) => {
	let coor = transLin2Coor(cellId, mod);
	let res = [];
	for (let i = 1; i < mod; i++) {
		res.push(transCoor2Lin({ h: coor.h - i, v: coor.v + i }, mod));
	}
	return res;
}

const computeChangeDescEE = (mod, cellId) => {
	let coor = transLin2Coor(cellId, mod);
	let res = [];
	for (let i = 1; i < mod; i++) {
		res.push(transCoor2Lin({ h: coor.h + i, v: coor.v }, mod));
	}
	return res;
}

const transLin2Coor = (index, mod) => {
	// method assumes index >= 0 
	const h = index % mod;
	index = index - h;
	const v = index / mod;
	return { h: h, v: v };
};

const transCoor2Lin = (pair, mod) => {
	const hh = (pair.h < 0 ? pair.h + mod : pair.h % mod);
	const vv = (pair.v < 0 ? pair.v + mod : pair.v % mod);
	return hh + vv * mod;
}


// functions for generating cell content

const generateCellNumber = () => (Math.floor((Math.random() * 20) - 5));

export const generateCellsY = (number) => {
	let res = [];
	for (let i = 0; i < number; i++) {
		res.push(generateCellNumber());
	}
	return res;
};

export const generateCellsX = (number) => {
	return [8, 5, 2, 6];
}

export const generateCells = (number) => {
	return [100, 100, 100];
}

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
	
	if (allOne(cells)) { // alle cellen bevatten 1
		if (boardType === 'line1d') {
			return { index: randSel(getIndexesAll(cells)), direction: 'WW' };
		}
		
	}
	if (allZeroOne(cells)) { // alle cellen bevatten 0 of 1
		if (boardType === 'line1d') {
			return { index: randSel(getIndexesZeroes(cells)), direction: 'EE' };
		}
		
	}
	if (nonePositive(cells)) { // alle cellen bevatten waarden kleiner dan 0
		if (boardType === 'line1d') {
			return { index: randSel(getIndexesLowest(cells)), direction: 'WW' };
		}
		if (boardType === 'line2d') {
			const indexes = getIndexesLowest(cells);
			const resultOptions = [];
			for (let i = 0; i < indexes.length; i++) {
				const index = indexes[i];
				resultOptions.push({ value: countNegatives(cells, computeChangeDescNW(mod, index)), hint: { index: index, direction: 'SE'}})
				resultOptions.push({ value: countNegatives(cells, computeChangeDescNN(mod, index)), hint: { index: index, direction: 'SS'}})
				resultOptions.push({ value: countNegatives(cells, computeChangeDescNE(mod, index)), hint: { index: index, direction: 'SW'}})
				resultOptions.push({ value: countNegatives(cells, computeChangeDescEE(mod, index)), hint: { index: index, direction: 'WW'}})
			}
			return randSel(getMaximalHint(resultOptions));
		}
		if (boardType === 'cross2d') {
			const indexes = getIndexesLowest(cells);
			const resultOptions = [];
			for (let i = 0; i < indexes.length; i++) {
				const index = indexes[i];
				resultOptions.push({ value: countNegatives(cells, computeChangeDescNE(mod, index).concat(computeChangeDescNW(mod, index))), hint: { index: index, direction: 'SW'}})
				resultOptions.push({ value: countNegatives(cells, computeChangeDescEE(mod, index).concat(computeChangeDescNN(mod, index))), hint: { index: index, direction: 'WW'}})
			}
			return randSel(getMaximalHint(resultOptions));
		}
	}
	if (allPositive(cells)) { // alle cellen bevatten waarde groter dan 0
		if (boardType === 'line1d') {
			return { index: randSel(getIndexesLowest(cells)), direction: 'WW' };
		}
		if (boardType === 'line2d') {
			const indexes = getIndexesLowest(cells);
			const resultOptions = [];
			for (let i = 0; i < indexes.length; i++) {
				const index = indexes[i];
				resultOptions.push({ value: getMinimum(cells, computeChangeDescNW(mod, index)), hint: { index: index, direction: 'SE'}})
				resultOptions.push({ value: getMinimum(cells, computeChangeDescNN(mod, index)), hint: { index: index, direction: 'SS'}})
				resultOptions.push({ value: getMinimum(cells, computeChangeDescNE(mod, index)), hint: { index: index, direction: 'SW'}})
				resultOptions.push({ value: getMinimum(cells, computeChangeDescEE(mod, index)), hint: { index: index, direction: 'WW'}})
			}
			return randSel(getMaximalHint(resultOptions));
		}
		if (boardType === 'cross2d') {
			const indexes = getIndexesLowest(cells);
			const resultOptions = [];
			for (let i = 0; i < indexes.length; i++) {
				const index = indexes[i];
				resultOptions.push({ value: getMinimum(cells, computeChangeDescNE(mod, index).concat(computeChangeDescNW(mod, index))), hint: { index: index, direction: 'SW'}})
				resultOptions.push({ value: getMinimum(cells, computeChangeDescEE(mod, index).concat(computeChangeDescNN(mod, index))), hint: { index: index, direction: 'WW'}})
			}
			return randSel(getMaximalHint(resultOptions));
		}
	}
	if (noneNegative(cells)) { // alle cellen bevatten waarde groter dan of gelijk aan 0; tenminste 1 cell bevat 0
		if (boardType === 'line1d') {
			return { index: randSel(getIndexesHighest(cells)), direction: 'EE' };
		}
		if (boardType === 'line2d') {
			const indexes = getIndexesHighest(cells);
			const resultOptions = [];
			for (let i = 0; i < indexes.length; i++) {
				const index = indexes[i];
				resultOptions.push({ value: countZeroes(cells, computeChangeDescNW(mod, index)), hint: { index: index, direction: 'NW'}})
				resultOptions.push({ value: countZeroes(cells, computeChangeDescNN(mod, index)), hint: { index: index, direction: 'NN'}})
				resultOptions.push({ value: countZeroes(cells, computeChangeDescNE(mod, index)), hint: { index: index, direction: 'NE'}})
				resultOptions.push({ value: countZeroes(cells, computeChangeDescEE(mod, index)), hint: { index: index, direction: 'EE'}})
			}
			return randSel(getMaximalHint(resultOptions));
		}
		if (boardType === 'cross2d') {
			const indexes = getIndexesHighest(cells);
			const resultOptions = [];
			for (let i = 0; i < indexes.length; i++) {
				const index = indexes[i];
				resultOptions.push({ value: countZeroes(cells, computeChangeDescNE(mod, index).concat(computeChangeDescNW(mod, index))), hint: { index: index, direction: 'NE'}})
				resultOptions.push({ value: countZeroes(cells, computeChangeDescEE(mod, index).concat(computeChangeDescNN(mod, index))), hint: { index: index, direction: 'EE'}})
			}
			return randSel(getMaximalHint(resultOptions));
		}
	}
	if (true) { // er zijn cellen met waarde kleiner dan nul en er zijn cellen met waarde groter dan nul
		if (boardType === 'line1d') {
			return { index: randSel(getIndexesHighest(cells)), direction: 'EE' };
		}
		if (boardType === 'line2d') {
			const indexes = getIndexesPositive(cells);
			const resultOptions = [];
			for (let i = 0; i < indexes.length; i++) {
				const index = indexes[i];
				resultOptions.push({ value: countNegatives(cells, computeChangeDescNW(mod, index)), hint: { index: index, direction: 'NW'}})
				resultOptions.push({ value: countNegatives(cells, computeChangeDescNN(mod, index)), hint: { index: index, direction: 'NN'}})
				resultOptions.push({ value: countNegatives(cells, computeChangeDescNE(mod, index)), hint: { index: index, direction: 'NE'}})
				resultOptions.push({ value: countNegatives(cells, computeChangeDescEE(mod, index)), hint: { index: index, direction: 'EE'}})
			}	
			return randSel(getMaximalHint(resultOptions));
		}
		if (boardType === 'cross2d') {
			const indexes = getIndexesPositive(cells);
			const resultOptions = [];
			for (let i = 0; i < indexes.length; i++) {
				const index = indexes[i];
				resultOptions.push({ value: countNegatives(cells, computeChangeDescNE(mod, index).concat(computeChangeDescNW(mod, index))), hint: { index: index, direction: 'NE'}})
				resultOptions.push({ value: countNegatives(cells, computeChangeDescEE(mod, index).concat(computeChangeDescNN(mod, index))), hint: { index: index, direction: 'EE'}})
			}		
			return randSel(getMaximalHint(resultOptions));
		}
	}
};

const predicateAllOne = (accu, value) => (accu && (value == 1));
const allOne = (intList) => (foldl(intList, predicateAllOne, true));

const predicateAllZeroOne = (accu, value) => (accu && (value == 0 || value == 1));
const allZeroOne = (intList) => (foldl(intList, predicateAllZeroOne, true));

const predicateNonePositive = (accu, value) => (accu && (value <= 0));
const nonePositive = (intList) => (foldl(intList, predicateNonePositive, true));

const predicateNoneNegative = (accu, value) => (accu && (value >= 0));
const noneNegative = (intList) => (foldl(intList, predicateNoneNegative, true));

const predicateAllPositive = (accu, value) => (accu && (value > 0));
const allPositive = (intList) => (foldl(intList, predicateAllPositive, true));

const predicateIndexesLowest = ({ indexes, lowestValue, index }, value) => {
	if (value < lowestValue) {
		return { indexes: [index], lowestValue: value, index: index + 1 };
	}
	else if (value == lowestValue) {
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
	else if (value == highestValue) {
		return { indexes: indexes.concat([index]), highestValue: highestValue, index: index + 1 };
	}
	else {
		return { indexes: indexes, highestValue: highestValue, index: index + 1 };
	}
};
const getIndexesHighest = (intList) => (foldl(intList, predicateIndexesHighest, { indexes: [], highestValue: -Infinity, index: 0 }).indexes);

const getIndexesAll = (intList) => (intList.map((value, index) => index));

const predicateIndexesZeroes = ({ indexes, index }, value) => {
	if (value == 0) {
		return { indexes: indexes.concat([index]), index: index + 1 };
	}
	else {
		return { indexes: indexes, index: index + 1};
	}
};
const getIndexesZeroes = (intList) => (foldl(intList, predicateIndexesZeroes, { indexes: [], index: 0 }).indexes);

const predicateIndexesPositive = ({ indexes, index }, value) => {
	if (value > 0) {
		return { indexes: indexes.concat([index]), index: index + 1 };
	}
	else {
		return { indexes: indexes, index: index + 1};
	}
};
const getIndexesPositive = (intList) => (foldl(intList, predicateIndexesPositive, { indexes: [], index: 0 }).indexes);

const predicateMaximalHint = ({ highestValue, hints }, { value, hint }) => {
	if (value > highestValue) {
		return { hints: [hint], highestValue: value };
	}
	else if (value == highestValue) {
		return { hints: hints.concat([hint]), highestValue: highestValue };
	}
	else {
		return { hints: hints, highestValue: highestValue };
	}
};
const getMaximalHint = (hintList) => (foldl(hintList, predicateMaximalHint, { hints: [hintList[0].hint], highestValue: hintList[0].value }).hints);

const predicateMinimalHint = ({ lowestValue, hints }, { value, hint }) => {
	if (value < lowestValue) {
		return { hints: [hint], lowestValue: value };
	}
	else if (value == lowestValue) {
		return { hints: hints.concat([hint]), lowestValue: lowestValue };
	}
	else {
		return { hints: hints, lowestValue: lowestValue };
	}
};
const getMinimalHint = (hintList) => (foldl(hintList, predicateMinimalHint, { hints: [hintList[0].hint], lowestValue: hintList[0].value }).hints);

const countNegatives = (elementList, indexSelection) => {
	const predicateCountNegatives = (accu, index) => (elementList[index] < 0 ? accu + 1 : accu);
	return (foldl(indexSelection, predicateCountNegatives, 0));
};

const countZeroes = (elementList, indexSelection) => {
	const predicateCountZeroes = (accu, index) => (elementList[index] == 0 ? accu + 1 : accu);
	return foldl(indexSelection, predicateCountZeroes, 0);
}

const predicateMinimum = (accu, value) => (value < accu ? value : accu);
const getMinimum = (intList) => (foldl(intList, predicateMinimum, intList[0]));

const predicateMaximum = (accu, {index, value}) => (value > accu ? value : accu);
const getMaximum = (intList) => (foldl(intList, predicateMaximum, intList[0]));

const randSel = (lst) => {
	const index = Math.floor(Math.random() * lst.length);
	return lst[index];
};
















	
