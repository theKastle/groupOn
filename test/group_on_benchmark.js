var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;
var groupOn = require('../lib/groupOn');

var data = [];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var generateSample = function () {
    for (let i = 0; i < 2; i++) {
        var e = {
            "a": "A" + getRandomInt(1, 8),
            "b": { "val": getRandomInt(2, 6) },
            "c": "" + getRandomInt(1, 7)
        }
        data.push(e)
    }
}

generateSample()

var normalGroupResult = null;

suite
    .add('Normal Group ', function () {
        normalGroupResult = groupOn().group(data, ['a', 'value', ['c']]);
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
        console.log('Group     : %j', normalGroupResult);
    })
    .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({ 'async': true });


