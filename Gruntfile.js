module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: ['Gruntfile.js', 'src/js/<%= pkg.name %>.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          console: true,
          module: true,
          document: true
        }
      }
    },

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
        
    sass: {
      options: {
          sourcemap: 'none'
      },
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'dist/<%= pkg.name %>.css': 'src/scss/<%= pkg.name %>.scss'
        }
      },
      dist_min: {
        options: {
          style: 'compressed'
        },
        files: {
          'dist/<%= pkg.name %>.min.css': 'src/scss/<%= pkg.name %>.scss'
        }
      }
    },

    watch: {
      options: {
        livereload: true,
      },
      demo: {
        files: ['src/**/*'],
        tasks: ['demo'],
        options: {
            spawn: false,
         },
      }
    },

    copy: {
      dist: {
        expand: true,
        src: 'dist/*',
        dest: 'demo/'
      }
    },

    'gh-pages': {
      options: {
        base: 'demo'
      },
      src: '**/*'
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.registerTask('build', ['jshint', 'concat', 'uglify', 'sass']);

  grunt.registerTask('demo', ['build', 'copy']);

  grunt.registerTask('default', ['demo']);

  grunt.registerTask('publish', ['demo', 'gh-pages']);

};