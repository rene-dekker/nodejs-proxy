var http = require('http');
var passphrase = 'pass';

http.createServer(onRequest).listen(3000);

function onRequest(client_req, client_res) {
  console.log('serve: ' + client_req.url);
  var request_passphrase = client_req.headers.passphrase;
  app_log('\n\nrequest_passphrase: ' + request_passphrase);

  if (request_passphrase !== passphrase) {
    client_res.writeHead(400, {'Content-Type': 'text/plain'});
    client_res.write('Bad Request');
    client_res.end();
    return;
  }

  target_url = client_req.headers.target_url;

  target_url_obj = require('url').parse(target_url);
  var hostname = target_url_obj.hostname;
  var path = (target_url_obj.path || '/').replace(hostname, "");

  app_log('target_url: ' + target_url);
  app_log('client_req.url: ' + client_req.url);
  app_log('hostname: ' + hostname);
  app_log('path: ' + path);
  app_log('client_req.method: ' + client_req.method);
  app_log('client_req.headers: ' + client_req.headers);
  for (var h in client_req.headers) {
    app_log('header: ' + h);
  }


  var options = {
    hostname: hostname,
    port: 80,
    path: path,//client_req.url,
    method: 'GET',//client_req.method,
    headers: client_req.headers
  };
  delete options.headers.target_url;
  delete options.headers.passphrase;
  delete options.headers.host;


  var proxy = http.request(options, function (res) {
    res.pipe(client_res, {
      end: true
    });
  });

  client_req.pipe(proxy, {
    end: true
  });

}

function app_log(text_in) {
    'use strict';
    var fs = require('fs');
    console.log('[' + (new Date()).toISOString() + ']');
    console.log(text_in);
    fs.appendFile('log.txt', '\n[' + (new Date()).toISOString() + ']\t' + text_in, function (err) {
    });
}
