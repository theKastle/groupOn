var assert = require('assert');
var expect = require('chai').expect;
var should = require('should');
var groupOn = require('../lib/groupOn');
var data = require('../row2.json')

describe('groupOn', function () {
    var array = null;
    before(function (done) {
        array = data.rows;
        done();
    });

    it('Group', function () {
        var con = groupOn().group(array, ['a', 'values', ['b']]);
        console.log(con)
    });
});