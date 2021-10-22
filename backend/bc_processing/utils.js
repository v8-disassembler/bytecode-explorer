// Process user input

function argsFromFnCall (call) {
  // NOTE 'm' flag -> can ^/$ match after every newline
  // TODO re-write args so they are JSON.parse可能
  const args = call.match(/\((.*)\)$/)[1].replace(/'/g, '"');
  
  const parsed = JSON.parse(`[${args}]`);
  
  return parsed;
}

function argNamesFromFnCall (input, call) {
  const fnName = call.match(/^\s*(\w+)/)[1];
  
  const reg = new RegExp(`^\\s*function\\s+${fnName}\\s*\\((.+)\\)[^\n\\{]*`);
  const argNames = reg.exec(input)[1];
  return { argNames: argNames.split(/,\s?/), fnName };
}

async function processInput (ctx) {
  const input = ctx.request.body.value;
  const call = input.match(/^\w+\([^\n;]+/m)[0];
  
  const args = argsFromFnCall(call);
  const { argNames, fnName } = argNamesFromFnCall(input, call);

  return { args, argNames, fnName };
}

module.exports = { processInput };