import Tips from 'Tips'

import { HTTP_METHOD_GET } from 'Constants/httpMethods'

const handler = (request, response) => {
	response.send(Tips.getAll())
}

export default  {
	isEndPoint: true,
	type: HTTP_METHOD_GET,
	path: '/',
	handler
}