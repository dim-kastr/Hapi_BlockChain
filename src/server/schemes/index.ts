import * as Joi from 'joi';
import { listTokens } from "../utils/listTokens"

export const outputOkSchema = (res: Joi.Schema): Joi.Schema => Joi.object({
  ok: Joi.boolean().example(true),
  result: res,
});

const tokenAddress = Joi.string().valid(...listTokens);
const amount = Joi.string();
const userPrivateKey = Joi.string();

const validMethod =
  Joi.object({
    tokenAddress: tokenAddress.required(),
    amount: amount.required(),
    userPrivateKey: userPrivateKey.required()
  })

export {
  validMethod
}