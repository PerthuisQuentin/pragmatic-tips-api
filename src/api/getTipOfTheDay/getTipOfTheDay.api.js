import Tips from 'Tips'

import { HTTP_METHOD_GET } from 'Constants/httpMethods'

const handler = (request, response) => {
	response.send(Tips.getTipOfTheDay())
}

export default  {
	isEndPoint: true,
	type: HTTP_METHOD_GET,
	path: '/tip-of-the-day',
	handler
}