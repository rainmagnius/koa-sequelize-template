function resultHandler() {
  return async (ctx, next) => {
    try {
      await next();
      if (ctx.status === 200 && !ctx.body.status) ctx.body.status = 'OK';
    } catch (err) {
      const body = {
        status: 'ERROR',
      };
      if (typeof err.code === 'number') {
        body.error = err;
      } else {
        body.error = {
          code: 500,
          message: 'Server error',
        };
      }
      ctx.body = body;
    }
  };
}

module.exports = resultHandler;
