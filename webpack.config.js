const Path = require('path')
const NodeExternals = require('webpack-node-externals')

const rules = [
	{
		test: /\.js$/,
		loader: 'babel-loader',
		exclude: [
			/node_modules/,
			/dist/
		],
		options: {
			presets: ['@babel/preset-env']
		}
	}
]

const resolveAlias = path => Path.resolve(__dirname, path)

const aliases = mode => ({
	Config: resolveAlias(`./config.${mode}.js`),
	Constants: resolveAlias('./src/constants/'),
	Data: resolveAlias('./data/'),
	Helpers: resolveAlias('./src/helpers/'),
	Logger: resolveAlias('./src/logger'),
	Tips: resolveAlias('./src/tips')
})

module.exports = (env, argv) => {
	const mode = argv.mode || process.env.NODE_ENV || 'development'
	const isProd = mode === 'production'

	const config = {
		target: 'node',
		entry: Path.resolve(__dirname, 'src/server.js'),
		output: {
			path: Path.resolve(__dirname, 'dist'),
			filename: 'server.js'
		},
		module: {
			rules
		},
		externals: [NodeExternals()],
		resolve: {
			modules: ['src', 'node_modules'],
			alias: aliases(mode),
			extensions: ['.js', '.json']
		},
		performance: {
			hints: false
		},
		devtool: isProd ? false : '#eval-source-map'
	}

	return config
}