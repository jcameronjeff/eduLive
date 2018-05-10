module.exports = {
	entry: './client.js',
	output: {
		filename: "public/bundle.js"
	},
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				exlude: /(node_modules|server.js|test)/,
				loader: 'babel',
				query: {
          			babelrc: true,
		        }
			}
		]
	}
}