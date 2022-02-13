import * as Joi from 'joi';

export const outputOkSchema = (res: Joi.Schema): Joi.Schema => Joi.object({
  ok: Joi.boolean().example(true),
  result: res,
});

const tokenAddress = Joi.string();
const amount = Joi.string();
const userPrivateKey = Joi.string();

const validMethod =
  Joi.object({
    tokenAddress,
    amount,
    userPrivateKey
  })


export {
  validMethod
}