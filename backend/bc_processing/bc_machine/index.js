const Machine = require('./machine');
const constantPool = require('./pool');

function run (bytecode, fnArgs) {
	const splitCode = bytecode.split('\n');

	const registerCount = splitCode[2].match(/\d+/)[0];

	const constPoolIndex = findIndexLast(splitCode, (str) => str.startsWith('Constant pool'));
	const constPoolCode = splitCode.slice(constPoolIndex);

	const instructions = splitCode.slice(4, constPoolIndex);

	const formattedBytecode = formatCode(instructions);

	const constPool = constantPool(constPoolCode);

	const machine = new Machine(registerCount, fnArgs, constPool);

	return `${machine.processCode(formattedBytecode)}\n\n${constPoolCode.join('\n')}`;
}

function findIndexLast (arr, pred) {
	for (let i = arr.length - 3; i >= 0; i -= 1) {
		if (pred(arr[i])) {
			return i;
		}
	}
	return -1;
}

function formatCode (bytecode) {
	return bytecode.map((str, i) => {
		return str.substr(53).trim();
		// const lineId = String(i + 1);
		// const lineIdLen = lineId.length;
		// const instruction = str.substr(53);
		// return `${lineId}${' '.repeat(5 - lineIdLen)}${instruction}`;
	});
}

module.exports = { run };
