# cancellable-promise
An extension of native ES6 Promises that provides the ability to cancel and clear promise chains.


## Usage

### Creating a new cancellable promise

Cancellable promises are created just like regular promises, the only difference is the constructor you use.

```javascript
let promise = new CancellablePromise((resolve, reject) => {
	setTimeout(() => {
		resolve('Resolved!');
	}, 500)
});

promise
    .then(val => console.log(val))
    .catch(val => console.log(val));
```

### Cancelling a promise

Cancelling a promise, internally calls the "reject" on the promise. 

```javascript
promise.cancel();
```

### Clearing a promise chain

Sometimes it is helpful to just clear all the `.then`, and `.catch` promise chains. This method clears whatever has been set in the past.
 
```javascript
promise.clear();
```

## Common questions
 
### Will a cancellable promise still work with `Promise.race`, and `Promise.all`?

Yes. This extension literally `extends Promise`.

### When I call cancel on a promise, will it cause an error in the browser?

`.cancel` internally calls the rejection callback and so it will default to however the browser treats a rejected promise for ES6. Chrome for example will throw an error if a rejection is called on a promise, and there is no `.catch`. Firefox and Safari on the other hand, will not.
