module.exports = function (grunt) {
  "use strict";
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    htmlhint: {
      build: {
        options: {
          'tag-pair': true,
          'tagname-lowercase': true,
          'attr-lowercase': true,
          'attr-value-double-quotes': true,
          'doctype-first': true,
          'id-unique': true,
          'style-disabled': true
        },
        src: ['*.html']
      }
    },

    less: {
      main: {
        files: {
          "css/main.min.css": "less/main.less"
        },
        options: {
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: 'main.css.map',
          sourceMapFilename: 'css/main.css.map'
        }
      }
    },

    bower_concat: {
      all: {
        dest: 'js/dist/bower.js'
      }
    },

    uglify: {
       bower: {
        options: {
          mangle: true,
          compress: true
        },
        files: {
          'js/dist/bower.min.js': 'js/dist/bower.js'
        }
      }
    },

    watch: {
      html: {
        files: [
          '*.html'
        ],
        tasks: ['htmlhint']
      },
      less: {
        files: [
          'less/*.less'
        ],
        tasks: ['less']
      }
    }
    
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('buildbower', [
    'bower_concat',
    'uglify:bower'
  ]);
  
  grunt.registerTask('dev', function() {
    grunt.task.run([
      'htmlhint',
      'less',
      'watch']);
  });
};
