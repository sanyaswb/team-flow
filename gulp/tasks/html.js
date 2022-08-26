// libs
import fileInclude from 'gulp-file-include';
import htmlMin from 'gulp-htmlmin';

// gulp
import { app } from '../app.js';
import browserSync from 'browser-sync';

export const html = () => {
	return app.gulp.src(app.paths.src.html)
		.pipe(fileInclude())
		.pipe(app.plugins.replace('src="../', 'src="./'))
		.pipe(app.plugins.if(
			app.isProd,
			htmlMin({
				collapseWhitespace: true
			})
		))
		.pipe(app.gulp.dest(app.paths.build.html))
		.pipe(browserSync.stream());
}
