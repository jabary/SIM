const digest = require('digest-header');
const http = require('http');

let getWWWHeader = function (connection, cb) {
    http.get({
        host: connection.host,
        port: connection.port,
        path: connection.path
    }, function (res) {
        //console.log("res www", res);
        console.log("res www", res.headers['www-authenticate']);
        
        cb(res.headers['www-authenticate']);

    });
}

let getAuthToken = function (connection, un, ps, cb) {
    getWWWHeader(connection, function (header) {
        let userpass = `${un}:${ps}`;
        let auth = digest(connection.method, connection.path, header, userpass);
        cb(auth);
    })
}



module.exports = {
    getAuthToken: (conn, un, ps, cb) => { getAuthToken(conn, un, ps, cb) }
}