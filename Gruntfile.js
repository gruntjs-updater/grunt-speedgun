/*
 * grunt-speedgun
 * https://github.com/lggarrison/grunt-speedgun
 *
 * Copyright (c) 2015 Lacy Garrison
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        speedgun: {
            default_options: {
                options: {
                    url: 'http://localhost',
                    port: 4000,
                    limit: 5
                }
            },
            custom_options: {
                options: {
                    url: 'http://localhost',
                    port: 4001,
                    limit: 5
                }
            },
            custom_options2: {
                options: {
                    url: 'http://bloomberg.com'
                }
            }
        },

    });

    grunt.loadTasks('tasks');

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('test', ['speedgun']);

    grunt.registerTask('default ', ['jshint', 'test']);

};
