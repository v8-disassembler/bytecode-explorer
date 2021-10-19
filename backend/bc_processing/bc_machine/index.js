const Machine = require('./machine');

function run (bytecode) {
  const splitCode = bytecode.split('\n');

  const registerCount = splitCode[2].match(/\d+/)[0];

  const constPoolIndex = findIndexLast(splitCode, (str) => str.startsWith('Constant pool'));
  const instructions = splitCode.slice(4, constPoolIndex);

  const formattedBytecode = formatCode(instructions);

  const machine = new Machine(registerCount);

  return `${formattedBytecode}\n\n${splitCode.slice(constPoolIndex).join('\n')}`
}

function findIndexLast (arr, pred) {
  console.log(arr.length, arr[132])
  for (let i = arr.length - 3; i >= 0; i -= 1) {
    if (pred(arr[i])) {
      return i;
    }
  }
  return -1;
}

function formatCode (bytecode) {
  return bytecode.map((str, i) => {
    const lineId = String(i + 1);
    const lineIdLen = lineId.length;
    const instruction = str.substr(53);
    return `${lineId}${' '.repeat(5 - lineIdLen)}${instruction}`;
  }).join('\n');
}

module.exports = { run };