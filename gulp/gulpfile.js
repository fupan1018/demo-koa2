var gulp = require('gulp'),
    /*css压缩，内部链接加版本号*/
    cssmin = require('gulp-minify-css'),
    //css压缩插件 npm install gulp-minify-css --save-dev
    cssver = require('gulp-make-css-url-version'),
    //css里的链接加版本号 npm install gulp-make-css-url-version --save-dev
    /*css压缩，内部链接加版本号结束*/
    htmlmin = require('gulp-htmlmin'),
    //html压缩插件 npm install gulp-htmlmin --save-dev
    uglify = require('gulp-uglify'),
    //js压缩插件 npm install gulp-uglify --save-dev
    /*图片压缩插件集合*/
    imagemin = require('gulp-imagemin'),
    //img压缩插件 npm install gulp-imagemin --save-dev
    pngquant = require('imagemin-pngquant'),
    //加强img压缩性能插件 npm install imagemin-pngquant --save-dev
    cache = require('gulp-cache'),
    /* 减少压缩图片的内存消耗 npm install gulp-cache --save-dev
    只压缩修改的图片。压缩图片时比较耗时，在很多情况下我们只修改了某些图片，
    没有必要压缩所有图片，使用”gulp-cache”只压缩修改的图片，
    没有修改的图片直接从缓存文件读取（C:\Users\Administrator\AppData\Local\Temp\gulp-cache）。
    */
    /*图片压缩插件集合结束*/
    rev = require('gulp-rev-append'),
    //给html引入文件加版本号清除缓存 npm install gulp-rev-append --save-dev
    /*编译less文件集合*/
    less = require('gulp-less'),
    //编译less文件为css文件 npm install gulp-less --save-dev
    sourcemaps = require('gulp-sourcemaps'),
    /* 为了找到生成css后对应的less文件
    当less有各种引入关系时，编译后不容易找到对应less文件，
    所以需要生成sourcemap文件，方便修改
    npm install gulp-sourcemaps --save-dev
    */
    notify = require('gulp-notify'),
    // 提示我们编译代码出现了错误 npm install gulp-notify --save-dev
    plumber = require('gulp-plumber'),
    /* 当编译less时提示语法错误或者其他异常，并不终止watch事件
    npm install gulp-plumber --save-dev
    */
    /*编译less文件集合结束*/
    concat = require('gulp-concat'),
    //合并当前文件夹下所有javascript文件成一个js文件，减少网络请求。
    //npm install gulp-concat --save-dev
    sass = require('gulp-sass'),
    //编译sass/scss 为 css 文件 npm install gulp-sass --save-dev
    autoprefixer = require('gulp-autoprefixer'),
    //自动为css加兼容性前缀
    //npm install gulp-autoprefixer --save-dev
    browserSync = require("browser-sync"),
    //修改代码后浏览器实时刷新，应用PC，手机，平板
    del = require('del'),
    //删除文件，文件夹
    jshint = require("gulp-jshint");
    //检查js错误 npm install --save-dev map-stream
gulp.task("browser-sync",["sass","script","html","css","index","imageMin"],function(){
//将任务放入自动刷新页面插件里
  browserSync({
    server:{
      baseDir: './'
    }
  });
});

gulp.task('script',function(){
  gulp.src('src/js/**/*.js')
    .pipe(jshint()) //检查JS错误
    .pipe(jshint.reporter()) //输出检查结果
    .pipe(uglify({
    ////压缩js文件
      mangle: true,//类型：Boolean 默认：true 是否修改变量名
      //mangle: {except: ['require' ,'exports' ,'module' ,'$']}//排除混淆关键字
      compress: true,//类型：Boolean 默认：true 是否完全压缩
      //preserveComments: 'all' //保留所有注释
    }))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({stream:true}));
    //执行无需F5自动刷新页面
});

gulp.task('css',function(){
  gulp.src('src/css/**/*.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions','> 5%','ie 6-8','iOS 7','Android >= 4.0'],
      //按照上面这些兼容性，添加属性前缀
      cascade: true, //是否美化属性值 默认：true 像这样：
      //-webkit-transform: rotate(45deg);
      //        transform: rotate(45deg);
      remove:true //是否去掉不必要的前缀 默认：true
    }))
    .pipe(cssver()) //并给css里的引用文件加版本号
    .pipe(cssmin({ //压缩css文件
      advanced: true,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
      compatibility: 'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
      keepBreaks: false,//类型：Boolean 默认：false [是否保留换行]
      keepSpecialComments: '*'
      //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({stream:true}));
    //执行无需F5自动刷新页面
});

gulp.task('html', function () {
  //改变src文件夹下html
  /*压缩 html文件的参数*/
  var options = {
    removeComments: true,//清除HTML注释
    collapseWhitespace: true,//压缩HTML
    collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
    minifyJS: true,//压缩页面JS
    minifyCSS: true//压缩页面CSS
  };
  /*压缩 html文件的参数结束*/
  gulp.src('src/**/*.html')
    .pipe(rev()) //加版本号，清除缓存
    .pipe(htmlmin(options)) //压缩 html文件
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({stream:true}));
    //执行无需F5自动刷新页面
});

gulp.task('index', function () {
//改变首页html
  /*压缩 html文件的参数*/
  var options = {
    removeComments: true,//清除HTML注释
    collapseWhitespace: true,//压缩HTML
    collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
    minifyJS: true,//压缩页面JS
    minifyCSS: true//压缩页面CSS
  };
  /*压缩 html文件的参数结束*/
  gulp.src('*.html')
    .pipe(rev()) //加版本号，清除缓存
    .pipe(htmlmin(options)) //压缩 html文件
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({stream:true}));
    //执行无需F5自动刷新页面
});

gulp.task('imageMin', function () {
//优化图片
  gulp.src('src/img/**/*.{png,jpg,gif,ico}')
    .pipe(cache(imagemin({
    // cache( 减少压缩图片的内存消耗
      progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
      //optimizationLevel: 5, //类型：Number  默认：3 取值范围：0-7（优化等级）
      //interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
      //multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
      svgoPlugins: [{removeViewBox: false}], //不要移除svg的viewbox属性
      use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
    })))
    .pipe(gulp.dest('dist/img'))
    .pipe(browserSync.reload({stream:true}));
    //执行无需F5自动刷新页面
});

gulp.task('less', function () {
//编译less转为css
  gulp.src('src/less/**/*.less')
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    //当编译less时出现语法错误或者其他异常,出现异常并不终止watch事件（gulp-plumber），并提示我们出现了错误（gulp-notify）。
    .pipe(sourcemaps.init()) //为了找到生成css后对应的less文件
    .pipe(less()) //编译less文件
    .pipe(sourcemaps.write()) //为了找到生成css后对应的less文件
    .pipe(gulp.dest('src/css'));
    /*编译好的less放进去后，会放入进行监听css文件那里，
      css任务那里会自动压缩css，给链接加版本号
    */
});

gulp.task('concatJs',function(){
//合并js文件
  gulp.src('src/concat_js/**/*.js')
    .pipe(concat('all.js'))//将所有src/concat_js/**/*.js里的js,合并成一个文件 all.js
    .pipe(gulp.dest('dist/concat_js'));
});

gulp.task('sass', function () {
//编译sass/scss文件转换为css
  return gulp.src('src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/css'));
    /*编译好的sass放进去后，会放入进行监听css文件那里，
      css任务那里会自动压缩css，给链接加版本号
    */
});

gulp.task('clean', function() {
//删除src里没有的，dist里的文件
  return del(['dist/css/*','dist/js/*','dist/img/*','dist/web/*','dist/*.html']);
  //删除dist里面所有的文件
});

gulp.task('serve',function(){
  gulp.watch('src/js/**/*.js',['script']);
  gulp.watch('src/css/**/*.css',['css']);
  gulp.watch('src/less/**/*.less', ['less']);
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch('src/img/**/*.{png,jpg,gif,ico}',['imageMin']);
  gulp.watch('src/concat_js/**/*.js',['concatJs']);
  gulp.watch('src/**/*.html',['html']);
  gulp.watch('*.html',['index']);
});
gulp.task("default",["clean","browser-sync","serve"]);
/*每次执行default任务后
先执行clean，清除dist目录里所有的文件
再执行browser-sync，打开文件监听，无需F5自动刷新页面
再执行serve，开启所有文件监听
*/

/*执行 gulp default 启动整个项目
系统会报个错，没关系，打开 http://localhost:3000/ 就行了
*/
