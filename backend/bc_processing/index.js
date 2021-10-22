const fs = require('fs');
const { exec } = require('child_process');

const bcMachine = require('./bc_machine/index');
const utils = require('./utils');

async function loadBytecode (ctx) {
  
  await exec('node --print-bytecode --print-bytecode-filter=foo ./output/output.js > ./output/bytecode.txt', (err) => {
    if (err) console.log(err);
  });

  return new Promise(function (resolve, reject) {
    fs.readFile('./output/bytecode.txt', 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

async function getBytecode (ctx) {
  const { args, argNames } = await utils.processInput(ctx);

  await fs.writeFile('./output/output.js', ctx.request.body.value, (err) => {
    if (err) console.log(err)
  });

  const bytecode = await loadBytecode(ctx);
  const formattedBC = bcMachine.run(bytecode, args, argNames);
  return formattedBC;
}

module.exports = { getBytecode };