function validateData(schemas) {
  return async function (req, res, next) {
    try {
      const validData = await schemas.validate(req.body, {
        abortEarly: false,
      });
      req.filteredData = validData;
      next();
    } catch (err) {
      next(err);
    }
  };
}

export default validateData;
