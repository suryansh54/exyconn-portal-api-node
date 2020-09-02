const gulp = require('gulp');

gulp.task('message', () => {
    console.log('Hello I am gulp'); 
})

gulp.src(['src/swagger/**/*']).pipe(gulp.dest('dist/swagger'));
// gulp.src(['src/test/**/*']).pipe(gulp.dest('dist/test'));