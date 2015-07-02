/*
 * grunt-speedgun
 * https://github.com/lggarrison/grunt-speedgun
 *
 * Copyright (c) 2015 Lacy Garrison
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    grunt.registerMultiTask('speedgun', 'Automate running Speedgun with Grunt', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            url: 'http\://localhost',
            port: '4001'
        });

        grunt.loadNpmTasks('grunt-shell');

        var speedgunCommand = 'phantomjs --config=node_modules/speedgun/core/pconfig.json node_modules/speedgun/core/speedgun.js ' + options.url;
        if (options.port !== '') {
            speedgunCommand += '\:' + options.port;
        }
        speedgunCommand += ' -o csv --screenshot';

        speedgunCommand = speedgunCommand.replace(/:/g, "{colon}");

        grunt.task.run(['shell:speedgun:' + speedgunCommand]);

    });

    grunt.registerTask("default", ["speedgun"]);

};
