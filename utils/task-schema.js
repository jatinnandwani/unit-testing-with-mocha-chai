const Joi = require("@hapi/joi");

const schema = Joi.object({
    user_name: Joi.string() .min(3) .required(),
    user_password: Joi.string() .min(5) .required(),
    is_permamnent_employee: Joi.boolean()
})


validateTask = (task) => schema.validate(task);

module.exports = {
    validateTask
}