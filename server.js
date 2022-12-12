
// #!/usr/bin/env node
//import fetch from "node-fetch";
//const fetch = require('node-fetch')
var FileReader = require('filereader')
  , fileReader = new FileReader()
  ;
var XMLHttpRequest = require('xhr2');
var xhr = new XMLHttpRequest();
const fs = require('fs')
var count=0;
var WebSocketServer = require('websocket').server;
var http = require('http');
const child_process = require('child_process'); // To be used later for running FFmpeg

var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server.listen(11111, function() {
    console.log((new Date()) + ' Server is listening on port 11111');
});


wsServer = new WebSocketServer({
    httpServer: server,
    // You should not use autoAcceptConnections for production
    // applications, as it defeats all standard cross-origin protection
    // facilities built into the protocol and the browser.  You should
    // *always* verify the connection's origin and decide whether or not
    // to accept it.
    autoAcceptConnections: false ,maxReceivedFrameSize: 131072,
    maxReceivedMessageSize: 10 * 1024 * 1024

});

function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}
let connectedClients = []



  
     


// fs.watchFile(
  
//     // The name of the file to watch
//     "logs.txt",
    
//     // The options parameter is used to 
//     //modify the behaviour of the method
//     {
//       // Specify the use of big integers
//       // in the Stats object 
//       bigint: false,
    
//       // Specify if the process should 
//       // continue as long as file is
//       // watched
//       persistent: true,
    
//       // Specify the interval between
//       // each poll the file
//       interval: 4000,
//     },
//     (curr, prev) => {
//       console.log("\nThe file was edited");
    
//       // Show the time when the file was modified
//       console.log("Previous Modified Time", prev.mtime);
//       console.log("Current Modified Time", curr.mtime);
    
//       console.log(
//         "The contents of the current file are:",
//         fs.readFileSync("logs.txt", "utf8")
//       );
//     }
//   );

//usage:
var CHUNK_SIZE = 1 * 1024 * 1024, // 1MB
    buffer = Buffer.alloc(CHUNK_SIZE),
    filePath = './logs.txt';

fs.open(filePath, 'r', function(err, fd) {
  if (err) throw err;
  function readNextChunk() {
    //console.log("next timeeeeeeee")
    fs.read(fd, buffer, 0, CHUNK_SIZE, null, function(err, nread) {
      if (err) throw err;

      if (nread === 0) {
        // done reading file, do any necessary finalization steps
        //console.log("file closed")
        
      }

      var data;
      if (nread < CHUNK_SIZE)
        data = buffer.slice(0, nread);
      else
        data = buffer;
        console.log(data.toString('utf-8'));
        console.log(connectedClients.length);
    connectedClients.forEach((ws, i) => {
        if (ws.readyState === ws.OPEN) { // check if it is still connected
            //   ws.sendUTF(message.utf8Data);
              
            
           

             if(data.toString('utf-8')!="")
               {
                console.log("sening")
                ws.send(data.toString('utf-8')); // send
               }
        } 
    });
      // do something with `data`, then call `readNextChunk();`
    });
  }
  setInterval(function(){
    //start();
    readNextChunk();

    // readTextFile("logs.txt"){
    //     // var data = JSON.parse(text);
    //     // console.log(data);
    // };
    
    

},3000);
});

    
wsServer.on('request', function(request){

  


  
 




       
    if (!originIsAllowed(request.origin)) {
      // Make sure we only accept requests from an allowed origin
      request.reject();
      console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
      return;
    }
    
    var connection = request.accept('echo-protocol', request.origin);
    console.log((new Date()) + ' Connection accepted.');
    connectedClients.push(connection);


    



    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.' + reasonCode + description);
        connectedClients.forEach((ws, i) => {
            if(ws===connection)
            {
                console.log("removing");
                connectedClients.splice(i, 1);
            }
           
       }); 
    });
});