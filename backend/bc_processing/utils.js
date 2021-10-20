// Process user input

function argsFromFnCall (ctx) {
  // NOTE 'm' flag -> can ^/$ match after every newline
  const call = ctx.request.body.value.match(/^\w+\([^\n;]+/m)[0];
  const args = call.match(/\((.*)\)$/)[1];
  // TODO re-write args so they are JSON.parse可能
  const parsed = JSON.parse(`[${args}]`);
  
  return parsed;
}

module.exports = { argsFromFnCall };