import { PlaySeq } from './PlaySeq';

export function CalcTable(boardSize, moveDirs, depth) {
    const rootPlaySeq = new PlaySeq(initArray(boardSize));
    rootPlaySeq.minSteps = 0;
    rootPlaySeq.processed = false;
    const key = rootPlaySeq.toKey();
    this.boardSize = boardSize;
    this.table = {};
    this.table[key] = rootPlaySeq;
    this.processTable(boardSize, moveDirs, depth);
};

CalcTable.prototype = {
    constructor: CalcTable,
    processTable: function(boardSize, moveDirs, depth) {
        for (let numIter = 0; numIter < depth; numIter++) {
            const newTable = {};
            for (let prop in this.table) {
                const playSeq = this.table[prop];
                if (!playSeq.processed) {
                    for (let index = 0; index < boardSize; index++) {
                        moveDirs.forEach((dir) => {
                            const newPlaySeq = playSeq.move(dir, index);
                            const newKey = newPlaySeq.toKey();
                            if (this.table[newKey] === undefined && newTable[newKey] === undefined) {
                                newTable[newKey] = newPlaySeq;
                            }
                        })
                    }
                    playSeq.processed = true;
                }
                newTable[prop] = playSeq;
            }
            this.table = newTable;
        }
    },
};

const initArray = (boardSize) => {
    let result = [];
    result.length = boardSize;
    return result.fill(0);
}
