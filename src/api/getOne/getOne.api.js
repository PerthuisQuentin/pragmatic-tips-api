import { HTTP_METHOD_GET } from 'Constants/httpMethods'

const handler = (request, response) => {
	response.send('Hello You !')
}

export default  {
	isEndPoint: true,
	type: HTTP_METHOD_GET,
	path: '/:id',
	handler
}