/*
 * SList is a home made implementation of a singly linked list.
 * SList is used in the implementation of Connected Sums Game
 * JavaScript lacks a singly linked list implementation with the
 * desired functionality.
 *
 * Most functions on SList are implemented by recursive algorithms.
 * This has the disadvantage that processing of very long lists will
 * cause stack overflow errors. However, there won't be very long
 * lists in the Sudoku Web Lab implementation.
 *
 * Stack overflow errors with recursion can be avoided by using
 * tail recursion. However, this is only a remedy when the compiler
 * supports tail recursion optimization. This seems not to be the
 * case for most current implementations of JavaScript compilers.
 * So there was no advantage in chosing tail recursion where this
 * would have been possible with a bit more programming effort.
 *
 * The advantage of using recursion instead of an imperative
 * solution is that recursive solutions are usually easier to
 * understand and less errorprone.
 */

export function SList(head, tail) {
	// make properties read only, so the data structure is immutable
	Object.defineProperty(this, 'head', {
	    value: head,
	    writable: false
	});
	Object.defineProperty(this, 'tail', {
	    value: tail,
	    writable: false
	});
}
SList.prototype = {
	constructor: SList,

	/* getters */
	getAt: function(index) {
		if (index === 0) return this.head;
		else return this.tail.getAt(index - 1);
	},

	/* inquirers */
	isEmpty: function() {
		return false;
	},
	size: function() {
		return 1 + this.tail.size();
	},
	contains: function(elem, comparator) {
		return SList.contains(this, elem, comparator);
	},
	containsList: function(sList, comparator) {
		return SList.containsList(this, sList, comparator);
	},

	/* extenders */
	push: function(elem) {
		return new SList(elem, this);
	},
	insertOrdered: function(elem, comparator) {
		return SList.insertOrdered(this, elem, comparator);
	},
	insertAbsentOrdered: function(elem, comparator) {
		return SList.insertAbsentOrdered(this, elem, comparator);
	},
	append: function(sList) {
		return SList.append(this, sList);
	},

	/* reductors */
	drop: function(n) {
		return SList.drop(this, n);
	},
	take: function(n) {
		return SList.take(this, n);
	},
	slice: function(m, n) {
		return SList.take(SList.drop(this, m), (n - m));
	},
	removeOne: function(elem, comparator) {
		return SList.removeOne(this, elem, comparator);
	},
	removeAll: function(elem, comparator) {
		return SList.removeAll(this, elem, comparator);
	},
	removeListOne: function(sList, comparator) {
		return SList.removeListOne(this, sList, comparator);
	},
	removeListAll: function(sList, comparator) {
		return SList.removeListAll(this, sList, comparator);
	},

	/* mutators */
	reverse: function() {
		return SList.reverse(this);
	},
	sort: function(compare) {
		return SList.sort(this, compare);
	},
	merge: function(sList, compare) {
		return SList.merge(this, sList, compare);
	},
	setMerge: function(sList, compare) {
		return SList.setMerge(this, sList, compare);
	},

	/* higher order workers */
	forEach: function(f) {
		return SList.forEach(this, f);
	},
	forEachIndex: function(f) {
		return SList.forEachIndex(this, f);
	},
	forEach2: function(sList, f) {
		return SList.forEach2(this, sList, f);
	},
	filter: function(pred) {
		return SList.filter(this, pred);
	},
	minBy: function(f) {
		return SList.minBy(this, f);
	},
	maxBy: function(f) {
		return SList.maxBy(this, f);
	},
	foldRight: function(operator, initVal) {
		return SList.foldRight(this, operator, initVal);
	},
	foldLeft: function(operator, initVal) {
		return SList.foldLeft(this, operator, initVal);
	},
	map: function(f) {
		return SList.map(this, f);
	},
	flatMap: function(f) {
		return SList.flatMap(this, f);
	},
	map2: function(sList, f) {
		return SList.map(this, sList, f);
	},
	mapIndex: function(f) {
		return SList.mapIndex(this, f);
	},
	union: function(sList, comparator) {
		return SList.union(this, sList, comparator);
	},
	intersect: function(sList, comparator) {
		return SList.intersect(this, sList, comparator);
	},
	flatten: function() {
		return SList.flatten(this);
	},
	forAll: function(pred) {
		return SList.forAll(this, pred);
	},
	exists: function(pred) {
		return SList.exists(this, pred);
	},
	find: function(p) {
		return SList.find(this, p);
	},
	findMapped: function(f, p) {
		return SList.findMapped(this, f, p);
	},
	findLeveled: function(p, level) {
		return SList.findLeveled(this, p, level);
	},

	/* converters */
	toString: function() {
		let result = 'SList(';
		result = result + this.head.toString();
		let walker = this.tail;
		while (!walker.isEmpty()) {
			result = result + ', ';
			result = result + walker.head.toString();
			walker = walker.tail;
		}
		result = result + ')';
		return result;
	},
	toArray: function() {
		const result = [];
		let walker = this;
		while (!walker.isEmpty()) {
			result.push(walker.head);
			walker = walker.tail;
		}
		return result;
	},

	/* general utility */
	equals: function(sList, comparator) {
		return SList.equals(this, sList, comparator);
	},
	cloneShallow: function() {
		return SList.cloneShallow(this);
	},

}

/* factory methods */
SList.empty = () => {
	if (SList.emptyVal === undefined) {
		SList.emptyVal = new SNil();
	}
	return SList.emptyVal;
}
SList.cons = (elemArray) => {
	let result = SList.empty();
	for (let i = elemArray.length - 1; i >= 0; i--) result = new SList(elemArray[i], result);
	return result;
}
SList.single = (elem) => {
	return new SList(elem, SList.empty());
}
SList.pair = (elem1, elem2) => {
	return new SList(elem1, new SList(elem2, SList.empty()));
}
SList.triple = (elem1, elem2, elem3) => {
	return new SList(elem1, new SList(elem2, new SList(elem3, SList.empty())));
}

/* inquirers */
SList.sizeTailRec = (sList, partResult) => {
	if (sList.isEmpty()) return partResult;
	else return SList.sizeTailRec(sList.tail, partResult + 1);
}
SList.contains = (sList, elem, comparator) => {
	if (sList.isEmpty()) return false
	else if (comparator) {
		if (comparator(sList.head, elem) === 0) return true;
		else return SList.contains(sList.tail, elem, comparator);
	}
	else if (elem.equals) {
		if (elem.equals(sList.head)) return true;
		else return SList.contains(sList.tail, elem, comparator);
	}
	else if (elem.compareTo) {
		if (elem.compareTo(sList.head) === 0) return true;
		else return SList.contains(sList.tail, elem, comparator);
	}
	else {
		if (elem === sList.head) return true;
		else return SList.contains(sList.tail, elem, comparator);
	}
}
SList.containsList = (sList, elems, comparator) => {
	if (sList.isEmpty()) return false
	else if (elems.isEmpty()) return true
	else return SList.contains(sList, elems.head, comparator) && SList.containsList(sList, elems.tail, comparator);
}


/* extenders */
SList.insertOrdered = (sList, elem, comparator) => {
	if (comparator) {
		if (sList.isEmpty()) return new SList(elem, sList)
		else if (comparator(sList.head, elem) >= 0) return new SList(elem, sList)
		else return new SList(sList.head, SList.insertOrdered(sList.tail, elem, comparator));
	}
	else if (elem.compareTo) {
		if (sList.isEmpty()) return new SList(elem, sList)
		else if (elem.compareTo(sList.head) <= 0) return new SList(elem, sList)
		else return new SList(sList.head, SList.insertOrdered(sList.tail, elem, comparator));
	}
	else {
		if (sList.isEmpty()) return new SList(elem, sList)
		else if (sList.head >= elem) return new SList(elem, sList)
		else return new SList(sList.head, SList.insertOrdered(sList.tail, elem, comparator));
	}
}
SList.insertAbsentOrdered = (sList, elem, comparator) => {
	if (comparator) {
		if (sList.isEmpty()) return new SList(elem, sList)
		else if (comparator(sList.head, elem) === 0) return sList
		else if (comparator(sList.head, elem) > 0) return new SList(elem, sList)
		else return new SList(sList.head, SList.insertAbsentOrdered(sList.tail, elem, comparator));
	}
	else if (elem.compareTo) {
		if (sList.isEmpty()) return new SList(elem, sList)
		else if (elem.compareTo(sList.head) === 0) return sList
		else if (elem.compareTo(sList.head) < 0) return new SList(elem, sList)
		else return new SList(sList.head, SList.insertAbsentOrdered(sList.tail, elem, comparator));
	}
	else {
		if (sList.isEmpty()) return new SList(elem, sList)
		else if (sList.head === elem) return sList
		else if (sList.head > elem) return new SList(elem, sList)
		else return new SList(sList.head, SList.insertAbsentOrdered(sList.tail, elem, comparator));
	}
}
SList.append = (sList1, sList2) => {
	if (sList1.isEmpty()) return sList2;
	else return new SList(sList1.head, SList.append(sList1.tail, sList2));
}

/* reductors */
SList.drop = (sList, n) => {
	if (sList.isEmpty() || n === 0) return sList
	else return SList.drop(sList.tail, n - 1);
}
SList.take = (sList, n) => {
	if (sList.isEmpty() || n === 0) return SList.empty()
	else return new SList(sList.head, SList.take(sList.tail, n - 1));
}
SList.removeOne = (sList, elem, comparator) => {
	if (sList.isEmpty()) return sList
	else if (comparator) {
		if (comparator(sList.head, elem) === 0) return sList.tail
		else return new SList(sList.head, SList.removeOne(sList.tail, elem, comparator));
	}
	else if (elem.equals) {
		if (elem.equals(sList.head)) return sList.tail;
		else return new SList(sList.head, SList.removeOne(sList.tail, elem, comparator));
	}
	else if (elem.compareTo) {
		if (elem.compareTo(sList.head) === 0) return sList.tail;
		else return new SList(sList.head, SList.removeOne(sList.tail, elem, comparator));
	}
	else {
		if (elem === sList.head) return sList.tail;
		else return new SList(sList.head, SList.removeOne(sList.tail, elem, comparator));
	}
}
SList.removeAll = (sList, elem, comparator) => {
	if (sList.isEmpty()) return sList
	else if (comparator) {
		if (comparator(sList.head, elem) === 0) return SList.removeAll(sList.tail, elem, comparator)
		else return new SList(sList.head, SList.removeAll(sList.tail, elem, comparator));
	}
	else if (elem.equals) {
		if (elem.equals(sList.head)) return SList.removeAll(sList.tail, elem, comparator);
		else return new SList(sList.head, SList.removeAll(sList.tail, elem, comparator));
	}
	else if (elem.compareTo) {
		if (elem.compareTo(sList.head) === 0) return SList.removeAll(sList.tail, elem, comparator);
		else return new SList(sList.head, SList.removeAll(sList.tail, elem, comparator));
	}
	else {
		if (elem === sList.head) return SList.removeAll(sList.tail, elem, comparator);
		else return new SList(sList.head, SList.removeAll(sList.tail, elem, comparator));
	}
}
SList.removeListOne = (sList1, sList2, comparator) => {
	if (sList1.isEmpty() || sList2.isEmpty()) return sList1
	else return new SList.removeOne(SList.removeListOne(sList1, sList2.tail, comparator), sList2.head, comparator);
}
SList.removeListAll = (sList1, sList2, comparator) => {
	if (sList1.isEmpty() || sList2.isEmpty()) return sList1
	else return new SList.removeAll(SList.removeListAll(sList1, sList2.tail, comparator), sList2.head, comparator);
}
SList.removeDoublesShallow = (sList) => {
	if (sList.isEmpty()) return sList
	else removeDoublesShallowRec(sList.tail, sList.head);
}
const removeDoublesShallowRec = (sList, elem) => {
	if (sList.isEmpty()) return SList.single(elem)
	else if (sList.head === elem) return removeDoublesShallowRec(sList.tail, elem)
	else new SList(elem, removeDoublesShallowRec(sList.tail, sList.head));
}
SList.removeDoublesDeep = (sList) => {
	if (sList.isEmpty()) return sList
	else removeDoublesDeepRec(sList.tail, sList.head);
}
const removeDoublesDeepRec = (sList, elem) => {
	if (sList.isEmpty()) return SList.single(elem)
	else if (sList.head.equals(elem)) return removeDoublesDeepRec(sList.tail, elem)
	else new SList(elem, removeDoublesDeepRec(sList.tail, sList.head));
}


/* mutators */
SList.reverse = (sList) => reverseRec(sList, SList.empty())
function reverseRec(sList, partResult) {
	if (sList.isEmpty()) return partResult;
	else return reverseRec(sList.tail, new SList(sList.head, partResult));
}
SList.sort = (sList, compare) => {
	const length = sList.size();
	if (length > 1)	return mergeSort(sList, 0, length, compare);
	else return sList;
}
const mergeSort = (sList, lowerInc, upperEx, compare) => {
	const halfWay = Math.floor((lowerInc + upperEx) / 2);
	let lowerPart;
	let upperPart;
	if (lowerInc + 1 === halfWay) lowerPart = SList.single(sList.getAt(lowerInc));
	else lowerPart = mergeSort(sList, lowerInc, halfWay, compare);
	if (halfWay + 1 === upperEx) upperPart = SList.single(sList.getAt(halfWay));
	else upperPart = mergeSort(sList, halfWay, upperEx, compare);
	return SList.merge(lowerPart, upperPart, compare);
}
SList.merge = (sList1, sList2, compare) => {
	if (sList1.isEmpty()) return sList2;
	else if (sList2.isEmpty()) return sList1;
	else if (compare) {
		if (compare(sList1.head, sList2.head) < 0) return new SList(sList1.head, SList.merge(sList1.tail, sList2, compare));
		else return new SList(sList2.head, SList.merge(sList1, sList2.tail, compare));
	}
	else if (sList1.head.compareTo) {
		if (sList1.head.compareTo(sList2.head) < 0) return new SList(sList1.head, SList.merge(sList1.tail, sList2, compare));
		else return new SList(sList2.head, SList.merge(sList1, sList2.tail, compare));
	}
	else {
		if (sList1.head < sList2.head) return new SList(sList1.head, SList.merge(sList1.tail, sList2, compare));
		else return new SList(sList2.head, SList.merge(sList1, sList2.tail, compare));
	}
}
SList.setMerge = (sList1, sList2, compare) => {
	if (sList1.isEmpty()) return sList2;
	else if (sList2.isEmpty()) return sList1;
	else if (compare) {
		if (compare(sList1.head, sList2.head) < 0) return new SList(sList1.head, SList.setMerge(sList1.tail, sList2, compare));
		else if (compare(sList1.head, sList2.head) === 0) return SList.setMerge(sList1.tail, sList2, compare);
		else return new SList(sList2.head, SList.setMerge(sList1, sList2.tail, compare));
	}
	else if (sList1.head.compareTo) {
		if (sList1.head.compareTo(sList2.head) < 0) return new SList(sList1.head, SList.setMerge(sList1.tail, sList2, compare));
		else if (sList1.head.compareTo(sList2.head) === 0) return SList.setMerge(sList1.tail, sList2, compare);
		else return new SList(sList2.head, SList.setMerge(sList1, sList2.tail, compare));
	}
	else {
		if (sList1.head < sList2.head) return new SList(sList1.head, SList.setMerge(sList1.tail, sList2, compare));
		else if (sList1.head === sList2.head) return SList.setMerge(sList1.tail, sList2, compare)
		else return new SList(sList2.head, SList.setMerge(sList1, sList2.tail, compare));
	}
}
SList.union = (sList1, sList2, comparator) => {
	if (sList1.isEmpty()) return sList2
	else if (sList2.contains(sList1.head, comparator)) return SList.union(sList1.tail, sList2, comparator)
	else return new SList(sList1.head, SList.union(sList1.tail, sList2, comparator));
}
SList.intersect = (sList1, sList2, comparator) => {
	if (sList1.isEmpty()) return sList1
	else if (!sList2.contains(sList1.head, comparator)) return SList.intersect(sList1.tail, sList2, comparator)
	else return new SList(sList1.head, SList.intersect(sList1.tail, sList2, comparator));
}
SList.flatten = (sList) => {
	if (sList.isEmpty()) return sList
	else return sList.head.append(SList.flatten(sList.tail));
}

/* higher order workers */
SList.forEach = (sList, f) => {
	if (!sList.isEmpty()) {
		f(sList.head);
		SList.forEach(sList.tail, f);
	}
}
SList.forEachIndex = (sList, f) => {
	SList.forEachIndexRec(sList, f, 0);
}
SList.forEachIndexRec = (sList, f, index) => {
	if (!sList.isEmpty()) {
		f(sList.head, index);
		SList.forEachIndexRec(sList.tail, f, index + 1);
	}
}
SList.forEach2 = (sList1, sList2, f) => {
	if (!sList1.isEmpty() && !sList2.isEmpty()) {
		f(sList1.head, sList2.head);
		SList.forEach2(sList1.tail, sList2.tail, f);
	}
}
SList.filter = (sList, pred) => {
	if (sList.isEmpty()) return sList;
	else if (pred(sList.head)) return new SList(sList.head, SList.filter(sList.tail, pred));
	else return SList.filter(sList.tail, pred);
}
SList.minBy = (sList, f) => {
	if (sList.isEmpty()) return sList;
	else return SList.minByImpl(sList.tail, f, SList.single(sList.head), f(sList.head));
}
SList.minByImpl = (sList, f, partRes, minVal) => {
	if (sList.isEmpty()) return partRes
	else {
		const headVal = f(sList.head);
		if (headVal === minVal) return SList.minByImpl(sList.tail, f, partRes.push(sList.head), minVal)
		else if (headVal < minVal) return SList.minByImpl(sList.tail, f, SList.single(sList.head), headVal)
		else return SList.minByImpl(sList.tail, f, partRes, minVal);
	}
}
SList.maxBy = (sList, f) => {
	if (sList.isEmpty()) return sList;
	else return SList.maxByImpl(sList.tail, f, sList.head, f(sList.head));
}
SList.maxByImpl = (sList, f, partRes, maxVal) => {
	if (sList.isEmpty()) return partRes
	else {
		const headVal = f(sList.head);
		if (headVal === maxVal) return SList.maxByImpl(sList.tail, f, partRes.push(sList.head), maxVal)
		else if (headVal > maxVal) return SList.maxByImpl(sList.tail, f, SList.single(sList.head), headVal)
		else return SList.maxByImpl(sList.tail, f, partRes, maxVal);
	}
}
SList.foldRight = (sList, operator, initVal) => {
	if (sList.isEmpty()) return initVal;
	else return operator(sList.head, SList.foldRight(sList.tail, operator, initVal));
}
SList.foldLeft = (sList, operator, partResult) => {
	if (sList.isEmpty()) return partResult;
	else return SList.foldLeft(sList.tail, operator, operator(partResult, sList.head));
}
SList.map = (sList, f) => {
	if (sList.isEmpty()) return sList;
	else return new SList(f(sList.head), SList.map(sList.tail, f));
}
SList.flatMap = (sList, f) => {
	if (sList.isEmpty()) return sList;
	else return f(sList.head).append(SList.flatMap(sList.tail, f));
}
SList.map2 = (sList1, sList2, f) => {
	if (sList1.isEmpty() || sList2.isEmpty()) return SList.empty();
	else return new SList(f(sList1.head, sList2.head), SList.map2(sList1.tail, sList2.tail, f));
}
SList.mapIndex = (sList, f) => {
	return SList.mapIndexImpl(sList, f, 0);
}
SList.mapIndexImpl = (sList, f, index) => {
	if (sList.isEmpty()) return sList
	else return new SList(f(sList.head, index), SList.mapIndexImpl(sList.tail, f, index + 1));
}
SList.find = (sList, p) => {
	return findImpl(sList, p, 0);
}
const findImpl = (sList, p, index) => {
	if (sList.isEmpty()) return { idx: -1 };
	else if (p(sList.head)) return { idx: index, obj: sList.head };
	else return findImpl(sList.tail, p, index + 1);
}
SList.findMapped = (sList, f, p) => {
	return findMappedImpl(sList, f, p, 0);
}
const findMappedImpl = (sList, f, p, index) => {
	if (sList.isEmpty()) return { idx: -1 };
	else {
		const result = f(sList.head);
		if (p(result)) return { idx: index, res: result };
		else return findMappedImpl(sList.tail, f, p, index + 1);
	}
}
SList.findLeveled = (sList, p, level) => {
	return findLeveledImpl(sList, p, level, 0);
}
const findLeveledImpl = (sList, p, level, index) => {
	if (sList.isEmpty()) return { ixs: SList.cons([-1]) };
	else if (level === 0 && p(sList.head)) return { ixs: SList.cons([index]), obj: sList.head };
	else if (level === 0) return findLeveledImpl(sList.tail, p, 0, index + 1);
	else {
		const result = findLeveledImpl(sList.head, p, level - 1, 0);
		if (result.ixs.head === -1) return findLeveledImpl(sList.tail, p, level, index + 1);
		else return { ixs: new SList(index, result.ixs), obj: result.obj };
	}
}
SList.forAll = (sList, pred) => {
	if (sList.isEmpty()) return true
	else return pred(sList.head) && SList.forAll(sList.tail, pred);
}
SList.exists = (sList, pred) => {
	if (sList.isEmpty()) return false
	else return pred(sList.head) || SList.exists(sList.tail, pred);
}


/* general utility */
SList.equals = (sList1, sList2, comparator) => {
	if (sList1.isEmpty()) return sList2.isEmpty()
	else if (sList2.isEmpty()) return false
	else if (comparator) {
		if (comparator(sList1.head, sList2.head) === 0) return SList.equals(sList1.tail, sList2.tail, comparator)
		else return false;
	}
	else if (sList1.head.equals) {
		if (sList1.head.equals(sList2.head)) return SList.equals(sList1.tail, sList2.tail, comparator)
		else return false;
	}
	else if (sList1.head.compareTo) {
		if (sList1.head.compareTo(sList2.head) === 0) return SList.equals(sList1.tail, sList2.tail, comparator)
		else return false;
	}
	else {
		if (sList1.head === sList2.head) return SList.equals(sList1.tail, sList2.tail, comparator)
		else return false;
	}
}
SList.compare = (sList1, sList2, comparator) => {
	if (sList1.isEmpty() || sList2.isEmpty()) return 0
	else {
		const diff = comparator(sList1.head, sList2.head);
		if (diff === 0) return SList.compare(sList1.tail, sList2.tail, comparator)
		else return diff
	}
}
SList.cloneShallow = (sList) => {
	if (sList.isEmpty()) return sList
	else return new SList(sList.head, SList.cloneShallow(sList.tail));
}
SList.indexesTill = (boundEx) => {
	let result = SList.empty();
	let walker = boundEx;
	while (walker > 0) {
		walker--;
		result = new SList(walker, result);
	}
	return result;
}
SList.indexesTillRev = (boundEx) => {
	let result = SList.empty();
	let walker = 0;
	while (walker < boundEx) {
		result = new SList(walker, result);
		walker++;
	}
	return result;
}
SList.indexesFromTill = (lBound, uBoundEx) => {
	let result = SList.empty();
	let walker = uBoundEx;
	while (walker > lBound) {
		walker--;
		result = new SList(walker, result);
	}
	return result;
}
SList.indexesFromTillRev = (lBound, uBoundEx) => {
	let result = SList.empty();
	let walker = lBound;
	while (walker < uBoundEx) {
		result = new SList(walker, result);
		walker++;
	}
	return result;
}


export function SNil() {
}
SNil.prototype = {
	constructor: SNil,
	/* getters */
	getAt: function(index) {
		return null;
	},

	/* inquirers */
	isEmpty: function() {
		return true;
	},
	size: function() {
		return 0;
	},
	contains: function(elem, comparator) {
		return false;
	},
	containsList: function(sList, comparator) {
		return false;
	},

	/* extenders */
	push: function(elem) {
		return new SList(elem, this);
	},
	insertOrdered: function(elem, comparator) {
		return new SList(elem, this);
	},
	insertAbsentOrdered: function(elem, comparator) {
		return new SList(elem, this);
	},
	append: function(sList) {
		return sList;
	},

	/* reductors */
	drop: function(n) {
		return SList.empty();
	},
	take: function(n) {
		return SList.empty();
	},
	slice: function(m, n) {
		return SList.empty();
	},
	removeOne: function(elem, comparator) {
		return SList.empty();
	},
	removeAll: function(elem, comparator) {
		return SList.empty();
	},
	removeListOne: function(elem, comparator) {
		return SList.empty();
	},
	removeListAll: function(elem, comparator) {
		return SList.empty();
	},

	/* mutators */
	reverse: function() {
		return this;
	},
	sort: function(compare) {
		return SList.empty();
	},
	merge: function(sList, compare) {
		return sList;
	},
	setMerge: function(sList, compare) {
		return sList;
	},

	/* higher order workers */
	forEach: function(f) {
		return;
	},
	forEachIndex: function(f) {
		return;
	},
	forEach2: function(sList, f) {
		return;
	},
	filter: function(pred) {
		return SList.empty();
	},
	minby: function(f) {
		return SList.empty();
	},
	maxBy: function(f) {
		return SList.empty();
	},
	foldRight: function(operator, initVal) {
		return initVal;
	},
	foldLeft: function(operator, initVal) {
		return initVal;
	},
	map: function(f) {
		return SList.empty();
	},
	flatMap: function(f) {
		return SList.empty();
	},
	map2: function(f, sList) {
		return SList.empty();
	},
	mapIndex: function(f) {
		return SList.empty();
	},
	union: function(sList, comparator) {
		return sList;
	},
	intersect: function(sList, comparator) {
		return SList.empty();
	},
	flatten: function() {
		return SList.empty();
	},
	forAll: function(pred) {
		return true;
	},
	exists: function(pred) {
		return false;
	},
	find: function(p) {
		return { idx: -1 };
	},
	findMapped: function(f, p) {
		return { idx: -1 };
	},
	findLeveled: function(p, level) {
		return { ixs: SList.cons([-1]) };
	},

	/* converters */
	toString: function() {
		return 'SList()';
	},
	toArray: function() {
		return [];
	},

	/* general utility */
	equals: function(sList, comparator) {
		return sList.isEmpty();
	},
	cloneShallow: function() {
		return SList.empty();
	},

}

SList.tester = () => {

	const assertEquals = (p1, p2, desc) => {
		if (p1.equals(p2)) console.log('Test ' + desc + ' passed...')
		else console.log('Test ' + desc + ' failed... expected: ' + p2.toString() + ' received: ' + p1.toString());
	}

	const assertNotEquals = (p1, p2, desc) => {
		if (!p1.equals(p2)) console.log('Test ' + desc + ' passed...')
		else console.log('Test ' + desc + ' failed... received: ' + p2.toString() + ' and: ' + p1.toString());
	}

	const assertTrue = (p, desc) => {
		if (p) console.log('Test ' + desc + ' passed...')
		else console.log('Test ' + desc + ' failed...');
	}

	const testInsertOrdered = () => {
		const intComparator = (i1, i2) => i1 - i2;
		const testList = SList.cons([0, 3, 4, 6, 10]);
		assertEquals(testList.insertOrdered(-1, intComparator), SList.cons([-1, 0, 3, 4, 6, 10]), 'testInsertOrdered 1');
		assertEquals(testList.insertOrdered(1, intComparator), SList.cons([0, 1, 3, 4, 6, 10]), 'testInsertOrdered 2');
		assertEquals(testList.insertOrdered(3, intComparator), SList.cons([0, 3, 3, 4, 6, 10]), 'testInsertOrdered 3');
		assertEquals(testList.insertOrdered(5, intComparator), SList.cons([0, 3, 4, 5, 6, 10]), 'testInsertOrdered 4');
		assertEquals(testList.insertOrdered(11, intComparator), SList.cons([0, 3, 4, 6, 10, 11]), 'testInsertOrdered 5');
	}

	const testEquals = () => {
		assertEquals(SList.empty(), SList.empty(), 'testEquals 1');
		assertEquals(SList.single(13), SList.single(13), 'testEquals 2');
		assertEquals(SList.pair(13, 57), SList.pair(13, 57), 'testEquals 3');
		assertEquals(SList.cons([13, 57, 17, 53]), SList.cons([13, 57, 17, 53]), 'testEquals 4');
		assertNotEquals(SList.empty(), SList.single(13), 'testEquals 5');
		assertNotEquals(SList.single(13), SList.empty(), 'testEquals 6');
		assertNotEquals(SList.pair(13, 57), SList.single(13), 'testEquals 7');
		assertNotEquals(SList.single(13), SList.pair(13, 57), 'testEquals 8');
		assertNotEquals(SList.single(13, 53), SList.pair(13, 57), 'testEquals 9');
		assertNotEquals(SList.single(17, 57), SList.pair(13, 57), 'testEquals 10');

		const comparator = (p1, p2) => (p1 + p2) % 2;
		assertTrue(SList.cons([0, 0, 0, 0]).equals(SList.cons([0, 2, 4, 6]), comparator), 'testEquals 11');
		assertTrue(SList.cons([0, 1, 2, 3]).equals(SList.cons([10, 111, 68, 13]), comparator), 'testEquals 12');
	}

	const testInsertAbsentOrdered = () => {
		const l1 = SList.cons([2, 4, 6, 8, 10]);
		assertEquals(l1.insertAbsentOrdered(1), SList.cons([1, 2, 4, 6, 8, 10]), 'testInsertAbsentOrdered 1');
		assertEquals(l1.insertAbsentOrdered(2), SList.cons([2, 4, 6, 8, 10]), 'testInsertAbsentOrdered 2');
		assertEquals(l1.insertAbsentOrdered(4), SList.cons([2, 4, 6, 8, 10]), 'testInsertAbsentOrdered 3');
		assertEquals(l1.insertAbsentOrdered(5), SList.cons([2, 4, 5, 6, 8, 10]), 'testInsertAbsentOrdered 4');
		assertEquals(l1.insertAbsentOrdered(10), SList.cons([2, 4, 6, 8, 10]), 'testInsertAbsentOrdered 5');
		assertEquals(l1.insertAbsentOrdered(11), SList.cons([2, 4, 6, 8, 10, 11]), 'testInsertAbsentOrdered 6');
	}

	const testRemoveAll = () => {
		const l1 = SList.cons([3, 4, 4, 8, 3, 7, 1, 8, 8, 0, 2, 5, 5]);
		assertEquals(l1.removeAll(8), SList.cons([3, 4, 4, 3, 7, 1, 0, 2, 5, 5]), 'testRemoveAll 1');
		assertEquals(l1.removeAll(9), SList.cons([3, 4, 4, 8, 3, 7, 1, 8, 8, 0, 2, 5, 5]), 'testRemoveAll 2');
		assertEquals(l1.removeAll(0), SList.cons([3, 4, 4, 8, 3, 7, 1, 8, 8, 2, 5, 5]), 'testRemoveAll 3');

	}

	const testRemoveListOne = () => {
		const l1 = SList.cons([3, 4, 4, 8, 3, 7, 1, 8, 8, 0, 2, 5, 5]);
		assertEquals(l1.removeListOne(SList.single(8)), SList.cons([3, 4, 4, 3, 7, 1, 8, 8, 0, 2, 5, 5]), 'testRemoveListOne 1');
		assertEquals(l1.removeListOne(SList.single(9)), SList.cons([3, 4, 4, 8, 3, 7, 1, 8, 8, 0, 2, 5, 5]), 'testRemoveListOne 2');
		assertEquals(l1.removeListOne(SList.empty()), SList.cons([3, 4, 4, 8, 3, 7, 1, 8, 8, 0, 2, 5, 5]), 'testRemoveListOne 3');
		assertEquals(l1.removeListOne(SList.pair(8, 8)), SList.cons([3, 4, 4, 3, 7, 1, 8, 0, 2, 5, 5]), 'testRemoveListOne 4');
		assertEquals(l1.removeListOne(SList.triple(8, 8, 8)), SList.cons([3, 4, 4, 3, 7, 1, 0, 2, 5, 5]), 'testRemoveListOne 5');
		assertEquals(l1.removeListOne(SList.triple(4, 0, 9)), SList.cons([3, 4, 8, 3, 7, 1, 8, 8, 2, 5, 5]), 'testRemoveListOne 6');
		assertEquals(l1.removeListOne(SList.cons([8, 8, 8, 8])), SList.cons([3, 4, 4, 3, 7, 1, 0, 2, 5, 5]), 'testRemoveListOne 7');
		assertEquals(l1.removeListOne(SList.single(3)), SList.cons([4, 4, 8, 3, 7, 1, 8, 8, 0, 2, 5, 5]), 'testRemoveListOne 8');
		assertEquals(l1.removeListOne(SList.single(5)), SList.cons([3, 4, 4, 8, 3, 7, 1, 8, 8, 0, 2, 5]), 'testRemoveListOne 9');
		assertEquals(l1.removeListOne(SList.cons([5, 2, 0, 8])), SList.cons([3, 4, 4, 3, 7, 1, 8, 8, 5]), 'testRemoveListOne 10');
	}

	const testRemoveListAll = () => {
		const l1 = SList.cons([3, 4, 4, 8, 3, 7, 1, 8, 8, 0, 2, 5, 5]);
		assertEquals(l1.removeListAll(SList.single(8)), SList.cons([3, 4, 4, 3, 7, 1, 0, 2, 5, 5]), 'testRemoveListAll 1');
		assertEquals(l1.removeListAll(SList.single(9)), SList.cons([3, 4, 4, 8, 3, 7, 1, 8, 8, 0, 2, 5, 5]), 'testRemoveListAll 2');
		assertEquals(l1.removeListAll(SList.empty()), SList.cons([3, 4, 4, 8, 3, 7, 1, 8, 8, 0, 2, 5, 5]), 'testRemoveListAll 3');
		assertEquals(l1.removeListAll(SList.pair(8, 8)), SList.cons([3, 4, 4, 3, 7, 1, 0, 2, 5, 5]), 'testRemoveListAll 4');
		assertEquals(l1.removeListAll(SList.pair(8, 4)), SList.cons([3, 3, 7, 1, 0, 2, 5, 5]), 'testRemoveListAll 5');
		assertEquals(l1.removeListAll(SList.triple(5, 4, 8)), SList.cons([3, 3, 7, 1, 0, 2]), 'testRemoveListAll 6');
		assertEquals(l1.removeListAll(SList.triple(3, 0, 9)), SList.cons([4, 4, 8, 7, 1, 8, 8, 2, 5, 5]), 'testRemoveListAll 7');
	}

	const testUnion = () => {
		const l1 = SList.cons([1, 2, 3, 4, 5]);
		assertEquals(l1.union(SList.cons([3, 4, 5, 6, 7])), SList.cons([1, 2, 3, 4, 5, 6, 7]), 'testUnion 1');
		assertEquals(l1.union(SList.empty()), SList.cons([1, 2, 3, 4, 5]), 'testUnion 2');
		assertEquals(l1.union(l1), SList.cons([1, 2, 3, 4, 5]), 'testUnion 3');
		assertEquals(l1.union(SList.cons([6, 7, 8, 9, 0])), SList.cons([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]), 'testUnion 4');
	}

	const testIntersect = () => {
		const l1 = SList.cons([1, 2, 3, 4, 5]);
		assertEquals(l1.intersect(SList.cons([3, 4, 5, 6, 7])), SList.cons([3, 4, 5]), 'testIntersect 1');
		assertEquals(l1.intersect(SList.empty()), SList.empty(), 'testIntersect 2');
		assertEquals(l1.intersect(l1), SList.cons([1, 2, 3, 4, 5]), 'testIntersect 3');
		assertEquals(l1.intersect(SList.cons([6, 7, 8, 9, 0])), SList.empty(), 'testIntersect 4');
	}

	const testMerge = () => {
		const l1 = SList.cons([1, 3, 5, 7, 9]);
		assertEquals(l1.merge(SList.cons([2, 4, 6, 8, 10])), SList.cons([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), 'testMerge 1');
		assertEquals(l1.merge(SList.cons([3, 5, 7])), SList.cons([1, 3, 3, 5, 5, 7, 7, 9]), 'testMerge 2');
		assertEquals(l1.merge(SList.cons([0, 1, 9, 10])), SList.cons([0, 1, 1, 3, 5, 7, 9, 9, 10]), 'testMerge 3');
		assertEquals(l1.merge(SList.empty()), SList.cons([1, 3, 5, 7, 9]), 'testMerge 4');

	}

	const testSetMerge = () => {
		const l1 = SList.cons([1, 3, 5, 7, 9]);
		assertEquals(l1.setMerge(SList.cons([2, 4, 6, 8, 10])), SList.cons([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), 'testSetMerge 1');
		assertEquals(l1.setMerge(SList.cons([3, 5, 7])), SList.cons([1, 3, 5, 7, 9]), 'testSetMerge 2');
		assertEquals(l1.setMerge(SList.cons([0, 1, 9, 10])), SList.cons([0, 1, 3, 5, 7, 9, 10]), 'testSetMerge 3');
		assertEquals(l1.setMerge(SList.empty()), SList.cons([1, 3, 5, 7, 9]), 'testSetMerge 4');
		assertEquals(SList.empty().setMerge(l1), l1, 'testSetMerge 5');
		assertEquals(l1.setMerge(l1), l1, 'testSetMerge 6');
		assertEquals(l1.setMerge(SList.cons([0, 1, 2, 5, 8, 9, 10])), SList.cons([0, 1, 2, 3, 5, 7, 8, 9, 10]), 'testSetMerge 7');
	}

	const testMinBy = () => {
		const l1 = SList.cons([3, 2, 4, 3, 2, 5, 2, 7, 3, 4]);
		assertEquals(l1.minBy((elem) => elem), SList.cons([2, 2, 2]), 'testMinBy 1');
		const l2 = SList.cons([3, 2, 4, 3, 1, 5, 2, 7, 3, 4]);
		assertEquals(l2.minBy((elem) => elem), SList.cons([1]), 'testMinBy 2');
		const l3 = SList.cons(['A', 'BB', 'CCC', 'D', 'EEE', 'F', 'GG', 'H']);
		assertEquals(l3.minBy((elem) => elem.length), SList.cons(['H', 'F', 'D', 'A']), 'testMinBy 3');
	}

	const testMaxBy = () => {
		const l1 = SList.cons([3, 7, 4, 3, 7, 5, 2, 7, 3, 4]);
		assertEquals(l1.maxBy((elem) => elem), SList.cons([7, 7, 7]), 'testMaxBy 1');
		const l3 = SList.cons(['A', 'BB', 'CCC', 'D', 'EEE', 'F', 'GG', 'H']);
		assertEquals(l3.maxBy((elem) => elem.length), SList.cons(['EEE', 'CCC']), 'testMinBy 3');
	}



	testEquals();
	testInsertOrdered();
	testInsertAbsentOrdered();
	testRemoveAll();
	testRemoveListOne();
	testRemoveListAll();
	testUnion();
	testIntersect();
	testMerge();
	testSetMerge();
	testMinBy();
	testMaxBy();
}
