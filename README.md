### Getting Started
UserTrace module for tracking user actions and the average time each action takes. Has not been published to a registry, intended for running locally at this time.

### Use

```js
// Instanciate new trace
const userTrace = new UserTrace()

// Add an action
userTrace.addAction(JSON.stringify({action: 'jump', time: 100}))

// Get Stats
userTrace.getStats() // ex: [ {action: "jump", avg: 100} ]
```

#### Methods
**addAction:** Takes a json serialized string with an "action" (string) and "time" (int) property to add to the trace. Returns nothing or an error if there is one. Ex: 
```js
    1. {action: "jump", time: 100}
    2. {action: "run", time: 100}
    3. {action: "jump", time: 200}
```

**getStats:** Takes no inputs, returns a serialized json array of the average
time for each action that has been provided to the addAction function. Ex: 
```js
    [
        {action: "jump", avg: 150},
        {action: "run", avg: 100}
    ]
```

### Prerequisites
This library class is intended to be used with Node V6 and later. Any prior versionings of Node require an update or transpilation. 

### Installing
```shell
git clone https://github.com/asherzog/user-trace.git
```
```shell
npm i
```
or
```shell
yarn install
```

### Running the tests
Unit testing is run by [Mocha](https://mochajs.org/) using [Chai](https://www.chaijs.com). 
To run the tests:
```shell
npm i
npm test
```
Test coverage reporting not available at this time, but could be added with ease. 

### Deployment
This package has not been published to a registry. It can be cloned locally, or, to publish:
```shell
npm publish
```

### Linting
This package follows [Standard JS](https://standardjs.com/). Run:
```shell
standard
```
or 
```shell
standard --fix
```

### Built With
- [Mocha](https://mochajs.org/)
- [Chai](https://www.chaijs.com)
- [Standard JS](https://standardjs.com/)

### Authors
- asherzog19@gmail.com