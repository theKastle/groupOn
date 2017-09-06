# group-on
[![Build Status](https://travis-ci.org/theKastle/groupOn.svg?branch=master)](https://travis-ci.org/theKastle/groupOn)

[![https://nodei.co/npm/group-on.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/group-on.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/group-on)


#### groupOn.group(array, groupConfigs, callback)
Return a Promise

| Param | Type |
| --- | --- |
| array | <code>Array</code> |
| groupConfigs | <code>Array</code> |

    groupConfigs conventionally should have length a multiple of 3,
    with each 3 adjacent elements respectively are commonFactors, groupNames and leaves  
    e.g 
      
         [
           'a', 'values', ['b']
         ]
      
      or  
      
          [
           'a.b', 'values', ['c'],
           'b', 'values', ['values', 'b']
          ]

Example:
  
Input: 

```
    var array = [
        {"a": "A", "b": "D", "c": "AD", "d": "4", "e": 1},
        {"a": "B", "b": "B", "c": "BB", "d": "4", "e": 1},
        {"a": "A", "b": "C", "c": "AC", "d": "4", "e": 1},
        {"a": "B", "b": "B", "c": "BB", "d": "4", "e": 1},
        {"a": "B", "b": "A", "c": "BA", "d": "4", "e": 1},
        {"a": "B", "b": "B", "c": "BB", "d": "4", "e": 1},
        {"a": "A", "b": "B", "c": "AB", "d": "4", "e": 1},
        {"a": "A", "b": "B", "c": "AB", "d": "4", "e": 1},
        {"a": "C", "b": "B", "c": "CB", "d": "4", "e": 1},
        {"a": "C", "b": "B", "c": "CB", "d": "4", "e": 1}
    ]
    
```
Usage:

```javascript
          groupOn
            .group(array, ['a.b', 'values', ['c']])
            .then(res => {
                result = res;
            })
            .catch(console.log);
```

Output:

```
[
    {
        "a": "A",
        "b": "D",
        "values": [
            {
                "c": "AD"
            }
        ]
    },
    {
        "a": "B",
        "b": "B",
        "values": [
            {
                "c": "BB"
            },
            {
                "c": "BB"
            },
            {
                "c": "BB"
            }
        ]
    },
    {
        "a": "A",
        "b": "C",
        "values": [
            {
                "c": "AC"
            }
        ]
    },
    {
        "a": "B",
        "b": "A",
        "values": [
            {
                "c": "BA"
            }
        ]
    },
    {
        "a": "A",
        "b": "B",
        "values": [
            {
                "c": "AB"
            },
            {
                "c": "AB"
            }
        ]
    },
    {
        "a": "C",
        "b": "B",
        "values": [
            {
                "c": "CB"
            },
            {
                "c": "CB"
            }
        ]
    }
]
```

* * *

&copy; 2017 - lqtien