// 导入我们需要的包，通过require('包的名字');
var gulp = require('gulp'),//本地安装的gulp所用的地方
	less = require('gulp-less'),
	htmlmin = require('gulp-htmlmin'),
	imagemin = require('gulp-imagemin'),
	cssmin = require('gulp-minify-css'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	autoprefixer = require('gulp-autoprefixer');

// 定义一个testLess任务（名称自定义）
gulp.task('testLess', function () {
	gulp.src('src/less/index.less')//该任务针对的文件
	.pipe(less())//该任务调用的模块,方法里面是可以传参数的
	.pipe(gulp.dest('src/css'));//将会在src/css下生成index.css
});

// html压缩
gulp.task('testHtml',function(){
	var options={
		removeComments:true,//清除HTML注释
		collapseWhitespace:true,//压缩html
		collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
	};
	gulp.src('src/html/*.html')
		.pipe(htmlmin(options))
        .pipe(gulp.dest('dist/html'));
});

// 图片压缩
gulp.task('testImage',function(){
	var options={
		optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
        progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
        interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
        multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
	};
	gulp.src('src/img/*.{png,jpg,gif,ico}')
		.pipe(imagemin(options))
		.pipe(gulp.dest('dist/img'))
});

// 压缩css文件
gulp.task('testCss',function(){
	var options={
		advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
        compatibility: 'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
        keepBreaks: true,//类型：Boolean 默认：false [是否保留换行]
        keepSpecialComments: '*'
            //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
	};
	gulp.src('src/css/*.css')
		.pipe(cssmin())
		.pipe(gulp.dest('dist/css'));
});

// 压缩js文件
gulp.task('testJs',function(){
	var options={
		mangle: true,//类型：Boolean 默认：true 是否修改变量名
        compress: true,//类型：Boolean 默认：true 是否完全压缩
        preserveComments: 'all' //保留所有注释
	};
	gulp.src('src/js/*.js')
		.pipe(uglify(options))
		.pipe(gulp.dest('dist/js'));
});

// js合并
gulp.task('testConcat',function(){
	gulp.src('src/js/*.js')
		.pipe(concat('all.js'))//合并后的名字
		.pipe(gulp.dest('dist/js'));
});

//处理浏览器的前缀
gulp.task('testAuto',function(){
	var options={
		browsers: ['last 2 versions', 'Android >= 4.0'],
        cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
        remove:true //是否去掉不必要的前缀 默认：true 
	};
	gulp.src('src/css/index.css')
		.pipe(autoprefixer(options))
		.pipe(gulp.dest('dist/css'));
});



gulp.task('default',['testLess','testHtml']);//定义默认任务

//通过命令工具 gulp testLess 来执行文件   如果使用 gulp default  就会把后面的任务全部执行


//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
//gulp.dest(path[, options]) 处理完后文件生成路径