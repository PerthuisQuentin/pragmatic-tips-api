import Express from 'express'
import Chalk from 'chalk'

import Config from 'Config'
import Log from 'Logger'

const server = Express()

server.listen(Config.port, () => {
	Log.info(`${Chalk.yellow('[Server]')} Listening on port ${Chalk.bold(Config.port)}`)
})