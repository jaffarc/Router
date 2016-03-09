module.exports = function(config) {
  config.set({
    basePath: './',
    frameworks: ['jasmine'],
    files: [
        'build/*.js',
        'test/*.js'
    ],
    browsers: ['PhantomJS'],
    singleRun: true,
    reporters: ['progress', 'coverage'],
    preprocessors: { 'js/*.js': ['coverage'] },
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    }
  });
};

