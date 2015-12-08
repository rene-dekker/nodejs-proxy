# nodejs-proxy
Use this to forward traffic (http only).

Make sure to change the password.

Took inspiration from https://github.com/TellusTalk/Node_Proxy
Actually, thatone is probably better, because it deals with https too.


Install pm2
$ sudo npm install pm2@latest -g
$ pm2 start proxy.js
$ pm2 startup debian

Test it:
curl --header 'passphrase:<your-password>' --header 'target_url:http://www.wikipedia.org' <ip-of-your-server:port>


