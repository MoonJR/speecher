'use strict';

var request = require('request');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var reloadPort = 35729, files;


  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    deploy: {
      server: {
        file: 'bin/www'
      },
      options: {
        environment: 'production'
      },
    },
    develop: {
      server: {
        file: 'bin/www'
      }
    }, // Test settings
    karma: {
        unit: {
          configFile: 'test/karma.conf.js',
          singleRun: true
        }
    },
    plato: {
      task: {
        files: {
          'reports/report-plato': ['public/**/*.js']
        }
      }
    },
    watch: {
      options: {
        nospawn: true,
        livereload: reloadPort
      },
      server: {
        files: [
          'bin/www',
          'app.js',
          'routes/*.js'
        ],
        tasks: ['develop', 'delayed-livereload']
      },
      js: {
        files: ['public/js/*.js'],
        options: {
          livereload: reloadPort
        }
      },
      angular: {
        files: ['public/angularjs/*.js'],
        options: {
          livereload: reloadPort
        }
      },


      css: {
        files: [
          'public/css/*.css'
        ],
        options: {
          livereload: reloadPort
        }
      },
      views: {
        files: ['views/*.jade'],
        options: {
          livereload: reloadPort
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-jenkins-checkstyle-reporter'),
        reporterOutput: 'reports/report-jshint-checkstyle.xml'
      },
      all: {
        src: [
          'Gruntfile.js',
          'public/**/*.js',
          'test/**/*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/**/*.js']
      }
    },
    sloccount: {
      options: {
        reportPath: 'reports/sloc.sc'
      },
      src: ['public/**/*.js', 'test/**/*.js', 'views/**/*.html',]
    }
  });

  grunt.config.requires('watch.server.files');
  files = grunt.config('watch.server.files');
  files = grunt.file.expand(files);

  grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
    var done = this.async();
    setTimeout(function () {
      request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','), function (err, res) {
        var reloaded = !err && res.statusCode === 200;
        if (reloaded) {
          grunt.log.ok('Delayed live reload successful.');
        } else {
          grunt.log.error('Unable to make a delayed live reload.');
        }
        done(reloaded);
      });
    }, 500);
  });

  grunt.registerTask('default', [
    'develop',
    'watch'
  ]);

  grunt.registerTask('test', [
    'karma',
    'plato',
    'sloccount',
    'jshint:all'
  ]);
};
