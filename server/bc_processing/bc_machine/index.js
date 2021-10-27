const Machine = require('./machine');
const constantPool = require('./pool');

function keyCode (byteIndices) {
  return Object.fromEntries(byteIndices.map((ind, i) => [ind, i]));
}

function run (bytecode, fnArgs, fnArgNames) {
	const splitCode = bytecode.split('\n');
	const registerCount = splitCode[2].match(/\d+/)[0];

	const constPoolIndex = findIndexLast(splitCode, (str) => str.startsWith('Constant pool'));
	const constPoolCode = splitCode.slice(constPoolIndex);

	const instructions = splitCode.slice(4, constPoolIndex);

	const formattedBytecode = formatCode(instructions);
	const byteIndices = getByteIndices(instructions);
	const keyedCodeIndices = keyCode(byteIndices);

	const { properties, propsLen } = constantPool(constPoolCode);

	const machine = new Machine(registerCount, fnArgs, fnArgNames, properties, propsLen, keyedCodeIndices);

	return `${machine.processCode(formattedBytecode)}\n\n${constPoolCode.join('\n')}`;
}

function getByteIndices(code) {
	const atIndex = code[0].indexOf('@');
	const colonIndex = code[0].indexOf(':');
	return code.map((str) => {
		return str.substring(atIndex + 1, colonIndex - 1).trim();
	});
}

function formatCode (bytecode) {
	return bytecode.map((str) => {
		return str.substr(53).trim();
	});
}

function findIndexLast (arr, pred) {
	for (let i = arr.length - 3; i >= 0; i -= 1) {
		if (pred(arr[i])) {
			return i;
		}
	}
	return -1;
}

module.exports = { run };
