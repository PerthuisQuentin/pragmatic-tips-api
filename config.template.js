/*
Clone this file in 'development.config.js' or 'production.config.js' and edit it according to your environement.
Config file used depends on the --mode option. If not provided, it depends of the environnement variable NODE_ENV.
Without informations, it will fall back to 'development'
*/

module.exports = {
	// Server
	port: 8080,

	// Logger
	// Levels : error | warn | info | verbose | debug | silly
	logger: {
		level: 'info',
		printApiTree: true,

		// Console logs
		console: {
			enabled: true,
			level: 'info'
		},

		// Requests logs
		requests: {
			enabled: true,
			// Formats : combined | common | dev | short | tiny
			format: 'combined'
		},
	
		// Files logs
		// Example : { name: 'error.log', level: 'error' }
		files: [
			{
				name: 'error.log',
				level: 'error'
			}
		]
	}
}