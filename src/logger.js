import Winston from 'winston'
import Chalk from 'chalk'

import Config from 'Config'

const { combine, json, printf, timestamp } = Winston.format

const customLevels = {
	levels: {
		error: 0, 
		warn: 1, 
		info: 2, 
		verbose: 3, 
		debug: 4, 
		silly: 5 
	},
	colors: {
		error: Chalk.red, 
		warn: Chalk.yellow,
		info: Chalk.green, 
		verbose: Chalk.magenta, 
		debug: Chalk.blue,
		silly: Chalk.cyan
	}
}

const formatTimestamp = timestamp => {
	const date = new Date(timestamp)
	return Chalk.grey(date.toISOString())
}

const formatLevel = level => customLevels.colors[level](`[${level.toUpperCase()}]`)

const formatLog = printf(({ level, message, timestamp }) => `${formatTimestamp(timestamp)} ${formatLevel(level)} ${message}`)

const customFormater = combine(
	timestamp(),
	formatLog
)

const customLogger = {
	levels: customLevels.levels,
	level: Config.logger.level,
	format: customFormater,
	transports: []
}

if (Config.logger.console.enabled) {
	customLogger.transports.push(new Winston.transports.Console({
		format: customFormater,
		level: Config.logger.console.level
	}))
}

if (Config.logger.files) {
	Config.logger.files.forEach(file => customLogger.transports.push(new Winston.transports.File({
		format: json(),
		filename: file.name,
		level: file.level
	})))
}

export default Winston.createLogger(customLogger)