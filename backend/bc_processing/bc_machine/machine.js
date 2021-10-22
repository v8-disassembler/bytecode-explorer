const execute = require('./execute');
const comment = require('./comment');

function Machine (regCount, args, argNames, constantPool, poolCount, keyedCodeIndices) {
	this.acc;
	this.prev;
	this.retVal;
  this.pendingMsg;

	this.runningIndex = 0;

	this.keyedCodeIndices = keyedCodeIndices;

	this.args = args;
	this.argNames = argNames;
	// NOTE レジスタと引数用
	this.store = Object.fromEntries(
		Array.from({ length: args.length }, (_, i) => {
			return [ `a${i}`, args[i] ];
		})
	);

	this.regCount = regCount;

	this.context;
	this.test;

	this.constantPool = constantPool;
	this.poolCount = poolCount;
}

Machine.prototype.processCode = function (code) {
	const res = [ `Args: ${this.args.map((arg, i) => `(${this.argNames[i]}) a${i} = ${arg}`).join(', ')}\n` ];

	const keys = Object.keys(this.keyedCodeIndices);
	const maxByteLen = keys[keys.length - 1].length;

	let prevIndex = this.runningIndex;
	while (this.runningIndex < code.length) {
		// NOTE runningIndex updated inside execute.js
		const terms = code[this.runningIndex].match(/(?:(?:(?:\([^\(]+\))|(?:\w+)|(?:\d+)))/g);

		execute.call(this, ...terms);

		const spaces = ' '.repeat(maxByteLen - keys[prevIndex].length + 1);
		res.push(`${keys[prevIndex]}${spaces}> ${comment.call(this, code[prevIndex], ...terms)}`);
    
		if (this.runningIndex === prevIndex) {
			this.runningIndex += 1;
		}
		prevIndex = this.runningIndex;
	}

	return res.join('\n\n');
};

module.exports = Machine;
