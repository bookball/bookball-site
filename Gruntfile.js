module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		sass: {
			dist: {
				options: {
					style: 'expanded'
				},
				files: [{
					expand: true,
					cwd: 'sass',
					src: ['*.scss'],
					dest: 'sass/build',
					ext: '.css'
				}]
			}
		},

		autoprefixer: {
			options: {
				browsers: ['last 2 version', 'ie 9']
			},
			multiple_files: {
				expand: true,
				flatten: true,
				src: 'sass/build/*.css',
				dest: 'sass/build/prefixed/'
			}
		},

		concat: {
			dist: {
				src: [
					'sass/build/prefixed/*.css'
				],
				dest: 'css/style.css'
			}
		},
		
		cssmin: {
			combine: {
				files: {
					'css/style.min.css': ['css/style.css']
				}
			}
		},
		
		copy: {
			main: {
				files: [{
					expand: true,
					cwd: 'css',
					src: ['*.css'],
					dest: '_site/css'
				}]
			}
		},
		
		jekyll: {
			dist: {
				options: {
					config: '_config.yml'
				}
			}
		},
		
		bowercopy: {
			options: {
				srcPrefix: 'bower_components',
				runBower: true
			},
			mixins: {
				options: {
					destPrefix: 'sass'
				},
				files: {
					'lib/_normalize.scss': 'normalize-css/normalize.css',
					'lib/bourbon': 'bourbon/app/assets/stylesheets/*',
					'lib/neat': 'neat/app/assets/stylesheets/*',
				}
			}
		},
		
    svgmin: {
      options: {
        plugins: [
          { removeViewBox: false },
          { removeUselessStrokeAndFill: true }
        ]
      },
      dist: {
        expand: true,
        cwd: 'assets/svg',
        src: ['*.svg'],
        dest: 'assets/svg_optimized'
      }
    },
		
    grunticon: {
        myIcons: {
            files: [{
                expand: true,
                cwd: 'assets/svg_optimized',
                src: ['*.svg', '*.png'],
                dest: "assets/icons"
            }],
            options: {
              enhanceSVG: true
            }
        }
    },

		watch: {
			options: {
				livereload: true
			},
			css: {
				files: ['sass/**/*.scss',
				        'sass/**/*.css',
				        '!sass/build'],
				tasks: ['css'],
				options: {
					spawn: false
				}
			},
			html: {
				files: ['**/*.html',
								'**/*.md',
								'**/*.markdown',
								'**/*.yml',
								'*.html',
								'*.md',
								'*.markdown',
								'*.yml',
								'_config.yml' ],
				tasks: ['jekyll'],
				options: {
					spawn: false
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-jekyll');
	grunt.loadNpmTasks('grunt-bowercopy');
	grunt.loadNpmTasks('grunt-svgmin');
	grunt.loadNpmTasks('grunt-grunticon');

	grunt.registerTask('default', ['bowercopy', 'sass', 'autoprefixer', 'concat', 'cssmin', 'jekyll', 'watch']);
	grunt.registerTask('css', ['sass', 'autoprefixer', 'concat', 'cssmin', 'copy']);
	grunt.registerTask('icons', ['svgmin', 'grunticon']);

};
