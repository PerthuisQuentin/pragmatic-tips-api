import Chalk from 'chalk'
import { Router } from 'express'

import Log from 'Logger'

import { HTTP_METHODS_TO_EXPRESS_FUNCTIONS } from 'Constants/httpMethods'

const getEndPointHandlers = endPoint => {
	const apiHandlers = endPoint.handlers ? endPoint.handlers : endPoint.handler
	return Array.isArray(apiHandlers) ? apiHandlers : [apiHandlers]
}

const buildEndpoint = (router, endPoint) => {
	const middlewares = getEndPointHandlers(endPoint)
	router[HTTP_METHODS_TO_EXPRESS_FUNCTIONS[endPoint.type]](endPoint.path, ...middlewares)
}

const printEndPoint = (head, endPoint) => {
	const middlewares = getEndPointHandlers(endPoint)
	const message = `${Chalk.blue(HTTP_METHODS_TO_EXPRESS_FUNCTIONS[endPoint.type].toUpperCase())} ${endPoint.path} ${Chalk.gray(`(${middlewares.length} middlewares)`)}`
	Log.info(`${Chalk.yellow('[API]')} ${head}${message}`)
}

const isApiObject = api => typeof api === 'object' && (api.isNode || api.isEndPoint)

const buildApiRouterRecursively = (router, nodeOrEndPoint) => {
	if (!isApiObject(nodeOrEndPoint)) {
		Log.error(`Unexpected object while building API : ${nodeOrEndPoint}`)
		return process.exit(1)
	}

	if (nodeOrEndPoint.isNode) {
		const subRouter = Router()
		nodeOrEndPoint.apis.forEach(child => buildApiRouterRecursively(subRouter, child))
		router.use(nodeOrEndPoint.path, subRouter)	
	}
	else if (nodeOrEndPoint.isEndPoint) {
		buildEndpoint(router, nodeOrEndPoint)
	}
}

const printApiRecursively = (nodeOrEndPoint, indent, last, root) => {
	if (!isApiObject(nodeOrEndPoint)) {
		Log.error(`Unexpected object while printing API : ${nodeOrEndPoint}`)
		return process.exit(1)
	}

	let head = indent
	if (root) {
		indent += ''
	} else if (last) {
		head += '└╴'
		indent += '  '
	} else {
		head += '├╴'
		indent += '│ '
	}

	if (nodeOrEndPoint.isNode) {
		Log.info(`${Chalk.yellow('[API]')} ${head}${Chalk.underline(nodeOrEndPoint.path)}`)
		nodeOrEndPoint.apis.forEach((child, i) => printApiRecursively(child, indent, i === nodeOrEndPoint.apis.length - 1, false))
	}
	else if (nodeOrEndPoint.isEndPoint) {
		printEndPoint(head, nodeOrEndPoint)
	}
}

export const buildApiRouter = api => {
	const apiRouter = Router()
	buildApiRouterRecursively(apiRouter, api)
	return apiRouter
}

export const printApi = api => printApiRecursively(api, '', true, true)