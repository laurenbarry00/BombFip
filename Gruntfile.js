module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

  grunt.initConfig({
    sass: {
      dist: {
          src: 'src/styles/bombflip.scss',
          dest: 'dist/css/bombflip.css'
      }
    },
    sync: {
      scripts: {
        files: [
          { 
            cwd: 'src',
            src: [
                  '**/*.html',
                  'scripts/**/*.js',
                  'img/**/*',
                  '!node_modules/**/*'
                 ], 
            dest: 'dist' 
          }
        ]
      }
    },
    watch: {
      html: {
        files: ['src/**/*.html','src/!node_modules/**/*'],
        tasks: ['sync']
      },
      img: {
        files: ['src/img/**/*'],
        tasks: ['sync']
      },
      scss: {
        files: 'src/styles/**/*',
        tasks: ['sass']
      },
      dev: {
        files: ['src/js/**/*.js'],
        tasks: ['sync']
      },
      grunt: {
        files: 'Gruntfile.js',
        tasks: ['build']
      }
    },
    connect: {
      server: {
        options: {
          port: 9000,
          base: 'dist',
          middleware: function(connect, options, middlewares) {
            middlewares.unshift(function(req, res, next) {
              res.setHeader('Access-Control-Allow-Origin', '*');
              next();
            });
            return middlewares;
          }
        }
      }
    }
  });
              
  // > grunt build  - compiles project
  grunt.registerTask('build', ['sass', 'sync']);    
  // > grunt start  - compiles project, runs localhost server, re-builds project when files change
  grunt.registerTask('start', ['build', 'connect', 'watch']);
  // > grunt        - compiles project (defining default task)
  grunt.registerTask('default', ['build']);
}