import * as Joi from 'joi';

export interface Validation<T = any> {
  validate: (request: T) => Joi.ValidationResult;
}