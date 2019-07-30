import Joi from '@hapi/joi'

import Tips from 'Tips'

import { HTTP_METHOD_GET } from 'Constants/httpMethods'

const schema = {
	params: {
		id: Joi.number().integer().positive().options({ convert: true })
	}
}

const handler = (request, response) => {
	response.send(Tips.getOne(request.params.id))
}

export default  {
	isEndPoint: true,
	type: HTTP_METHOD_GET,
	path: '/:id',
	handler,
	schema
}