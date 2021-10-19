const execute = require('./execute');
const comment = require('./comment');

function Machine (regCount, constantPool, poolCount) {
  this.acc;
  this.store = {};
  this.constantPool = constantPool;
  this.context;
  this.test;
  this.retVal;

  this.poolCount = poolCount;
  this.regCount = regCount;
}

Machine.prototype.processCode = (code) => {
  const instrGen = fetchNext(code);

  let res = [];
  let curInstr = instrGen.next();
  while (!curInstr.done) {
    const terms = curInstr.match(/(?:(?:(?:\([^\(]+\))|(?:\w+)|(?:\[\d+\])))/g);
    execute.call(this, ...terms);

    res.push(comment.call(this, ...terms));

    curInstr = instrGen.next();
  }
  
  return res.join('\n');
}

// function addComment (instruction) {
//   const terms = instruction;
  
//   // NOTE single term expressions have 1 trailing \s to account for
//   const instrLen = instruction.length - (terms.length === 1 ? 1 : 0);
//   return `${instruction.trim()}${' '.repeat(60 - instrLen)}${getComment(...terms)}`;
// };

function * fetchNext (code) {
  let i = 0;

  while (i < code.length) {
    yield code[i];
    i += 1;
  }
}

module.exports = Machine;