import Express from 'express'
import Chalk from 'chalk'
import BodyParser from 'body-parser'
import Morgan from 'morgan'
import Boom from 'express-boom'

import Config from 'Config'
import Log from 'Logger'
import {
	buildApiRouter,
	printApi
} from 'Helpers/api'

import api from './api'

const server = Express()

if (Config.logger.requests.enabled) server.use(Morgan(Config.logger.requests.format))

// Parsers
server.use(BodyParser.json())

// Errors
server.use(Boom())

// APIs
Log.info(Chalk.yellow('[Server]'), 'Loading API')
server.use('/', buildApiRouter(api))
if (Config.logger.printApiTree) printApi(api)

server.listen(Config.port, () => {
	Log.info(`${Chalk.yellow('[Server]')} Listening on port ${Chalk.bold(Config.port)}`)
})