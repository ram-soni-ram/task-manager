function asyncHandler(func) {
  return async function (req, res, next) {
    Promise.resolve(func(req, res, next)).catch(next);
  };
}

export default asyncHandler;
