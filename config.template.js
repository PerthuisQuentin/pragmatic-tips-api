/*
Clone this file in 'development.config.js' or 'production.config.js' and edit it according to your environement.
Config file used depends on the --mode option. If not provided, it depends of the environnement variable NODE_ENV.
Without informations, it will fall back to 'development'
*/

module.exports = {
	// Server
	port: 8000,

	// Logger
	// Levels : error | warn | info | verbose | debug | silly
	logger: {
		level: 'info',

		// Logger in console
		consoleEnabled: true,
		consoleLevel: 'info',

		// Logger in files
		// Example : { name: 'error.log', level: 'error' }
		files: [
			{
				name: 'error.log',
				level: 'error'
			}
		]
	}
}