const config = require('./config/settings');
const http = require('http');
const auth = require('./auth');
var parseString = require('xml2js').parseString;
const querystring = require('querystring');


let connection = {
    host: config.marklogic.sourceDb.hostname,
    port: 8000,
    method: 'post',
    path: '',
    headers: {
        
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

let getUsers = function(xquery, database, vars, cb){
    let path = '/LATEST/eval';
    let conn = connection;
    conn.method = 'post';
    conn.path = path;
    const data = querystring.stringify(
        {
             'xquery': xquery,
             'database': database,
             'vars': vars
         });
    conn.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    conn.headers['Content-Length'] = Buffer.byteLength(data);
    

    auth.getAuthToken(conn, config.marklogic.sourceDb.username, config.marklogic.sourceDb.password, function(token){
        conn.headers['Authorization'] = token;
        const req = http.request(conn, function(response){
            console.log('-------------------- conn', conn);
            console.log('Status: ' + response.statusCode);
            console.log('Headers:' + JSON.stringify(response.headers))
            response.setEncoding('utf8');
            let result = "";
            response.on('data', (chunck) => {
                result += chunck;
                console.log('Body: ' + chunck)
            });
            response.on('end', () =>{
                console.log("No more data in response");
                cb(result);
            });
           
            
        });

        req.on('error', (e)=>{
            console.log("Error with request: " + e.message);
        });

        
        
        req.write(data);
        req.end();
    } );


}
/*
let getUserAccount = function(uid, cb){
    let uri = '/v1/documents?uri=/user-account/' + uid + '.xml&database='+ config.marklogic.desctinationDb.dbName
    let conn = connection;
    conn.method = 'get';
    conn.path = uri;
    auth.getAuthToken(conn, config.marklogic.desctinationDb.username, config.marklogic.desctinationDb.password, function(token){
        conn.headers['Authorization'] = token;
        http.get(conn, function(response){
            console.log("--------------------- conn", conn);
            let result = ""
            response.on('data', function(chunk){
                result += chunk;
            });
            response.on('end', function(){
                console.log(typeof(result));
                parseString(result, function (err, parsedResult) {
                    return cb(parsedResult['userAccount']? true: false);
                });
            })
        })
        
    });
   
};

*/

module.exports = {
    getUsers: (xquery, database, vars, cb) => {getUsers(xquery, database, vars, cb)}
}