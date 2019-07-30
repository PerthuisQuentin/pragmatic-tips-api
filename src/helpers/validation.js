import Joi from '@hapi/joi'

const joiValidation = schema => (request, response, next) => {
	const data = {}

	if (schema.params) data.params = request.params
	if (schema.query) data.query = request.query
	if (schema.body) data.body = request.body

	Joi.validate(data, Joi.object().keys(schema), (error) => {
		if (error) return response.boom.badRequest('Request body or params are invalid', error)

		next()
	})
}

export default joiValidation