'use strict';

let util = require('util');
let apiwrap = require('./apibase').apiwrap;



let hello = {};
hello.hello = apiwrap((req, res, gitlab) => {
  return new Promise((resolve, reject) => {
      resolve(req.swagger.params.name.value || 'stranger')
    }
  ).then((val) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(val));
    res.end();
  });
});

module.exports = {
  hello: hello
};