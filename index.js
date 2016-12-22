
const fs = require("fs");

/**
 * Responds to any HTTP request that can provide a "message" field in the body.
 *
 * @param {!Object} req Cloud Function request context.
 * @param {!Object} res Cloud Function response context.
 */
exports.helloWorld = function helloWorld(req, res) {
  // Example input: {"message": "Hello!"}
  //if (req.body.message === undefined) {
  // This is an error case, as "message" is required.
  // res.status(400).send('No message defined!');

  const version = "v0.3.7";
  var d = "<h3> google cloud functions / check function / " + version + " </h3>\n<hr>\n";
    
  if (req.body.message) {
    console.log(req.body.message);
    d += "<h2> Message </h2>\n";
    d += "Hello: " + req.body.message;
    d += "<hr>";
  }

	d += "<h2> Headers </h2>\n";
  d += "<table border=1>";
  Object.keys(req.headers).sort().forEach( function(k) {
    d+= "<tr> <td halign='right'>" + k + "</td> <td>" + req.headers[k] + "</td> </tr>\n";
  });
  d+="</table>\n";
  d += "<hr>";

  var rc = req.headers.cookie;
  d += "<h2> Cookies </h2>\n";
  d += "<table border=1>";
  rc && rc.split(';').forEach(function( cookie ) {
    var parts = cookie.split('=');
    //list[parts.shift().trim()] = decodeURI(parts.join('='));
    d+= "<tr> <td halign='right'>" + parts.shift().trim() + "</td> <td>" + decodeURI(parts) + "</td> </tr>\n";
  });
  d+="</table>\n";
  d += "<hr>";

  d += "<h2> Environment </h2>\n";
  d += "<table border=1>";
  Object.keys(process.env).sort().forEach( function(k) {
  	d+= "<tr> <td halign='right'>" + k + "</td> <td>" + process.env[k] + "</td> </tr>\n";
  });
  d+="</table>\n";
  d += "<hr>";

  d += "<h2> Process </h2>\n";
  d += "<table border=1>";
  ['arch','argv','config','execArgv','execPath','pid','platform','version'].forEach( function(k) {
    d+= "<tr> <td halign='right'>" + k + "</td> <td>" + process[k] + "</td> </tr>\n";
  } );
  d+="</table>\n";
  d += "<hr>";

  d += "<h2> Request </h2>\n";
  d += "<table border=1>";
  // body headers params query route 
  ['baseUrl','domain','httpVersion','method','originalUrl','url'].forEach( function(k) {
    d+= "<tr> <td halign='right'>" + k + "</td> <td>" + req[k] + "</td> </tr>\n";
  });
  d+="</table>\n";
  d += "<hr>";

  d += "<h2> Files </h2>\n";
  d += "<table border=1>";
  fs.readdirSync(".").forEach( function(f) {
  	d+= "<tr> <td halign='right'>" + f + "</td> </tr>\n";
  });
  d+="</table>\n";
  d += "<hr>";

  res.send(d);
};
