# group-on
Decently fast group flat array into hierarchical structure

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
## Usage:

```javascript
          groupOn
            .group(array, ['a.b', 'values', ['c']])
            .then(res => {
                result = res;
            })
            .catch(console.log);
```

Output:

```json
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

## Get leaves with diferent path

Input:
```json
[
    {
        "a": "A",
        "b": "D",
        "c": {
            "d": "AD",
            "e": {
                "f": 0
            }
        }
    },
    {
        "a": "B",
        "b": "B",
        "c": {
            "d": "BB",
            "e": {
                "f": 1
            }
        }
    },
    {
        "a": "B",
        "b": "B",
        "c": {
            "d": "BB",
            "e": {
                "f": 2
            }
        }
    },
    {
        "a": "A",
        "b": "C",
        "c": {
            "d": "AC",
            "e": {
                "f": 3
            }
        }
    }
]
```

```javascript
groupOn
    .group(array, ['a.b', 'values', ['c.d', 'c.e.f']])
    .then(console.log)
    .catch(console.log)
```

Output:
```json
[
    {
        "a": "A",
        "b": "D",
        "values": [
            {
                "c.d": "AD",
                "c.e.f": 0
            }
        ]
    },
    {
        "a": "B",
        "b": "B",
        "values": [
            {
                "c.d": "BB",
                "c.e.f": 1
            },
            {
                "c.d": "BB",
                "c.e.f": 2
            }
        ]
    },
    {
        "a": "A",
        "b": "C",
        "values": [
            {
                "c.d": "AC",
                "c.e.f": 3
            }
        ]
    }
]]}]

```

## Get by non-primitive field
Input
```json
[
    {
        "a": "A",
        "b": "D",
        "c": {
            "d": "AD"
        }
    },
    {
        "a": "B",
        "b": "B",
        "c": {
            "d": "BB"
        }
    },
    {
        "a": "B",
        "b": "B",
        "c": {
            "d": "BB"
        }
    },
    {
        "a": "A",
        "b": "C",
        "c": {
            "d": "AC"
        }
    }
]
```

```javascript
 groupOn
    .group(array, ['c', 'values', ['a', 'b']])
    .then(console.log)
    .catch(console.log)
```

Output:
```json
[
    {
        "c": {
            "d": "AD"
        },
        "values": [
            {
                "a": "A",
                "b": "D"
            }
        ]
    },
    {
        "c": {
            "d": "BB"
        },
        "values": [
            {
                "a": "B",
                "b": "B"
            },
            {
                "a": "B",
                "b": "B"
            }
        ]
    },
    {
        "c": {
            "d": "AC"
        },
        "values": [
            {
                "a": "A",
                "b": "C"
            }
        ]
    }
]
```

* * *

&copy; 2017 - MIT