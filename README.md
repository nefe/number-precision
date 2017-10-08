# number-precision

Perform addition, subtraction, multiplication and division operations precisely using javascript

### Why

```js
0.1 + 0.2 = 0.30000000000000004
1.0 - 0.9 = 0.09999999999999998
0.105.toFixed(2) = 0.1 // not 0.11
```

### Install

```
npm install number-precision --save
```

### Usage

```js
import NP from 'number-precision'
NP.strip(0.09999999999999998); // =0.1
NP.add(0.1, 0.2); // =0.3 not 0.30000000000000004
NP.add(2.3, 2.4); // =4.7 not 4.699999999999999
NP.minus(1.0, 0.9); // =0.1 not 0.09999999999999998
NP.times(3, 0.3); // =0.9 not 0.8999999999999999
NP.times(0.362, 100); // = 36.2, not 36.199999999999996
NP.divide(1.21, 1.1); // =1.1 not 1.0999999999999999
NP.round(0.105, 2); // =0.11 not 0.1
```

### License
MIT
