const joi = require("joi");
const sanitizeHtml = require("sanitize-html");

const productSchema = joi.object({
  title: joi.string().required(),
  description: joi.string().required(), 
  price: joi.number().required().min(0),
  image: joi.string().required(),
  category: joi.string().required(),
  stock: joi.number().required().min(0),
});

const userSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required().min(6),
});