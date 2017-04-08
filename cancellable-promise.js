function CancellablePromise(callback) {
	const promise = new Promise(callback);
	let references = [];
	let isCanceled = false;

	function createReference(callback) {
		if (callback) {
			let i = references.push(callback) - 1;
			callback = (o) => references[i](o);
		}

		return callback;
	}

	class Mutable extends Promise {
		constructor(fn) {
			super(fn);
		}

		get isCanceled() {
			return isCanceled;
		}

		then(onResolved, onRejected) {
			onResolved = createReference(onResolved);
			onRejected = createReference(onRejected);

			return Promise.prototype.then.call(this, onResolved, onRejected);
		}

		catch(fn) {
			return Promise.prototype.catch.call(this, fn);
		}

		cancel() {
			isCanceled = true;
			return this;
		}

		clear() {
			references = references.map(callback => Function.prototype);
			return this;
		}
	}

	return new Mutable(function (resolve, reject) {
		let handler = val => (isCanceled) ? reject({isCanceled}) : resolve(val);
		promise.then(handler);
		promise.catch(handler);
	});
}
