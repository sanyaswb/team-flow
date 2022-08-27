// libs
import webpackStream from 'webpack-stream';
import webpack from 'webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

// gulp
import { app } from '../app.js';

// node
import path from 'path';

export const scripts = () => {
	const options = {
		target: ['browserslist'],
		mode: app.isProd ? 'production' : 'development',
		output: {
			filename: 'index.min.js'
		},
		module: {
			rules: [
				{
					test: /\.ts$/,
					use: ['babel-loader'],
					exclude: /node-modules/
				},
				{
					test: [/\.jpg$/, /\.png$/, /\.jpeg$/, /\.svg$/, /\.webp$/],
					use: ['file-loader'],
					exclude: /node-modules/
				}
			]
		},
		resolve: {
			extensions: ['.js', '.ts', '.json', 'tsx', '...'],
			plugins: [
				new TsconfigPathsPlugin()
			]
		},
		optimization: {
			minimizer: [new UglifyJsPlugin()]
		}
	};

	return app.gulp.src(app.paths.src.scripts)
		.pipe(webpackStream(options, webpack))
		.pipe(app.gulp.dest(app.paths.build.scripts))
		.pipe(app.plugins.browserSync.stream());
}