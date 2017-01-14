/**
 * Created by MrPencil on 2016/5/12.
 */
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('AutoFxPre', function () {
    gulp.src('css/index.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0', 'ios 7','ie >= 6'],
            cascade: false, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:false //是否去掉不必要的前缀 默认：true
        }))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('default',['AutoFxPre']);
