const _ = {};

_.identity = (a) => a;

_.first = (stringOrArray, nthValue) => {

  if (stringOrArray instanceof Array) {
    if (!nthValue) { return stringOrArray[0]; }
    return stringOrArray.splice(0, nthValue);
  }
  if (typeof stringOrArray === 'string') {
    const strResult = [];
    let newArray = stringOrArray.split('');
    if (!nthValue) { strResult.push(newArray[0]); return strResult; }
    return newArray.splice(0, nthValue);
  }
  else {
    return [];
  }
};

_.last = (array, n) => {
  if (n > 0) {
    if (typeof array === 'string') {
      return array.slice(-n).split('');
    }
    let len = array.length;
    return array.slice(len - n, len);
  } else if (n <= 0) {
    return [];
  }
  if (typeof array === 'string' || Array.isArray(array)) {
    let len = array.length;
    return array[len - 1];
  }
};

_.each = (list, iterator, context) => {

  const thisContext = context || this;

  if (list instanceof Array || typeof list === 'string') {
    for (let i = 0; i < list.length; i++) {
      iterator.call(thisContext, list[i], i, list);
    }
  }
  else if (typeof list === 'object') {
    for (let k in list) {
      iterator.call(thisContext, list[k], k, list);
    }
  }
};

_.indexOf = (arrOrStr, value, isSorted) => { // implemented using binary search algorithm
  if (!arrOrStr || !value) { return -1; }
  if (typeof arrOrStr === 'string') {
    arrOrStr = arrOrStr.split('');
  }
  isSorted = isSorted || 0;
  if (typeof isSorted !== 'number' && typeof isSorted !== 'boolean') isSorted = 0;

  if (typeof isSorted === 'number' && typeof isSorted !== 'boolean') {
    for (let i = isSorted; i < arrOrStr.length; i++) {
      if (arrOrStr[i] === value) {
        return i;
      }
    }
  }

  if (typeof isSorted === 'boolean' && typeof isSorted !== 'number') {
    let high = arrOrStr.length - 1;
    let low = 0;
    let mid = 0;

    if (arrOrStr[low] === value) return low;
    if (arrOrStr[high] === value) return high;
    while (low <= high) {
      mid = Math.floor((low + high) / 2);
      if (arrOrStr[mid] === value) {
        return mid;
      }
      else if (value > arrOrStr[mid]) {
        low = mid + 1;
      }
      else {
        high = mid - 1;
      }
    }
  }
  return -1;
};

_.filter = (list, predicate, context) => {

  if (list && !predicate) return list;
  if (typeof predicate != 'function' || !list) return [];

  let thisContext = context || this;

  const resultArray = [];

  _.each(list, function (value, index, list) {
    if (predicate.call(thisContext, value, index, list)) {
      resultArray.push(value);
    }
  });

  return resultArray;
};

_.reject = (list, predicate, context) => {

  if (!predicate) return [];
  if (typeof predicate != 'function') return list;

  let thisContext = context || this;

  return _.filter(list, function (value, index, list) {
    return !predicate.call(thisContext, value, index, list);
  });
};

_.uniq = (array) => {
  if (!array) return [];
  let newArr = [];
  for (let i = 0; i < array.length; i++) {
    if (_.indexOf(newArr, array[i]) === -1) {
      newArr.push(array[i]);
    }
  }
  return newArr;
};

_.map = (list, iterator, context) => {
  if (!iterator) {
    iterator = function (x) { return x; };
  }
  if (typeof iterator != 'function') return list;

  let thisContext = context || this;

  let mappedArr = [];
  if (Array.isArray(list)) {
    for (let i = 0; i < list.length; i++) {
      mappedArr.push(iterator.call(thisContext, list[i], i, list));
    }
    return mappedArr;
  }
  else if (typeof list === 'object') {
    for (let k in list) {
      mappedArr.push(iterator.call(thisContext, list[k], k, list));
    }
    return mappedArr;
  }
  return [];
};

_.contains = (list, value, fromIndex) => {
  if (typeof list === 'number') return false;
  let newList = [];
  if (Array.isArray(list)) {
    newList = list;
  }
  else if (typeof newList === 'string') {
    newList = list.split('');
  }
  else if (typeof newList === 'object') {
    for (let k in list) {
      newList.push(list[k]);
    }
  }
  return _.indexOf(newList, value, fromIndex) > -1;
};

_.pluck = (list, propertyName) => {
  return _.map(list, function (val) {
    return val[propertyName];
  });
};

_.reduce = (list, iteratee, memo, context) => {
  context = context === undefined ? this : context;
  memo = memo === undefined ? _.first(list) : memo;
  return _.last(_.map(list, function (value, index, list) {
    return memo = iteratee.call(context, memo, value, index, list);
  }));
};

_.every = (list, predicate, context) => {
  const thisContext = context || this;
  let result = true;
  _.each(list, function (value) {
    if (!(predicate.call(thisContext, value))) {
      result = false;
    }
  });
  return result;
};

_.some = (list, predicate, context) => {
  const thisContext = context || this;
  let result = false;

  _.each(list, function (value) {
    if (predicate.call(thisContext, value)) {
      result = true;
    }
  });
  return result;
};

_.extends = function (obj) {
  if (arguments.length === 0) return {};
  if (!(obj instanceof Object)) return obj;
  for (let i = 1; i < arguments.length; i++) {
    if ((!(arguments[i] instanceof Object)) || arguments[i] instanceof Array) {
      arguments[i] = null;
    }
  }
  _.each(arguments, function (args) {
    _.each(args, function (v, k) {
      obj[k] = v;
    });
  });
  return obj;
};

_.defaults = function (obj) {
  if (arguments.length === 0) return {};
  if (!(obj instanceof Object)) return obj;
  for (let i = 1; i < arguments.length; i++) {
    if ((!(arguments[i] instanceof Object)) || arguments[i] instanceof Array) {
      arguments[i] = null;
    }
  }
  _.each(arguments, function (args) {
    _.each(args, function (v, k) {
      if (obj[k] === undefined) {
        obj[k] = v;
      }
    });
  });
  return obj;
};

// Advanced Functions

_.once = function (func) {

  let isCalled = false;
  return function () {
    if (!isCalled) {
      isCalled = true;
      return func();
    }
  };
};

_.memoize = function (func, hashFunc) {
  hashFunc = hashFunc || (hashFunc = _.identity);
  var cache = {};
  return function () {
    var args = hashFunc.apply(this, hashFunc);
    return (args in cache) ? cache[args] : (cache[args] = func.apply(this, arguments));
  };
};

_.shuffle = function (list) {
  list = list || [];
  if (list.length === 0) return [];
  if (list instanceof Object) {
    list = _.map(list, function (val) {
      return val;
    });
  }
  const newArr = list.slice(0);
  for (var j = 0; j < newArr.length; j++) {
    let location = Math.floor(Math.random() * newArr.length);
    let item = newArr[j];
    newArr[j] = newArr[location];
    newArr[location] = item;
  }
  return newArr;
};

_.invoke = function (list, methodName, methodArgs) {
  methodArgs = [].slice.call(arguments, 2);
  return _.map(list, function (value) {
    return (methodName instanceof Function)
      ? methodName.apply(value, methodArgs)
      : value[methodName].apply(value, methodArgs);
  });
};

_.sortBy = function (list, iteratee, context) {
  const thisContext = context || this;
  return list.sort(function (a, b) {
    return iteratee.call(thisContext, a) - iteratee.call(thisContext, b);
  });
};

_.zip = function () {
  let max = -Infinity;
  const result = [];
  _.each(Array.prototype.slice.call(arguments, 0), function (val) {
    if (val.length > max) {
      max = val.length;
    }
  });
  for (let i = 0; i < max; i++) {
    result.push(_.pluck(arguments, i));
  }
  return result;
};

_.sortedIndex = function (list, value) {
  let high = list.length - 1;
  let low = 0;

  while (low < high) {
    let mid = Math.floor((high + low) / 2);
    if (list[mid] < value && list[mid + 1] > value) {
      return mid + 1;
    }
    if (list[mid] < value) {
      low = mid;
    }
    else {
      high = mid;
    }
  }
  return low;
};

_.flatten = function (array) {
  const result = [];
  _.each(array, function (item) {
    if (item instanceof Array) {
      result.push.apply(result, _.flatten(item));
    }
    else {
      result.push(item);
    }
  });
  return result;
};


_.intersection = function (array) {
  const lenOfArgs = arguments.length;
  const arrLength = array.length;
  const result = [];

  for (let i = 0; i < arrLength; i++) {
    if (_.contains(result, array[i])) continue;
    let j;
    for (j = 1; j < lenOfArgs; j++) {
      if ((_.contains(arguments[j], array[i])) === false) break;
    }
    if (lenOfArgs === j) {
      result.push(array[i]);
    }
  }
  return result;
};

_.difference = function (array) {
  const others = _.flatten(Array.prototype.slice.call(arguments, 1));
  return _.filter(array, function (value) {
    return !_.contains(others, value)
    ? true
    : false;
  });
};

_.delay = function (func, wait) {
  const otherArgs = Array.prototype.slice.call(arguments, 2);
  return setTimeout (function () {
    return func.apply(null, ...otherArgs);
  }, wait);
};

if (typeof module
  !== 'undefined') {
  module.exports = _;
}
