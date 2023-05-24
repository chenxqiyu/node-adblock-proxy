
(function(global) {

	/*
	 * CACHE AND STRUCTS
	 */

	var _cache = {};



	/*
	 * HELPERS
	 */

	var _http = require('http');
	var _url  = require('url');
	var net = require('net');


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

				var server = new _http.createServer();

				server.on('connect', function(request, response,head) {



					var options =_url.parse(`https://${request.url}`);

					var data = {
						protocol: (options.protocol || 'http').split(':')[0],
						host:     options.host.split(':')[0],
						port:     options.port,
						path:     options.path,
						href:     options.href
					};
//console.log(data);

		
					var isblocked = callback.call(scope, data);
					//	console.log(`http://${request.url}---${isblocked}`);
	
					if (isblocked === true) {
						console.log(`${request.url}---拦截`);
// nimp.org
						var header = {
							'Content-Length': 31
						};

//response.write(head);
					//	response.writeHead(410, header);
			//			response.write();
					//	response.end('Blocked by NodeJS AdBlock Proxy');
//  response.write('Hello');
  response.end();
					} else {

 // console.log(`TCP request: ${request.method} ${request.url}`);
  // 解析请求 URL
  const { hostname, port } = _url.parse(`http://${request.url}`);
  // 创建一个向目标服务器的 TCP 连接
  const srvSocket = net.connect(port || 80, hostname, () => {
   // console.log(`TCP connection established: ${hostname}:${port || 80}`);
    response.write('HTTP/1.1 200 Connection Established\r\n' +
                    'Proxy-agent: Node.js-Proxy\r\n' +
                    '\r\n');
    srvSocket.write(head);
    srvSocket.pipe(response);
    response.pipe(srvSocket);
  });

						// request.pause();


						// var connector = _http.request(options, function(targetresponse) {

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
 // console.error('Uncaught exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  //console.error('Unhandled rejection at:', promise, 'reason:', reason);
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

