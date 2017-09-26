var assert = require('assert');
var expect = require('chai').expect;
var should = require('should');
var groupOn = require('../lib/groupOn');
var data = require('../default-test.json');
var test1 = require('../test-1.json');
var test2 = require('../test-2.json')

describe('groupOn groups Default Test, common factors: a.b, groupNames: values, leaves: c', function () {
    var array = null;
    var result = null;
    before(function (done) {
        array = data.rows;
        result = groupOn.groupSync(array, ['a.b', 'values', ['c']]);
        done();
    });

    it('Result should be array', function () {
        result.should.be.Array();
    });

    it('Result should have 6 elements', function () {
        result.map(e => e.should.has.property("values"));
    });

    it('Each element should have "values" key', function () {
        result.should.has.length(6);
    });
});

describe('groupOn groups Default Test return Promise', function () {
    var array = null;
    var result = null;
    before(function (done) {
        array = data.rows;
        groupOn
            .group(array, ['a.b', 'values', ['c']])
            .then(res => {
                console.log('%j', res)
                result = res;
            })
            .catch(console.log);

        done();
    });

    it('Result should be array', function () {
        result.should.be.Array();
    });

    it('Result should have 6 elements', function () {
        result.map(e => e.should.has.property("values"));
    });

    it('Each element should have "values" key', function () {
        result.should.has.length(6);
    });
});

describe('groupOn groups Default Test with Callback', function () {
    var array = null;
    var result = null;
    before(function (done) {
        array = data.rows;
        groupOn
            .group(array, ['a.b', 'values', ['c']], (err, res) => {
                if (err) {
                    console.log(err);
                    return done()
                }
                result = res;
                done()
            })
    });

    it('Result should be array', function () {
        result.should.be.Array();
    });

    it('Result should have 6 elements', function () {
        result.map(e => e.should.has.property("values"));
    });

    it('Each element should have "values" key', function () {
        result.should.has.length(6);
    });
});

describe('groupOn groups Default Test with invalid configs', function () {
    var array = null;
    var result = null;
    var error = null;
    before(function (done) {
        array = data.rows;
        groupOn
            .group(array, [12, 'values', 14], (err, res) => {
                if (err) {
                    error = err;
                    return done()
                }
                result = res;
                done()
            })
            .catch(err => { error = err })
    });

    it('Error should exist', function () {
        expect(error).to.be.instanceof(Error)
    });

    it('Result should be null', function () {
        expect(result).null
    });
});

describe('groupOn get leaves with diferent path', function () {
    var array = null;
    var result = null;
    var error = null;
    before(function (done) {
        array = test1;
        groupOn
            .group(array, ['a.b', 'values', ['c.d', 'c.e.f']], (err, res) => {
                if (err) {
                    error = err;
                    return done()
                }
                result = res;
                done()
            })
            .catch(err => { error = err })
    });

    it('Result should be array', function () {
        result.should.be.Array();
    });

})

describe(`groupOn group by non-primitive field`, function () {
    var array = null;
    var result = null;
    var error = null;
    before(function (done) {
        array = test2;
        groupOn
            .group(array, ['c', 'values', ['a', 'b']], (err, res) => {
                if (err) {
                    error = err;
                    return done()
                }
                result = res;
                done()
            })
            .catch(err => { error = err })
    });

    it('Result should be array', function () {
        result.should.be.Array();
    });

})