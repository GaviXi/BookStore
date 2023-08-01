let path = require("path");
module.exports = {
	//代理
	devServer: {
		// publicPath:'./',
		// port:'3333',
		proxy: {
			//MAC系统target是http://127.0.0.1:3000
			'/api': {
				target: "http://localhost:3000",
				changeOrigin: true,
				secure:false,
				pathRewrite: {
					'^/api': '/api'
				}
			}
		},
	},
	configureWebpack: (config) => {
		config.resolve = {
			extensions: ['.js', '.json', '.vue'],
			alias: {
				'@': path.resolve(__dirname, './src'),
			}
		}
	}
}