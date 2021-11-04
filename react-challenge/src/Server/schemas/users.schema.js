
const Joi = require('joi');

const userSchema = Joi.object({
    userName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    repeat_password: Joi.ref('password'),

    access_token: [
        Joi.string(),
        Joi.number()
    ],

})
    .with('username', 'password')
    .xor('password', 'access_token')
    .with('password', 'repeat_password');

module.exports = [
    userSchema
]
