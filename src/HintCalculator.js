import { CalcTable } from './CalcTable';
import { PlaySeq } from './PlaySeq';
import { SList } from './SList';

const strategyId = (playSeq, boardIndices, moveDirSet, table) => {
    return playSeq;
};

const strategyB0 = (playSeq, boardIndices, moveDirSet, table) => {
    let trials = SList.empty();
    boardIndices.forEach((i) => {
        moveDirSet.forEach((dir) => {
            trials = trials.push(playSeq.move(dir, i));
        })
    })
    return trials.minBy((trial) => getFutureAbsLargest(trial, boardIndices, moveDirSet, table, 0)).head;
};

const strategyB1 = (playSeq, boardIndices, moveDirSet, table) => {
    let trials = SList.empty();
    boardIndices.forEach((i) => {
        moveDirSet.forEach((dir) => {
            trials = trials.push(playSeq.move(dir, i));
        })
    })
    return trials.minBy((trial) => getFutureAbsLargest(trial, boardIndices, moveDirSet, table, 1)).head;
};

const strategyB2 = (playSeq, boardIndices, moveDirSet, table) => {
    let trials = SList.empty();
    boardIndices.forEach((i) => {
        moveDirSet.forEach((dir) => {
            trials = trials.push(playSeq.move(dir, i));
        })
    })
    return trials.minBy((trial) => getFutureAbsLargest(trial, boardIndices, moveDirSet, table, 2)).head;
};

const strategyB3 = (playSeq, boardIndices, moveDirSet, table) => {
    let trials = SList.empty();
    boardIndices.forEach((i) => {
        moveDirSet.forEach((dir) => {
            trials = trials.push(playSeq.move(dir, i));
        })
    })
    return trials.minBy((trial) => getFutureAbsLargest(trial, boardIndices, moveDirSet, table, 3)).head;
};

const strategyG1 = (playSeq, boardIndices, moveDirSet, table) => {
    const depth = 2;
    let trials = SList.empty();
    boardIndices.forEach((i) => {
        moveDirSet.forEach((dir) => {
            trials = trials.push(playSeq.move(dir, i));
        })
    })
    trials = trials.sort((trial1, trial2) => getFutureAbsLargest(trial1, boardIndices, moveDirSet, table, depth) - getFutureAbsLargest(trial2, boardIndices, moveDirSet, table, depth));
    const r = randInt(4);
    if (r === 1) return trials.tail.head;
    else return trials.head;
};

const strategyG2 = (playSeq, boardIndices, moveDirSet, table) => {
    const depth = 2;
    let trials = SList.empty();
    boardIndices.forEach((i) => {
        moveDirSet.forEach((dir) => {
            trials = trials.push(playSeq.move(dir, i));
        })
    })
    trials = trials.sort((trial1, trial2) => getFutureAbsLargest(trial1, boardIndices, moveDirSet, table, depth) - getFutureAbsLargest(trial2, boardIndices, moveDirSet, table, depth));
    const r = randInt(5);
    if (r === 2) return trials.tail.tail.head;
    else if (r === 1) return trials.tail.head;
    else return trials.head;
};

const strategyG3 = (playSeq, boardIndices, moveDirSet, table) => {
    const depth = 2;
    let trials = SList.empty();
    boardIndices.forEach((i) => {
        moveDirSet.forEach((dir) => {
            trials = trials.push(playSeq.move(dir, i));
        })
    })
    trials = trials.sort((trial1, trial2) => getFutureAbsLargest(trial1, boardIndices, moveDirSet, table, depth) - getFutureAbsLargest(trial2, boardIndices, moveDirSet, table, depth));
    const r = randInt(6);
    if (r === 3) return trials.tail.tail.tail.head;
    else if (r === 2) return trials.tail.tail.head;
    else if (r === 1) return trials.tail.head;
    else return trials.head;
};

const strategyG4 = (playSeq, boardIndices, moveDirSet, table) => {
    const depth = 2;
    let trials = SList.empty();
    boardIndices.forEach((i) => {
        moveDirSet.forEach((dir) => {
            trials = trials.push(playSeq.move(dir, i));
        })
    })
    trials = trials.sort((trial1, trial2) => getFutureAbsLargest(trial1, boardIndices, moveDirSet, table, depth) - getFutureAbsLargest(trial2, boardIndices, moveDirSet, table, depth));
    const r = randInt(7);
    if (r === 4) return trials.tail.tail.tail.tail.head;
    else if (r === 3) return trials.tail.tail.tail.head;
    else if (r === 2) return trials.tail.tail.head;
    else if (r === 1) return trials.tail.head;
    else return trials.head;
};

const getFutureAbsLargest = (playSeq, boardIndices, moveDirSet, table, depth) => {
    if (playSeq.absLargest === 0) {
        return 0;
    }
    else if (depth === 0) {
        const nextPlaySeq = table[playSeq.toKey()];
        if (nextPlaySeq !== undefined) {
            return nextPlaySeq.minSteps;
        }
        else {
            return 10 * playSeq.absLargest();
        }
    }
    else {
        let results = SList.empty();
        boardIndices.forEach((i) => {
            moveDirSet.forEach((dir) => {
                results = results.push(getFutureAbsLargest(playSeq.move(dir, i), boardIndices, moveDirSet, table, depth - 1));
            })
        })
        return results.minBy((val) => val).head;
    }
};

const mapBoardIndices = [[], [0], [0, 1], [0, 1, 2], [0, 1, 2, 3], [0, 1, 2, 3, 4], [0, 1, 2, 3, 4, 5]];

const revDirs = {
    addInc: 'decSub',
    subDec: 'incAdd',
    incAdd: 'subDec',
    decSub: 'addInc'
};

const mapMoveDirs = {
    all: ['addInc', 'subDec', 'incAdd', 'decSub'],
    addIncSubDec: ['addInc', 'subDec'],
    addIncDecSub: ['addInc', 'decSub'],
    incAddSubDec: ['incAdd', 'subDec'],
    incAddDecSub: ['incAdd', 'decSub']
};

const mapRevMoveDirs = {
    all: ['addInc', 'subDec', 'incAdd', 'decSub'],
    addIncSubDec: ['incAdd', 'decSub'],
    addIncDecSub: ['addInc', 'decSub'],
    incAddSubDec: ['incAdd', 'subDec'],
    incAddDecSub: ['addInc', 'subDec'],
};

const mapIterLimits = {
    all: [0, 0, 11, 7, 5, 5],
    addIncSubDec: [0, 0, 12, 8, 6, 5],
    addIncDecSub: [0, 0, 13, 8, 6, 6],
    incAddSubDec: [0, 0, 13, 8, 7, 6],
    incAddDecSub: [0, 0, 13, 8, 7, 5]
};

const mapStrategies = {
    all: [strategyId, strategyId, strategyB3, strategyB2, strategyG3, strategyG4],
    addIncSubDec: [strategyId, strategyId, strategyB3, strategyB3, strategyG2, strategyG2],
    addIncDecSub: [strategyId, strategyId, strategyB3, strategyG1, strategyG2, strategyG2],
    incAddSubDec: [strategyId, strategyId, strategyB3, strategyG1, strategyG2, strategyG2],
    incAddDecSub: [strategyId, strategyId, strategyB3, strategyB3, strategyG2, strategyG2]
};

export function HintCalculator(boardSize, moveDirs) {
    this.boardSize = boardSize;
    this.boardIndices = mapBoardIndices[boardSize];
    this.moveDirs = moveDirs;
    this.moveDirSet = mapMoveDirs[moveDirs];
    this.table = (new CalcTable(boardSize, mapRevMoveDirs[moveDirs], mapIterLimits[moveDirs][boardSize])).table;
}

HintCalculator.prototype = {
	constructor: HintCalculator,
    calcHint: function(cellArray) {
        const playSeq = new PlaySeq(cellArray);
        if (playSeq.absLargest() === 0) {
            return { direction: 'NO', index: 0 };
        }
        else {
        	const newPlaySeq = this.step(playSeq);
            return { direction: revDirs[newPlaySeq.optimalDir], index: newPlaySeq.optimalIndex };
        }
    },
    step: function(playSeq) {
        const storedPlaySeq = this.table[playSeq.toKey()];
        if (storedPlaySeq !== undefined) {
            return storedPlaySeq.optMove();
        }
        else {
            return mapStrategies[this.moveDirs][this.boardSize](playSeq, this.boardIndices, this.moveDirSet, this.table);
        }
    },
    traverse: function(playSeq) {
		let counter = 0;
		while (playSeq.absLargest() > 0 && counter < 1000) {
			//System.out.println(playSeq.toKey());
            playSeq = this.step(playSeq);
			counter += 1;
		}
		if (counter === 1000) {
			console.log("LOOPING TERMINATED...");
			console.log("#" + this.numVal + " ^" + this.moveDirs);
		}
		return counter;
	},
    testHintCalculator: function() {
        let sum = 0;
        for (let n = 0; n < 1000; n++) {
            let playSeq = genRandPlaySeq(this.boardSize);
            const logAbsLargest = playSeq.logAbsLargest();
            const counter = this.traverse(playSeq);
            if (counter === 1000) {
                console.log("Key " + playSeq.toKey());
                console.log("---------------------------------------------------------------------");
            }
            const ratio = counter / logAbsLargest;
            sum += ratio;
            if (ratio > 100) console.log("DONE " + counter + " " + logAbsLargest + " " + ratio);
        }
        console.log("Directions: " + this.moveDirs + " Number: " + this.boardSize);
        console.log("Average Ratio: " + sum / 1000);
        console.log("---------------------------------------------------------------------");
    },
    numEntries: function(dist) {
        let result = 0;
        for (let prop in this.table) {
            result += 1;
        }
        return result;
    },
};

const randInt = (n) => {
    return Math.floor(Math.random() * n);
}

const randVal = (n) => {
    const rnd = randInt(2 * n);
    return (rnd < n ? rnd + 1 : rnd - 2 * n);
}

const genRandPlaySeq = (boardSize) => {
    let res = [];
	res.length = boardSize;
    res.fill(0);
    return new PlaySeq(res.map((val) => randVal(1000)));
}
