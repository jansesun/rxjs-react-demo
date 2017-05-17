var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var express = require('express');
var startServer = function() {
  var app = new express();
  var port = 3000;
  var config = require('./webpack.config.js');
  var compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));
  app.use('/static', express.static('./release'));
  app.listen(port, function(error) {
    if(error) {
      console.error(error);
    } else {
      console.info('==> 🌐 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
    }
  });
};
startServer();
