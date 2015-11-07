module.exports = function KarmaConfig(config) {
  var configuration = {
    browsers: ['PhantomJS'],
    files: [
      'node_modules/jquery/dist/jquery.js',
      'src/**/*.js'
    ],
    frameworks: ['jasmine']
  };

  config.set(configuration);
};