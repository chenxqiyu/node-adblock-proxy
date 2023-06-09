
(function(global) {

	/*
	 * CACHE AND STRUCTS
	 */

	var _cache = {};



	/*
	 * HELPERS
	 */

	var _fs    = require('fs');
	var _https = require('https');
	var _url   = require('url');

	var _CERT  = _fs.readFileSync(__dirname + '/../../cert.pem');
	var _KEY   = _fs.readFileSync(__dirname + '/../../key.pem');


	/*
	 * LIBRARY INTEGRATION
	 */

	module.exports = {

		create: function(host, port, callback, scope) {

			if (_cache[host + ':' + port] !== undefined) return false;


			host     = typeof host === 'string'       ? host       : null;
			port     = typeof port === 'number'       ? (port | 0) : null;
			callback = typeof callback === 'function' ? callback   : function() { return false; };
			scope    = typeof scope !== 'undefined'   ? scope      : this;


			if (port !== null) {

				var server = new _https.createServer({
					cert: _CERT || null,
					key:  _KEY  || null
				});


				server.on('connect', function(request, response) {

				   var options =_url.parse(`http://${request.url}`);

					var data = {
						protocol: options.protocol.split(':')[0],
						host:     options.host.split(':')[0],
						port:     options.port,
						path:     options.path,
						href:     options.href
					};


					var isblocked = callback.call(scope, data);
					if (isblocked === true) {

						var header = {
							'Content-Length': 31
						};

						response.writeHead(410, header);
						response.write('Blocked by NodeJS AdBlock Proxy');
						response.end();

					} else {

 // console.log(`TCP request: ${request.method} ${request.url}`);
  // 解析请求 URL
  const { hostname, port } = _url.parse(`http://${request.url}`);
  // 创建一个向目标服务器的 TCP 连接
  const srvSocket = net.connect(port || 80, hostname, () => {
 //   console.log(`TCP connection established: ${hostname}:${port || 80}`);
    response.write('HTTP/1.1 200 Connection Established\r\n' +
                    'Proxy-agent: Node.js-Proxy\r\n' +
                    '\r\n');
    srvSocket.write(head);
    srvSocket.pipe(response);
    response.pipe(srvSocket);
  });


						// request.pause();


						// var connector = _https.request(options, function(targetresponse) {

							// targetresponse.pause();
							// response.writeHead(targetresponse.statusCode, targetresponse.headers);
							// targetresponse.pipe(response);
							// targetresponse.resume();

						// });


						// // TODO: Evaluate if a timeout of 500ms is fair enough
						// connector.on('socket', function(socket) {
							// socket.setTimeout(500);
						// });

						// connector.on('error', function(err) {

							// var header = {
								// 'Content-Length': 15
							// };

							// response.writeHead(504, header);
							// response.write('Gateway Timeout');
							// response.end();

						// });

						// connector.on('timeout', function() {

							// var header = {
								// 'Content-Length': 15
							// };

							// response.writeHead(504, header);
							// response.write('Gateway Timeout');
							// response.end();

						// });

						// request.pipe(connector);
						// request.resume();

					}


					// GC hints
					options   = null;
					data      = null;
					isblocked = null;
					connector = null;

				});


server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled rejection at:', promise, 'reason:', reason);
});


				server.on('error', function(err) {

					var code = err.code;
					if (code === 'EADDRNOTAVAIL') {

						console.error('Error: ' + host + ':' + port + ' is not assigned to this machine.');
						process.exit(253);

					} else if (code === 'EADDRINUSE') {

						console.error('Error: ' + host + ':' + port + ' is already in use by another application.');
						process.exit(253);

					} else if (code === 'EACCES') {

						console.error('Error: ' + host + ':' + port + ' is reserved for root. Please use a port higher than 1024.');
						process.exit(253);

					} else {

						console.error('Error: ' + err.toString());

					}

				});


				if (host !== null) {
					server.listen(port, host);
				} else {
					server.listen(port);
				}


				_cache[host + ':' + port] = server;


				return true;

			}


			return false;

		},

		destroy: function(host, port) {

			var server = _cache[host + ':' + port] || null;
			if (server !== null) {

				delete _cache[host + ':' + port];
				server.close();

				return true;

			}


			return false;

		}

	};

})(this);

