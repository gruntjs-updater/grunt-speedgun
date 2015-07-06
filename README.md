# grunt-speedgun

> Automate running Speedgun with Grunt

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-speedgun --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-speedgun');
```

## The "speedgun" task

### Overview
In your project's Gruntfile, add a section named `speedgun` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  speedgun: {
    options: {
      // Task-specific options go here.
    }
  },
});
```

### Options

#### options.url
Type: `String`
Default value: `'http://localhost'`

Required. The URL of the server to benchmark with speedgun.

#### options.port
Type: `Integer`
Default value: `null`

Optional. The port required to reach the server.

#### options.limit
Type: `Integer`
Default value: `10`

Optional. The Limit of the number of rows of the report to display to console.

### Usage Examples
```js
grunt.initConfig({
  speedgun: {
    options: {
        url: 'http://localhost',
        port: '4000',
        limit: 5
    }
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
