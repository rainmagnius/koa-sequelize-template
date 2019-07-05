const pinoHttp = require('pino-http');

function logger() {
  const pinoLog = pinoHttp({
    customLogLevel: (res, err) => {
      if (err || res.err) return 'error';
      return 'info';
    },
  });

  function httpLogger(ctx, next) {
    pinoLog(ctx.req, ctx.res);
    ctx.log = ctx.req.log;
    return next().catch((e) => {
      ctx.res.err = e;
      throw e;
    });
  }

  return httpLogger;
}

module.exports = logger;
