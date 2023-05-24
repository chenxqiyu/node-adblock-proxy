set PATH="D:\cygwin64\bin\";%PATH%
@rem Test HTTP proxy
@rem 
@rem node ./bin/proxy --host=0.0.0.0 --port=8080 --protocol=http;

@rem Test HTTPS proxy
@rem openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem;
@rem 
node ./bin/proxy --host=0.0.0.0 --port=8080 --protocol=https

pause