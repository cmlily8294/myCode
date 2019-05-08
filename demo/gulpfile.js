//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    uglify= require('gulp-uglify');

//定义一个jsmin任务（自定义任务名称）
gulp.task('jsmin', function () {
    gulp.src('js/*.js') //该任务针对的文件
        .pipe(uglify({
        	mangle: true,//类型：Boolean 默认：true 是否修改变量名
            compress: true//类型：Boolean 默认：true 是否完全压缩
        })) //该任务调用的模块
        .pipe(gulp.dest('dist/js')); //将会生成到dist/js下
});

gulp.task('default',['jsmin']); //定义默认任务

//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
//gulp.dest(path[, options]) 处理完后文件生成路径