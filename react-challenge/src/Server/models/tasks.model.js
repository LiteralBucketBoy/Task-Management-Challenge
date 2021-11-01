
const Joi = require('joi');

const taskSchema = Joi.object({
    index: Joi.number().integer().min(0).required(),
    uniqueId : Joi.string().required(),
    isMarked : Joi.boolean().required(),
    dateAdded : Joi.date().required(),
    dateModified : Joi.date().required(),
    archived :  Joi.boolean().required(),
    taskString: Joi.string()
        .min(5)
        .max(50)
        .required(),
})


module.exports = {
    taskSchema
}