/* global describe, it */
const path = require('path');
const { expect } = require('chai');
const sinon = require('sinon');


const _ = require(path.join(__dirname, '..', './main.js'));

describe('_', () => {
  'use strict';

  it('is an object', () => {
    expect(_).to.be.an('object');
  });

  describe('#_.identity', () => {
    it('is a function', function () {
      expect(_.identity).to.be.a('function');
    });
    it('should return the argument passed', () => {
      expect(_.identity('a')).to.equal('a');
    });
    it('should just return the first argument', () => {
      expect(_.identity(1, 2, 3)).to.equal(1);
    });
    it('should return the argument when its an array of values', () => {
      expect(_.identity(['Pizza', 'Pasta', 'Lasagna'])).to.eql(['Pizza', 'Pasta', 'Lasagna']);
    });
    it('should return the first array if multiple arrays are passed as arguments', () => {
      expect(_.identity(['Pizza', 'Pasta', 'Lasagna'], [1, 2, 3, 4])).to.eql(['Pizza', 'Pasta', 'Lasagna']);
    });
    it('should return the argument when its a string', () => {
      expect(_.identity('John Doe')).to.equal('John Doe');
    });
    it('should return the first argument when multiple string arguments are passed', () => {
      expect(_.identity('baz', 'foo', 'bar')).to.equal('baz');
    });
  });


  describe('#_.first', () => {
    it('should be a function', () => {
      expect(_.first).to.be.a('function');
    });
    it('should return empty array if no arguments are passed', () => {
      expect(_.first()).to.eql([]);
    });
    it('should return empty array if first argument\'s type is not array or strings', () => {
      expect(_.first({ 'a': 1, 'b': 2, 'c': 3 })).to.eql([]);
    });
    describe('_.first used on arrays', () => {
      it('should return the first value in an array', () => {
        expect(_.first(['first', 'second', 'third'])).to.eql('first');
      });
      it('should return the first value in an array', () => {
        expect(_.first([1, 2, 3])).to.eql(1);
      });
      it('should return first n values in an array', () => {
        expect(_.first([1, 2, 3, 4, 5, 6, 7, 8, 9], 4)).to.eql([1, 2, 3, 4]);
      });
      it('should return the original array if nthValue is larger than the number of items in the array', () => {
        expect(_.first([1, 2, 3, 4, 5, 6, 7, 8, 9], Infinity)).to.eql([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      });
    });
    describe('_.first used on strings', () => {
      it('should return the first character of the string of letters', () => {
        expect(_.first('first second third')).to.eql(['f']);
      });
      it('should return the first character of the string of numbers', () => {
        expect(_.first('1 2 3')).to.eql(['1']);
      });
      it('should return first n characters in a string', () => {
        expect(_.first('Hello World!', 4)).to.eql(['H', 'e', 'l', 'l']);
      });
      it('should return the original string if nthValue is larger than the number of characters in a string', () => {
        expect(_.first('Hello World!', Infinity)).to.eql(['H', 'e', 'l', 'l', 'o', ' ', 'W', 'o', 'r', 'l', 'd', '!']);
      });
    });
  });

  describe('#_.last', () => {
    it('is a function', function () {
      expect(_.last).to.be.a('function');
    });
    it('should return last element in array', function () {
      expect(_.last([5, 6, 7, 8, 9])).to.equal(9);
    });
    it('should return undefined if passed a number', function () {
      expect(_.last(5)).to.equal(undefined);
    });
    it('should return undefined if no input', function () {
      expect(_.last()).to.equal(undefined);
    });
    it('should return undefined if given empty array', function () {
      expect(_.last([])).to.equal(undefined);
    });
    it('should return undefined if passed an object', function () {
      expect(_.last({ a: 1, b: 2 })).to.equal(undefined);
    });
    it('should return last character if a string is passed', function () {
      expect(_.last('hello')).to.equal('o');
    });
    it('should return last n elements if positive n is given', function () {
      expect(_.last([1, 2, 3, 4, 5], 3)).to.eql([3, 4, 5]);
    });
    it('should return empty array if negative n is given', function () {
      expect(_.last([1, 2, 3, 4, 5], -3)).to.eql([]);
    });
    it('should return last n characters of string if positive n is given', function () {
      expect(_.last('hello', 3)).to.eql(['l', 'l', 'o']);
    });
  });

  describe('#_.each', () => {
    it('is a function', () => {
      expect(_.each).to.be.a('function');
    });
    it('should call the passed function as many times as items in the array', () => {
      let count = 0;
      let test = () => count++;
      _.each([1, 2, 3], test);
      expect(count).to.equal(3);
    });
    it('should call the passed function as many times as items in the object', () => {
      let count = 0;
      let test = () => count++;
      _.each({ a: 1, b: 2, c: 3, d: 4 }, test);
      expect(count).to.equal(4);
    });
    it('should return 0 if input is a number', () => {
      let count = 0;
      let test = () => count++;
      _.each(9, test);
      expect(count).to.equal(0);
    });
    it('first argument of the iterator should be the items of the array', () => {
      const testArray = ['hello', 'world', 'pizza', 'coffee', 'javascript'];
      const resultArray = [];

      _.each(testArray, (value) => {
        resultArray.push(value);
      });
      // _.each pushes each value from testArray to resultArray which proves that the iterator value
      // referes to each value in the list.
      expect(resultArray).to.eql(testArray);
      // the expect statement shows that the items in the testArray are the same 
      // as the items in the resultArray
    });
    it('first argument of the iterator should be the values of the object', () => {
      const testObject = { 1: 'hello', 2: 'world', 3: 'pizza', 4: 'coffee', 5: 'javascript' };
      const resultArray = [];

      _.each(testObject, (value) => {
        resultArray.push(value);
      });
      // _.each pushes each value from testObject to resultArray which proves that the iterator value
      // referes to each value in the list.
      expect(testObject[4]).to.eql(resultArray[3]);
      // the expect statement shows that the values in the testObject are the same 
      // as the items in the resultArray
    });

    it('the second argument of the iterator should refer to the index of the items in the array', () => {
      const testArray = ['hello', 'world', 'pizza', 'coffee', 'javascript'];
      const resultArray = [];

      _.each(testArray, (value, index) => {
        resultArray.push(index);
      });
      expect(resultArray).to.eql([0, 1, 2, 3, 4]);
    });
    it('the second argument of the iterator should refer to the keys of the properties of the object', () => {
      const testArray = { a: 'hello', b: 'world', c: 'pizza', d: 'coffee', e: 'javascript' };
      const resultArray = [];

      _.each(testArray, (value, index) => {
        resultArray.push(index);
      });
      expect(resultArray).to.eql(['a', 'b', 'c', 'd', 'e']);
    });

    it('the third argument of the iterator should refer to the whole array', () => {
      const testArray = ['pasta', 'pizza', 'meatballs', 'mushrooms', 'ketchup'];
      let resultArray;

      _.each(testArray, (value, index, array) => {
        resultArray = array;
      });
      expect(resultArray).to.eql(testArray);
    });
    it('the third argument of the iterator should refer to the whole object', () => {
      const testArray = {
        breakfast: 'pasta',
        lunch: 'pizza',
        dinner: 'meatballs',
        supper: 'mushrooms',
        midnightsnack: 'ketchup'
      };
      let resultObj;

      _.each(testArray, (value, index, object) => {
        resultObj = object;
      });
      expect(resultObj).to.eql(testArray);
    });
  });

  describe('#_.indexOf', () => {
    it('is a function', () => {
      expect(_.indexOf).to.be.a('function');
    });
    it('should return for arrays the index of the first instance of the second argument', () => {
      expect(_.indexOf([5, 6, 7, 8, 9], 9)).to.equal(4);
      expect(_.indexOf([5, 6, 9, 8, 9], 9)).to.equal(2);
    });
    it('should return -1 if element not found in array', () => {
      expect(_.indexOf([5, 6, 7, 8, 9], 10)).to.equal(-1);
      expect(_.indexOf(['john', 'bob', 'bill'], 'mary')).to.equal(-1);
    });
    it('should return -1 if passed an empty array', () => {
      expect(_.indexOf([], 10)).to.equal(-1);
    });
    it('should return -1 if no second argument', () => {
      expect(_.indexOf([3, 4, 5])).to.equal(-1);
    });
    it('should return -1 if no arguments', () => {
      expect(_.indexOf()).to.equal(-1);
    });
    it('should return for strings the index of the first instance of the second argument', () => {
      expect(_.indexOf('helloWorld', 'o')).to.equal(4);
    });
    it('should return -1 if the list is an object', () => {
      expect(_.indexOf({ a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 }, 3)).to.equal(-1);
    });
  });

  describe('#_.filter', () => {
    it('is a function', () => {
      expect(_.filter).to.be.a('function');
    });
    it('should return an array', () => {
      let test = (x) => x < 8;
      expect(_.filter([5, 6, 7, 8, 9], test)).to.be.instanceof(Array);
    });
    it('should return an array of values that pass a truth test', () => {
      let test = (x) => x < 8;
      expect(_.filter([5, 6, 7, 8, 9], test)).to.eql([5, 6, 7]);
    });
    it('should return an array of the string that passes a truth test', () => {
      let test = (x) => x === 'hello';
      expect(_.filter(['foo', 'bar', 'baz', 'hello', 'world'], test)).to.eql(['hello']);
    });
    it('should return empty array if no values pass the test', () => {
      let test = (x) => x < 8;
      expect(_.filter([8, 9, 10, 11], test)).to.eql([]);
    });
    it('should return array unchanged if no function is passed', () => {
      expect(_.filter([8, 9, 10, 11])).to.eql([8, 9, 10, 11]);
    });
    it('should return empty array if second argument is not a function', () => {
      expect(_.filter([8, 9, 10, 11], 'string')).to.eql([]);
    });
    it('should return and array of keys in an object that pass a truth test', () => {
      let test = (x) => x < 8;
      expect(_.filter({ a: 5, b: 6, c: 7, d: 8, e: 9 }, test)).to.eql([5, 6, 7]);
    });
    it('should return an empty array if passed something which is not an array or an object', () => {
      let test = (x) => x < 8;
      expect(_.filter(7, test)).to.eql([]);
    });
    it('should return an empty array if passed no arguments', () => {
      expect(_.filter()).to.eql([]);
    });
  });

  describe('#_.reject', () => {
    it('is a function', () => {
      expect(_.reject).to.be.a('function');
    });
    it('should return an array', () => {
      let test = (x) => x < 8;
      expect(_.reject([5, 6, 7, 8, 9], test)).to.be.instanceof(Array);
    });
    it('should return values that fail a truth test', () => {
      let test = (x) => x < 8;
      expect(_.reject([5, 6, 7, 8, 9], test)).to.eql([8, 9]);
    });
    it('should return copy of the array if no values fail the test', () => {
      let test = (x) => x < 8;
      expect(_.reject([8, 9, 10, 11], test)).to.eql([8, 9, 10, 11]);
    });
    it('should return copy of the array if no values fail the test', () => {
      let test = (x) => x === 'hello';
      expect(_.reject(['foo', 'bar', 'baz', 'hello', 'world'], test)).to.eql(['foo', 'bar', 'baz', 'world']);
    });
    it('should return empty array if no function is passed', () => {
      expect(_.reject([8, 9, 10, 11])).to.eql([]);
    });
    it('should return copy of same array if second argument is not a function', () => {
      expect(_.reject([8, 9, 10, 11], 'string')).to.eql([8, 9, 10, 11]);
    });
    it('should return an array of values that fail a truth test in an object', () => {
      let test = (x) => x < 8;
      expect(_.reject({ a: 5, b: 6, c: 7, d: 8, e: 9 }, test)).to.eql([8, 9]);
    });
    it('should return an empty array if passed something which is not a list', () => {
      let test = (x) => x < 8;
      expect(_.reject(7, test)).to.eql([]);
    });
    it('should return an empty array if passed no arguments', () => {
      expect(_.reject()).to.eql([]);
    });
  });

  describe('#_.uniq', () => {
    it('is a function', () => {
      expect(_.uniq).to.be.a('function');
    });
    it('should return an array', () => {
      expect(_.uniq([5, 6, 7, 8, 9])).to.be.instanceof(Array);
    });
    it('returns an empty array if no input', () => {
      expect(_.uniq()).to.eql([]);
    });
    it('returns only the first instance of duplicate items', () => {
      expect(_.uniq([1, 1, 2, 2, 3, 3, 2])).to.eql([1, 2, 3]);
    });
    it('returns an empty array if empty array', () => {
      expect(_.uniq([])).to.eql([]);
    });
    it('returns an array of the first instance of each character if passed a string', () => {
      expect(_.uniq('banana')).to.eql(['b', 'a', 'n']);
    });
    it('returns an empty array if passed a number', () => {
      expect(_.uniq(123)).to.eql([]);
    });
    it('returns an empty array if passed an object', () => {
      expect(_.uniq({ a: 1, b: 2, c: 3 })).to.eql([]);
    });
  });

  describe('#_.map', () => {
    it('is a function', function () {
      expect(_.map).to.be.a('function');
    });
    it('should return an array', function () {
      var test = function (x) { return x * 2; };
      expect(_.map([5, 6, 7, 8, 9], test)).to.be.instanceof(Array);
    });
    it('should return a new array of transformed values', function () {
      var test = function (x) { return x * 2; };
      expect(_.map([5, 6, 7, 8, 9], test)).to.eql([10, 12, 14, 16, 18]);
    });
    it('should return a new array of transformed values from an object', function () {
      var test = function (x) { return x * 2; };
      expect(_.map({ a: 5, b: 6, c: 7, d: 8, e: 9 }, test)).to.eql([10, 12, 14, 16, 18]);
    });
    it('should return empty array if no arguments passed', function () {
      expect(_.map()).to.eql([]);
    });
    it('should return empty array if an empty array is passed', function () {
      expect(_.map([])).to.eql([]);
    });
    it('should return copy of array if no function is passed', function () {
      expect(_.map([3, 4, 5])).to.eql([3, 4, 5]);
    });
    it('should return an empty array when passed invalid arguments', function () {
      var test = function (x) { return x * 2; };
      expect(_.map(3, test)).to.eql([]);
      expect(_.map('foo', test)).to.eql([]);
    });
  });

  describe('#_.contains', () => {
    it('is a function', function () {
      expect(_.contains).to.be.a('function');
    });
    it('returns a boolean', function () {
      expect(_.contains([3, 4, 5], 3)).to.be.a('boolean');
    });
    it('returns true or false depending on if a value is in an array', function () {
      expect(_.contains([3, 4, 5], 3)).to.equal(true);
      expect(_.contains([3, 4, 5], 6)).to.equal(false);
      expect(_.contains(['hello', 'foo', 'bar', 'coffee'], 'foo')).to.equal(true);
    });
    it('returns true or false depending on if a character is in a string', function () {
      expect(_.contains('helloWorld', 'h')).to.equal(true);
    });
    it('returns true or false depending on if a value is in an object', function () {
      expect(_.contains({ a: 1, b: 2, c: 3, d: 4 }, 3)).to.equal(true);
    });
    it('returns true or false depending on if a value is in an object', function () {
      expect(_.contains({ a: 1, b: 2, c: 3, d: 4 }, 5)).to.equal(false);
    });
    it('returns false if argument is not an array, string or object', function () {
      expect(_.contains(12, 5)).to.equal(false);
    });
    it('should return false if the value is not present after a said index', () => {
      expect(_.contains([1, 2, 3, 4, 5, 6, 7, 5, 6, 4], 3, 3)).to.equal(false);
    });
    it('should return true if the value is present after a said index', () => {
      expect(_.contains([1, 2, 3, 4, 5, 6, 7, 5, 3, 4], 3, 3)).to.equal(true);
    });
  });

  describe('#_.pluck', () => {
    it('is a function', function () {
      expect(_.pluck).to.be.a('function');
    });
    it('return an empty array if empty an array, numbers, string or no arguments are passed', () => {
      expect(_.pluck()).to.eql([]);
      expect(_.pluck([])).to.eql([]);
      expect(_.pluck('str')).to.eql([]);
    });
    it('returns extracted property values from an array', () => {
      const test = [{ name: 'moe', age: 40 }, { name: 'larry', age: 50 }, { name: 'curly', age: 60 }];
      expect(_.pluck(test, 'name')).to.eql(['moe', 'larry', 'curly']);
      expect(_.pluck(test, 'age')).to.eql([40, 50, 60]);
    });
    it('returns extracted property values from an object', () => {
      const test = { a: { name: 'moe', age: 40 }, b: { name: 'larry', age: 50 }, c: { name: 'curly', age: 60 } };
      expect(_.pluck(test, 'name')).to.eql(['moe', 'larry', 'curly']);
      expect(_.pluck(test, 'age')).to.eql([40, 50, 60]);
    });
  });

  describe('#_.reduce', () => {
    it('is a function', () => {
      expect(_.reduce).to.be.a('function');
    });
    it('returns a sum of all the numbers', () => {
      const test = _.reduce([1, 2, 3, 4, 5, 6], function (memo, value) {
        return memo + value;
      }, 0);
      expect(test).to.equal(21);
    });
    it('can carry out _.map\'s functionality', () => {
      const test = _.reduce([4, 5, 6, 7], function (memo, value) {
        memo.push(value * 2);
        return memo;
      }, []);
      expect(test).to.eql([8, 10, 12, 14]);
    });
    it('can carry out _.filter\'s functionality', () => {
      const test = _.reduce(['hello', 'world', 'hello', 'world', 'hello', 'world'], function (memo, value) {
        if (value !== 'world') {
          memo.push(value);
        }
        return memo;
      }, []);
      expect(test).to.eql(['hello', 'hello', 'hello']);
    });
  });

  describe('#_.every', () => {
    it('should be a function', () => {
      expect(_.every).to.be.a('function');
    });
    it('should return a boolean', () => {
      expect(_.every()).to.be.a('boolean');
    });
    it('returns true for an empty array', () => {
      expect(_.every([])).to.equal(true);
    });
    it('returns true if all values in the list pass the truth test', () => {
      expect(_.every([2, 4, 6, 8], function (n) { return n % 2 === 0; })).to.equal(true);
    });
    it('returns false if values in an array do NOT pass a truth test', () => {
      expect(_.every([2, 4, 1, 3, 5], function (n) { return n % 2 !== 0; })).to.equal(false);
    });
    it('returns true if values in an object pass the truth test', () => {
      expect(_.every({ a: 2, b: 4, c: 6, d: 8 }, function (n) { return n % 2 === 0; })).to.equal(true);
    });
    it('returns false if values in an object do NOT pass a truth test', () => {
      expect(_.every({ a: 1, b: 3, c: 5, i: 2 }, function (n) { return n % 2 === 0; })).to.equal(false);
    });
  });

  describe('#_.some', () => {
    it('should be a function', () => {
      expect(_.some).to.be.a('function');
    });
    it('should return a boolean', () => {
      expect(_.some()).to.be.a('boolean');
    });
    it('returns true for an empty array', () => {
      expect(_.some([])).to.equal(false);
    });
    it('returns true if some values in the list pass the truth test', () => {
      expect(_.some([2, 4, 3, 9, 6, 8], function (n) { return n % 2 === 0; })).to.equal(true);
    });
    it('returns false if all values in an array do NOT pass a truth test', () => {
      expect(_.some([1, 3, 5], function (n) { return n % 2 === 0; })).to.equal(false);
    });
    it('returns true if some values in an object pass the truth test', () => {
      expect(_.some({ a: 2, b: 3, c: 6, d: 8, q: 4, r: 0, p: 1 }, function (n) { return n % 2 === 0; })).to.equal(true);
    });
    it('returns false if all values in an object do NOT pass a truth test', () => {
      expect(_.some({ a: 1, b: 3, c: 5, i: 7, u: 9 }, function (n) { return n % 2 === 0; })).to.equal(false);
    });
  });

  describe('#_.extends', () => {
    it('is a function', () => {
      expect(_.extends).to.be.a('function');
    });
    it('returns an object', () => {
      expect(_.extends()).to.be.an('object');
    });
    it('returns first argument if first argument is not an object', () => {
      expect(_.extends(3)).to.equal(3);
    });
    it('ignores non object arguments that are passed', () => {
      expect(_.extends({ name: 'moe' }, 3, false, 'hello', [1, 3], { age: 50 })).to.eql({ name: 'moe', age: 50 });
    });
    it('should copy one of the properties in the source objects over to the destination object', () => {
      expect(_.extends({ name: 'moe' }, { age: 50 })).to.eql({ name: 'moe', age: 50 });
    });
    it('should copy all of the properties in the source objects over to the destination object', () => {
      expect(_.extends({ name: 'moe' }, { age: 50 }, { gender: 'male' })).to.eql({ name: 'moe', age: 50, gender: 'male' });
    });
    it('should override properties of the same name in previous arguments', () => {
      expect(_.extends({ name: 'moe' }, { age: 50 }, { gender: 'male' }, { name: 'John Doe' })).to.eql({ name: 'John Doe', age: 50, gender: 'male' });
      expect(_.extends({ name: 'moe', age: 50 }, { age: 22 }, { name: 'John Doe' })).to.eql({ name: 'John Doe', age: 22 });
    });
  });

  describe('#_.defaults', () => {
    it('is a function', () => {
      expect(_.defaults).to.be.a('function');
    });
    it('returns an object', () => {
      expect(_.defaults()).to.be.an('object');
    });
    it('returns first argument if first argument is not an object', () => {
      expect(_.defaults(3)).to.equal(3);
    });
    it('ignores non object arguments that are passed', () => {
      expect(_.defaults({ name: 'moe' }, 3, false, 'hello', [1, 3], { age: 50 })).to.eql({ name: 'moe', age: 50 });
    });
    it('should copy one of the properties in the source objects over to the destination object', () => {
      expect(_.defaults({ name: 'moe' }, { age: 50 })).to.eql({ name: 'moe', age: 50 });
    });
    it('should copy all of the properties in the source objects over to the destination object', () => {
      expect(_.defaults({ name: 'moe' }, { age: 50 }, { gender: 'male' })).to.eql({ name: 'moe', age: 50, gender: 'male' });
    });
    it('should NOT override properties of the same name in previous arguments', () => {
      expect(_.defaults({ name: 'moe' }, { age: 50 }, { gender: 'male' }, { name: 'John Doe' })).to.eql({ name: 'moe', age: 50, gender: 'male' });
      expect(_.defaults({ name: 'moe', age: 50 }, { age: 22 }, { name: 'John Doe' })).to.eql({ name: 'moe', age: 50 });
    });
  });

  describe('#_.once', function () {
    it('is a function', function () {
      expect(_.once).to.be.a('function');
    });
    it('returns a function that can only be called once', function () {
      let spy = sinon.spy();
      let spyOnce = _.once(spy);
      spyOnce();
      spyOnce();
      spyOnce();
      expect(spy.callCount).to.equal(1);
    });
    it('each _.once function should only be called once', function () {
      let spy = sinon.spy();
      let spyOnce = _.once(spy);
      let anotherOnce = _.once(spy);
      spyOnce();
      spyOnce();
      spyOnce();

      anotherOnce();
      anotherOnce();
      anotherOnce();
      expect(spy.callCount).to.equal(2);
    });
    it('returns three times for 3 separate _.once function calls each called twice', function () {
      let spy = sinon.spy();
      let spyOnce = _.once(spy);
      let anotherOnce = _.once(spy);
      let spyMan = _.once(spy);
      spyOnce();
      spyOnce();


      anotherOnce();
      anotherOnce();


      spyMan();
      spyMan();

      expect(spy.callCount).to.equal(3);
    });
  });

  describe('memoize', function () {
    it('should be a function', function () {
      expect(_.memoize).to.be.a('function');
    });
    it('should store a called function in the cache and use it as reference for next time its called', function () {
      let spy = sinon.spy();
      let spyMem = _.memoize(spy);
      spyMem();
      spyMem();
      spyMem();
      expect(spy.callCount).to.equal(1);
    });
    it('should store a called function in the cache object and use it as reference for next time, in this case the function is called twice', function () {
      let spy = sinon.spy();
      let spyMem = _.memoize(spy);
      let spybro = _.memoize(spy);
      spyMem();
      spyMem();
      spyMem();

      spybro();
      spybro();
      spybro();

      expect(spy.callCount).to.equal(2);
    });
    it('returns three times for 3 function call each called twice because they were stored in the cache the first time', function () {
      let spy = sinon.spy();
      let spyMem = _.memoize(spy);
      let spybro = _.memoize(spy);
      let anotherSpy = _.memoize(spy);
      spyMem();
      spyMem();


      spybro();
      spybro();


      anotherSpy();
      anotherSpy();

      expect(spy.callCount).to.equal(3);
    });
  });

  describe('shuffle', function () {
    it('should be a function', function () {
      expect(_.shuffle).to.be.a('function');
    });
    it('shoudl return a randomly sorted array of numbers', function () {
      expect(_.shuffle([2, 4, 2, 3, 4, 5, 6, 7, 8, 9, 78, 6, 5])).to.not.eql([2, 4, 2, 3, 4, 5, 6, 7, 8, 9, 78, 6, 5]);
      expect(_.shuffle([2, 4, 2, 3, 4, 5, 6, 7, 8, 9, 78, 6, 5])).to.not.eql(undefined);

    });
    it('shoudl return a randomly sorted array of strings', function () {
      expect(_.shuffle(['foo', 'bar', 'baz', 'Sina', 'Kabki'])).to.not.eql(['foo', 'bar', 'baz', 'Sina', 'Kabki']);
      expect(_.shuffle(['foo', 'bar', 'baz', 'Sina', 'Kabki'])).to.not.eql(undefined);

    });
    it('shoudl return a randomly sorted array of arrays', function () {
      expect(_.shuffle([[34], ['coffee'], ['toffee'], ['foo', 'bar'], ['baz'], ['Sina', 'Kabki'], [1], [23], []])).to.not.eql([[34], ['coffee'], ['toffee'], ['foo', 'bar'], ['baz'], ['Sina', 'Kabki'], [1], [23], []]);
      expect(_.shuffle([[34], ['coffee'], ['toffee'], ['foo', 'bar'], ['baz'], ['Sina', 'Kabki'], [1], [23], []])).to.not.eql(undefined);

    });
    it('shoudl return a randomly sorted array of arrays or objects', function () {
      expect(_.shuffle({ a: 'foo', b: 'bar', c: 'baz', q: 'Sina', w: 'Kabki' })).to.not.eql({ a: 'foo', b: 'bar', c: 'baz', q: 'Sina', w: 'Kabki' });
      expect(_.shuffle({ a: 'foo', b: 'bar', c: 'baz', q: 'Sina', w: 'Kabki' })).to.not.eql(['foo', 'bar', 'baz', 'Sina', 'Kabki']);
      expect(_.shuffle({ a: 'foo', b: 'bar', c: 'baz', q: 'Sina', w: 'Kabki' })).to.not.eql(undefined);
    });
  });

  describe('invoke', function () {
    it('should be a function', function () {
      expect(_.invoke).to.be.a('function');
    });
    it('should call the methodName on each value in the array', function () {
      expect(_.invoke([[5, 1, 7], [3, 2, 1]], 'sort')).to.eql([[1, 5, 7], [1, 2, 3]]);
    });
    it('should call the methodName on each value in the object', function () {
      expect(_.invoke({ a: [5, 1, 7], b: [3, 2, 1] }, 'sort')).to.eql([[1, 5, 7], [1, 2, 3]]);
    });
    it('should call the methodName with the methodArg', function () {
      expect(_.invoke([['hello', 'world', 'foo'], ['sina', 'kabki', 'coffee']], 'join', '#')).to.eql(['hello#world#foo', 'sina#kabki#coffee']);
      expect(_.invoke({ a: ['hello', 'world', 'foo'], b: ['sina', 'kabki', 'coffee'] }, 'join', '#')).to.eql(['hello#world#foo', 'sina#kabki#coffee']);
    });
  });

  describe('sortBy', function () {
    it('should be a function', function () {
      expect(_.sortBy).to.be.a('function');
    });
    it('should return sorted number in an array by running each value through the iteratee', function () {
      const expected = [1, 3, 5, 7, 9, 2, 4, 6, 8, 10];
      const test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const func = function (val) {
        return val % 2 === 0;
      };
      expect(_.sortBy(test, func)).to.eql(expected);

      const expected2 = [5, 4, 6, 3, 1, 2];
      const test2 = [1, 2, 3, 4, 5, 6];
      const func2 = function (val) {
        return Math.sin(val);
      };
      expect(_.sortBy(test2, func2)).to.eql(expected2);

    });
    it('should return sorted strings in an array by running each value through the iteratee', function () {
      const expected = ['React', 'jQuery', 'Angular', 'Backbone', 'Underscore'];
      const test = ['Underscore', 'jQuery', 'Angular', 'React', 'Backbone'];
      const func = function (val) {
        return val.length;
      };
      expect(_.sortBy(test, func)).to.eql(expected);
    });
  });

  describe('zip', function () {
    it('is a function', function () {
      expect(_.zip).to.be.a('function');
    });
    it('should merge together the values of each of the arrays with the values at the corresponding position', function () {
      expect(_.zip(['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false])).to.eql([['moe', 30, true], ['larry', 40, false], ['curly', 50, false]]);
    });
  });

  describe('sortedIndex', function () {
    it('is a function', function () {
      expect(_.sortedIndex).to.be.a('function');
    });
    it('returns the index at which value can be inserted while maintaining the lists sorted order', function () {
      expect(_.sortedIndex([10, 20, 30, 40, 50], 35)).to.equal(3);
      expect(_.sortedIndex([1, 2, 3, 4, 5, 12, 15, 20, 30, 45, 200], 100)).to.equal(10);
    });
  });

  describe('flatten', function () {
    it('is a function', function () {
      expect(_.flatten).to.be.a('function');
    });
    it('flattens a nested array', function () {
      expect(_.flatten([1, [2], [3, [[4]]]])).to.eql([1, 2, 3, 4]);
    });
  });

  describe('intersection', function () {
    it('is a function', function () {
      expect(_.intersection).to.be.a('function');
    });
    it('returns list of values that are the intersection of all the arrays', function () {
      expect(_.intersection([1, 2, 3], [101, 2, 1, 10], [2, 1])).to.eql([1, 2]);
    });
  });

  describe('difference', function () {
    it('is a function', function () {
      expect(_.difference).to.be.a('function');
    });
    it('returns the values from array that are not present in the other arrays', function () {
      expect(_.difference([1, 2, 3, 4, 5], [5, 2, 10])).to.eql([1, 3, 4]);
    });
  });

  describe('delay', function () {
    it('is a function', function () {
      expect(_.delay).to.be.a('function');
    });
  });
});