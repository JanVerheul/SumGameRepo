
///////////////////////////////////////////
// function for computing cell opertions //
///////////////////////////////////////////

export const computeChange = (cells, cellIndex, direction) => {
	const factor = (direction === 'incAdd' || direction === 'addInc' ? 1 : -1);
	const order = (direction === 'incAdd' || direction === 'decSub' ? 'after' : 'before');
	const oldVal = cells[cellIndex];
	const newVal = oldVal + factor;
	const calcNext = (val, i) => (i === cellIndex ? newVal : cells[i] + (order === 'after' ? newVal : oldVal) * factor);
	return cells.map(calcNext);
};

export const getNegativesGuardList = (cells) => {
	let result = [];
	for (let i = 0; i < cells.length; i++) {
		let guard = {};
		const newCellsSubDec = computeChange(JSON.parse(JSON.stringify(cells)), i, 'subDec');
		if (containsNegatives(newCellsSubDec)) {
			guard.subDec = 'subDec';
		}
		const newCellsDecSub = computeChange(JSON.parse(JSON.stringify(cells)), i, 'decSub');
		if (containsNegatives(newCellsDecSub)) {
			guard.decSub = 'decSub';
		}
		result.push(guard);
	}
	return result;
};

const containsNegatives = (cells) => {
	let result = false;
	cells.forEach((val) => {
		if (val < 0) result = true;
	});
	return result;
};

///////////////////////////////////////////
// functions for generating cell content //
///////////////////////////////////////////

const generateCellNumber = ({ lb, ub }) => ((lb === ub ? lb : lb + Math.floor(Math.random() * (ub - lb + 1))));

const fixedValues = [559, 807, 624, 635, 0, 0]; // for testing and experimenting purposes

const initialValues = [[], [0], [0, 0], [0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]];

export const generateCells = (number, valuePool, noNegatives) => {
	let res = initialValues[number];
	if (valuePool.lb === 0) {
		res = res.map((dummy, index) => fixedValues[index]);
	}
	else {
		res = res.map((dummy) => (noNegatives ? Math.abs(generateCellNumber(valuePool)) : generateCellNumber(valuePool)) );
	}
	return res;
};

///////////////////////////////
// general utility functions //
///////////////////////////////

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
	iterable.forEach((elem) => {
		accu = f(accu, elem);
	})
	return accu;
}

const twoPos = (num) => (num < 10 ? '0' + num : num);
