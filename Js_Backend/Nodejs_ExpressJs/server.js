
// Write a function named createServer that creates a simple HTTP server using the built-in http module. The server should listen on port 3000 and respond to all requests with a plain text response of "Hello, World!".

const http = require('http');

function createServer(){
    const  server = http.createServer((req,res) => {
        res.writeHead(200, {'content-type': 'text/plain'});
        res.end('Hello,World!');
    });

    server.listen(3000,()=>{
        console.log("Server is running on port 3000");
    });
}

createServer();
