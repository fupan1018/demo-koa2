//包装函数
module.exports=function(grunt){

	// 任务配置，所有插件的配置信息
	grunt.initConfig({

		//获取package.json的信息
		pkg: grunt.file.readJSON('package.json'),
		//uglify插件的信息配置(文件的压缩)
		//options中规定允许生成的压缩文件带banner，即在生成的压缩文件第一行加句说明，其内容就是package.json的信息
		//options 代表配置默认信息
		//build中配置了源文件和目标文件。加压缩谁，压缩后生成谁。
		//build 代表新建任务
		uglify:{
			options:{
				tripBanners:true,
				banner:'/*! <%= pkg.name %>-<%=pkg.version %>.js <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build:{
				src:'src/demo.js',
				dest:'build/<%=pkg.name%>-<%=pkg.version%>.js.min.js'
			}
		},
		//js语法的检查
		//匹配src中的所有js文件，rule.jshintrc是检测的规则
		jshint:{
			build:['Gruntfile.js','src/*.js','dest/*js'],
			options:{
				'-W033':true    //忽略缺分号报错
			}
		},
		//watch将监控src文件夹下所有js文件，一旦变化，则立即执行jshint和uglify两个插件功能
		watch:{
			build:{
				files:['src/*.js'],
				tasks:['jshint','uglify'],
				options:{'spawn':false}
			}
		},
		//合并文件, separator以逗号分开
		concat:{
			options:{
				separator:';'
			},
			build:{
				src:['src/demo.js','src/test.js'],
				dest:'dest/libs.js'
			}
		}

	});

	//告诉grunt我们将使用插件（插件加载）
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	//告诉grunt当我们在终端中输入grunt是需要做些什么(注意先后顺序)
	//注册任务
	grunt.registerTask('default', ['concat','jshint','uglify','watch']);

	
};

