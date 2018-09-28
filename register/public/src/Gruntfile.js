"use strict";

module.exports = function( grunt ) {

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    // configuracoes das tarefas

    watch: {
      css: {
        files: '../backend/sass/**/*' ,
        tasks: [ 'compass' ]
      },
      js: {
        files: '../backend/js/**/*',
        tasks: [ 'uglify' ]
      }
    },
    // Compile scss
    compass: {
      dist: {
        options: {
          /*force: true,
          config: '../backend/config.rb',
          outputStyle: 'compressed'*/
          httpPath: 'fakepath/../../', /* SEMPRE ALTERAR */
          sassDir: '../backend/sass',
          cssDir: '../backend/css',
          imagesDir: '../backend/img',
          boring: false,
          outputStyle: 'compressed',
        }
      }
    },

    // Concat and minify javascripts
    uglify: {
      options: {
        mangle: false
      },
      dist: {
        files: {
          '../backend/min/jquery.suiting.min.js': [
            '../backend/js/jquery.suiting.js'
          ],
          '../backend/min/jquery.mobile.min.js': [
            '../backend/js/jquery.mobile.js'
          ],
          '../backend/min/jquery.main.min.js': [
            '../backend/js/jquery.main.js'
          ]
        }
      }
    },

  });

  // registrando tarefas
  grunt.registerTask( 'default', [ 'watch' ] );

};