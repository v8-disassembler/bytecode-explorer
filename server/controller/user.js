const bc = require('../bc_processing/index');

async function runSubmission (ctx, next) {
  try {
    const bytecode = await bc.getBytecode(ctx);
    ctx.status = 200;
    ctx.body = bytecode;
  } catch (err) {
    console.log(err);
    ctx.status = 404;
    ctx.body = err;
  }
}

module.exports = { runSubmission };