
const Joi = require('joi');

const taskSchema = Joi.object({
    index: Joi.number().integer().min(0).required(),
    uniqueId : Joi.string().required(),
    isMarked : Joi.boolean().required(),
    dateAdded : Joi.date().required(),
    dateModified : Joi.date().required(),
    archived :  Joi.boolean().required(),
    taskString: Joi.string()
        .min(1)
        .max(50)
        .required(),
    ownerId: Joi.string().required(),
})


module.exports = {
    taskSchema
}