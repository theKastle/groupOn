
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



* * *

&copy; 2017 - lqtien