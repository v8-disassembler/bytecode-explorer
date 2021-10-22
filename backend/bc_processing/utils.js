// Process user input

function argsFromFnCall (call) {
  // NOTE 'm' flag -> can ^/$ match after every newline
  const args = call.match(/\((.*)\)$/)[1];
  // TODO re-write args so they are JSON.parse可能
  const parsed = JSON.parse(`[${args}]`);
  
  return parsed;
}

function argNamesFromFnCall (input, call) {
  const fnName = call.match(/^\s*(\w+)/)[1];
  const reg = new RegExp(`^\\s*function\\s+${fnName}\\s*\\((\\w+)\\)[^\n\\{]+`);
  const argNames = reg.exec(input)[1];
  
  return argNames;
}

async function processInput (ctx) {
  const input = ctx.request.body.value;
  const call = input.match(/^\w+\([^\n;]+/m)[0];

  const args = argsFromFnCall(call);
  const argNames = argNamesFromFnCall(input, call);

  return { args, argNames };
}

module.exports = { processInput };