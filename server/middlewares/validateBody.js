import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    console.log('Request Body Before Validation:', req.body); // Логгирование тела запроса перед валидацией
    await schema.validateAsync(req.body, {
      abortEarly: false,
    });
    console.log('Validation passed'); // Логгирование успешной валидации
    next();
  } catch (err) {
    const error = createHttpError(400, 'Bad Request', {
      errors: err.details,
    });
    next(error);
  }
};
