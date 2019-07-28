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

module.exports = (env, argv) => {
	const isProd = argv.mode === 'production'

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
			extensions: ['.js', '.json']
		},
		performance: {
			hints: false
		},
		devtool: isProd ? false : '#eval-source-map'
	}

	return config
}