const util = require('./util.js');
let objCount = 0;
let msgs = [
  // {
  //   text: 'Welcome to chatterbox!',
  //   username: 'ChatterboxBot',
  //   objectId: ++objCount
  // }
];
const resSend = util.resSend;
const actionMap = {
  GET (req, res) {
    resSend(res, {results: msgs});
  }, 
  POST (req, res) {
    util.datGet(req, msg => {
      msg.objectId = ++objCount;
      msgs.push(msg);
      resSend(res, {objectId: msg.objectId}, 201);
    });
  },
  OPTIONS (req, res) {
    resSend(res, null);
  }
};
module.exports = {
  requestHandler: util.makeHandler(actionMap),
  serveAsset(req, res) {
    util.read('./client', 'index.html', (err, data) => {
      err ? 
        console.log(err) 
        : util.resSendHtml(res, data);
    });
  }
};



/*************************************************************
You should implement your request handler function in this file.
requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.
You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.
*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.
**************************************************************/

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.


// Request and Response come from node's http module.
//
// They include information about both the incoming request, such as
// headers and URL, and about the outgoing response, such as its status
// and content.
//
// Documentation for both request and response can be found in the HTTP section at
// http://nodejs.org/documentation/api/
// See the note below about CORS headers.

// Tell the client we are sending them plain text.
//
// You will need to change this if you are sending something
// other than plain text, like JSON or HTML.

// .writeHead() writes to the request line and headers of the response,
// which includes the status and all headers.
// Make sure to always call response.end() - Node may not send
// anything back to the client until you do. The string you pass to
// response.end() will be the body of the response - i.e. what shows
// up in the browser.
//
// Calling .end "flushes" the response's internal buffer, forcing
// node to actually send all the data over to the client.
//response.end(json);



