const fs = require('fs');
const textHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json'
};
const htmlHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};
module.exports = {
  resSend(res, data, statCode = 200) {
    res.writeHead(statCode, textHeaders);
    res.end(JSON.stringify(data));
  },
  resSendHtml(res, data, statCode = 200) {
    res.writeHead(statCode, htmlHeaders); 
    res.end(data);
  },
  datGet(req, cb) {
    let data = '';
    req.on('d`ata', chunk => {
      data += chunk;
    });
    req.on('end', () => {
      cb(JSON.parse(data));
    });
  },
  makeHandler(actionMap) {
    return (req, res) => {
      let act = actionMap[req.method];
      act ? 
				act(req, res)
				: this.sendRes(res, 'Error: ', 404);
    };
  }, 
  read(folder, asset, cb) {
    fs.readFile(`${folder}/${asset}`, {encoding: 'utf8'}, cb);
  }
};

