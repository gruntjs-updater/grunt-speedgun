/*
 * grunt-speedgun
 * https://github.com/lggarrison/grunt-speedgun
 *
 * Copyright (c) 2015 Lacy Garrison
 * Licensed under the MIT license.
 */

'use strict';

var fs = require("fs");
var csv = require('csv');
var Table = require('cli-table');
var f = require('util').format;
var spawn = require('child_process').spawn;

module.exports = function(grunt) {

    var options = null;

    grunt.registerMultiTask('speedgun', 'Automate running Speedgun with Grunt', function() {

        var done = this.async();

        // Merge task-specific and/or target-specific options with these defaults.
        options = this.options({
            url: 'http://localhost',
            port: null,
            limit: 10
        });

        var server = options.url;
        if (options.port !== null) {
            server += '\:' + options.port;
        }

        //kick off process
        var child = spawn('phantomjs', [
            '--config=node_modules/speedgun/core/pconfig.json',
            'node_modules/speedgun/core/speedgun.js',
            server,
            '-o',
            'csv',
            '--screenshot'
        ]);

        //spit stdout to screen
        child.stdout.on('data', function(data) {
            process.stdout.write(data.toString());
        });

        //spit stderr to screen
        child.stderr.on('data', function(data) {
            process.stdout.write(data.toString());
            done();
        });

        child.on('close', function(code) {
            console.log("Finished with code " + code);
            grunt.task.run(['speedgun-report']);
            done();
        });

    });

    grunt.registerTask('speedgun-report', function() {

        var done = this.async();

        var speedGunReport = options.url;
        if (options.port !== null) {
            speedGunReport += '\:' + options.port;
        }

        speedGunReport = speedGunReport.replace(/(\:\/\/|\:)/g, "_");
        speedGunReport = "reports/" + speedGunReport + "/speedgun-csv.csv";

        function displaySpeedGunReport() {

            var table = new Table({
                head: ['Date', 'pageLoadTime', 'perceivedLoadTime', 'requestResponseTime', 'pageProcessTime', 'domLoading', 'domComplete'],
                colWidths: [41, 23, 23, 23, 23, 23, 23]
            });

            var input = fs.createReadStream(speedGunReport);
            var parser = csv.parse({
                columns: true
            });
            var output = [];
            var record = null;

            parser.on('error', function(err) {
                console.log(err.message);
                done();
            });

            parser.on('readable', function() {
                while (record = parser.read()) {
                    output.push(record);
                }
            });

            parser.on('finish', function() {

                var d = new Date();
                for (var i = (output.length > options.limit) ? output.length - options.limit : 0; i < output.length; i++) {
                    record = output[i];
                    d.setTime(record.nowms);
                    table.push([
                        d.toString(),
                        record.pageLoadTime,
                        record.perceivedLoadTime,
                        record.requestResponseTime,
                        record.pageProcessTime,
                        record.domLoading,
                        record.domComplete
                    ]);
                }

                console.log("");
                console.log("");
                console.log("");
                console.log("Page Loading Speeds: SpeedGun");
                console.log(table.toString());
                console.log("");
                console.log("");
                console.log("");
                done();

            });

            input.pipe(parser);

        }

        if (grunt.file.isFile(speedGunReport)) {
            displaySpeedGunReport();
        } else {
            grunt.log.writeln(speedGunReport + "doesn't exist.");
            done();
        }

    });

    grunt.registerTask("default", ["speedgun"]);

};
