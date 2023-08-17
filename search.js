'use strict'

const http = require('http');
const fs = require('fs');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3000;


const server = http.createServer((req, res) => {
    if(req.url !== '/favicon.ico'){
        fs.readFile("./data.json", "utf8", (err, jsonString) => {
            if (err) {
                console.log("Error reading file from disk:", err);
                return;
            }
            try {
                const { query } = url.parse(req.url, true);
                const data = JSON.parse(jsonString);
                //Filter the results with the query search
                const response = {}
                response.results = data.results.filter((result) => {
                    return result.name.includes(query.q) || result.description.includes(query.q);
                });

                response.time = new Date();
                response.query = query.q;
                
                const headers = {
                    'Access-Control-Allow-Origin': '*', /* @dev First, read about security */
                    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
                    'Access-Control-Max-Age': 2592000,
                    'Content-Type': 'application/json'
                };
                res.statusCode = 200;
                res.writeHead(200, headers);
                res.end(JSON.stringify(response));
            } catch (err) {
                console.log("Error parsing JSON string:", err);
            }
        });
    }
});



server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});