
// function for computing cell connections

export const computeChangeDesc = (bsH, bsV, cellId, direction) => {
	let res = [];
	for (let i = 0; i < bsH * bsV; i++) {
		if (i != cellId) {
			res.push(i);
		}
	}
	switch (direction) {
		case 'MB': {
			return { factor: -1, order: 'B', cells: res };
		};
		case 'PB': {
			return { factor: 1, order: 'B', cells: res };
		};
		case 'MA': {
			return { factor: -1, order: 'A', cells: res };
		};
		case 'PA': {
			return { factor: 1, order: 'A', cells: res };
		};
		default: {
			return { factor: 0, order: '', cells: [] };
		};
	}
};

// functions for generating cell content

const generateCellNumber = ({ lb, ub }) => ((lb == ub ? lb : lb + Math.floor(Math.random() * (ub - lb + 1))));

export const generateCells = (number, valuePool) => {
	let res = [];
	for (let i = 0; i < number; i++) {
		res.push(generateCellNumber(valuePool));
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

	if (allOne(cells)) { // alle cellen bevatten 1
		return { index: randSel(getIndexesAll(cells)), direction: 'MB' };
	}
	if (allZeroOne(cells)) { // alle cellen bevatten 0 of 1
		return { index: randSel(getIndexesZeroes(cells)), direction: 'PB' };
	}
	if (nonePositive(cells)) { // alle cellen bevatten waarden kleiner dan 0
		return { index: randSel(getIndexesLowest(cells)), direction: 'MB' };
	}
	if (allPositive(cells)) { // alle cellen bevatten waarde groter dan 0
		return { index: randSel(getIndexesLowest(cells)), direction: 'MB' };
	}
	if (noneNegative(cells)) { // alle cellen bevatten waarde groter dan of gelijk aan 0; tenminste 1 cell bevat 0
		return { index: randSel(getIndexesHighest(cells)), direction: 'PB' };
	}
	if (true) { // er zijn cellen met waarde kleiner dan nul en er zijn cellen met waarde groter dan nul
		return { index: randSel(getIndexesHighest(cells)), direction: 'PB' };
	}
};

const predicateAllOne = (accu, value) => (accu && (value == 1));
const allOne = (intList) => (foldl(intList, predicateAllOne, true));

const predicateAllZeroOne = (accu, value) => (accu && (value == 0 || value == 1));
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

const randSel = (lst) => {
	const index = Math.floor(Math.random() * lst.length);
	return lst[index];
};
