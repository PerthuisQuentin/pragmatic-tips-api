import { HTTP_METHOD_GET } from 'Constants/httpMethods'

const handler = (request, response) => {
	response.send('Hello World !')
}

export default  {
	isEndPoint: true,
	type: HTTP_METHOD_GET,
	path: '/',
	handler
}