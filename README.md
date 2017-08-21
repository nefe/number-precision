# number-precision

Perform plus, minus, multiply and division algorithms precisely using javascript

### Why

```js
2.3 + 2.4 = 4.699999999999999
1.0 - 0.9 = 0.09999999999999998
```

### Install

```
npm install number-precision --save
```

### Usage

```js
import NP from 'number-precision'
NP.strip(0.09999999999999998); // =0.1
NP.add(2.3, 2.4); // =4.7
NP.sub(1.0, 0.9); // =0.1
NP.multi(3, 0.3); // =0.9
NP.divide(0.9, 0.3); // =3
```

### License
MIT
