const execute = require('./execute');
const comment = require('./comment');

function Machine (regCount, args, constantPool, poolCount) {
  this.acc;
  this.prev;
  this.retVal;

  // NOTE レジスタと引数用
  this.store = Object.fromEntries(Array.from({ length: args.length }, (_, i) => {
    return [`a${i}`, args[i]];
  }));

  this.regCount = regCount;

  this.context;
  this.test;
  
  this.constantPool = constantPool;
  this.poolCount = poolCount;
}

Machine.prototype.processCode = function (code) {
  const instrGen = fetchNext(code);

  let res = [];
  let curInstr = instrGen.next();
  while (!curInstr.done) {
    const terms = curInstr.value.match(/(?:(?:(?:\([^\(]+\))|(?:\w+)|(?:\d+)))/g);
    
    execute.call(this, ...terms);

    res.push(comment.call(this, curInstr.value, ...terms));

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