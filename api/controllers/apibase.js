/**
 * Created by lifengshuang on 20/12/2016.
 */
'use strict';

let commons = require('./commons');
let gitlab = require('gitlab');
let apibase = {};

let parseCookies = (cookie) => {
  var list = {},
    rc = cookie;

  rc && rc.split(';').forEach(function( cookie ) {
    var parts = cookie.split('=');
    list[parts.shift().trim()] = decodeURI(parts.join('='));
  });

  return list;
};

apibase.apiwrap = (func) => {
  return (req, res) => {
    let cookies = parseCookies(req.swagger.params.Cookie.value);
    console.log("cookie: " + cookies.token);
    let userGitlab = gitlab({
      url: commons.server.url,
      token: cookies.token
    });
    return func(req, res, userGitlab);
  }
};

module.exports = apibase;