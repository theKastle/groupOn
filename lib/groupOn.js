'use strict;'
var _ = require('lodash');
var stringify = require('fast-stable-stringify');

var stringifyKeyValue = function (obj, keys) {
    var concated = _.reduce(keys, (acc, k) => {
        if (typeof obj[k] === 'object') {
            return acc + stringify(obj[k]);
        } else {
            return acc + obj[k]
        }
    }, "")
    return concated;
}

var createCopy = function (from, fields) {
    var target = {};
    _.forEach(fields, f => {
        target[f] = from[f]
    })
    return target;
}

var groupOnce = function (array, commonFactors, groupName, leaves) {
    var groupedFields = commonFactors.split('.');
    var map = {};
    var parent = {};
    _.reduce(array, (acc, e) => {
        var concated = stringifyKeyValue(e, groupedFields);
        var item = createCopy(e, leaves);
        if (hasOwnProperty.call(map, concated)) {
            map[concated].push(item);
        } else {
            map[concated] = [item];
            parent[concated] = createCopy(e, groupedFields);
        }

        return acc;
    }, {});
    var keys = _.keys(map);
    var groups = _.reduce(keys, (acc, k) => {
        var item = parent[k];
        item[groupName] = map[k];
        acc.push(item);
        return acc;
    }, [])
    return groups;
}

var groupSync = function (array, groupConfigs, cb = () => { }) {
    var result = array;
    for (let i = 0; i < groupConfigs.length; i = i + 3) {
        result = groupOnce(result, groupConfigs[i], groupConfigs[i + 1], groupConfigs[i + 2]);
    }
    return result;
}

var deepGroup = function (array, configs, currentConfigIndex) {
    var index = currentConfigIndex || 0;

    if (index < configs.length - 1) {
        var { by, groupName, memberKeys } = configs[cur];
        var result = groupOnce(array, by, groupName, memberKeys);
        _.forEach(result, e => {
            var next = index + 1;
            e[groupName] = deepGroup(e[groupName], configs, next)
        })
        return result;
    } else if (index == configs.length - 1) {
        var { by, groupName, memberKeys } = configs[cur];
        return groupOnce(array, by, groupName, memberKeys);
    }
}

var generateDepthGroup = function (commonFactors, groupNames, leaves) {
    var groupNames = _.split(groupNames, '.');
    var gets = leaves;
    var turns = [];
    _.forEach(commonFactors, function (factor) {
        var turn = commonFactors.join('.');
        var groupName = groupNames.pop();
        var select = _.split(commonFactors.pop(), '.');
        var loop = [turn, groupName, gets];
        gets = _.concat([groupName], select);
        turns[turns.length] = loop[0];
        turns[turns.length] = loop[1];
        turns[turns.length] = loop[2];
    });

    return turns;
}

/**
 * A module to group flat array of json to hieriachal structure
 * @module groupOn
 */
var groupOn = {
    
    /**
     * 
     * commonFactors: ['field.field.field']
     * 
     */
    groupOnce: groupOnce,

    /**
     * groupConfigs conventionally should have length a multiple of 3,
     * with each 3 adjacent elements respectively are commonFactors, groupNames and leaves
     * 
     * e.g 
     * 
     *    [
     *      'a', 'values', ['b']
     *    ]
     * 
     * or  
     * 
     *     [
     *      'a.b', 'values', ['c'],
     *      'b', 'values', ['values', 'b']
     *     ]
     * @param {Array} array 
     * @param {Array} groupConfigs
     * @return {Promise}
     */
    group: function (array, groupConfigs, cb = () => { }) {
        return new Promise((resolve, reject) => {
            var result = array;
            try {
                for (let i = 0; i < groupConfigs.length; i = i + 3) {
                    result = groupOnce(result, groupConfigs[i], groupConfigs[i + 1], groupConfigs[i + 2]);
                }
            } catch (err) {
                reject(err)
                return cb(err)
            }

            resolve(result)
            cb(null, result);
        })
    },

    groupSync: groupSync
}

module.exports = groupOn;