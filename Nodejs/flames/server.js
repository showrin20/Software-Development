const http = require('http');
const fs = require('fs');
const path = require('path');
PORT = 3000;
function createServer(){
    const  server = http.createServer((req,res) => {
        let filePath = path.join(__dirname + '/public',req.url === '/'? 'index.html' : req.url);

        let extname =path.extname(filePath);
        let contentType = 'text/html';
        switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
    case '.jpeg':
      contentType = 'image/jpeg';
      break;
  }


        fs.readFile(filePath,(err,data) => {
            if(err){
                if  (err.code === 'ENOENT'){
                    res.writeHead(404, {'content-type': 'text/plain'});
                    res.end('404 Not Found');
                }
                else{
                    res.writeHead(500, {'content-type': 'text/plain'});
                    res.end('500 Internal Server Error');
                }
              
            }            
            else{
                res.writeHead(200, {'content-type': contentType});
                res.end(data);
            }
        });
    });

    server.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    });
}

createServer();