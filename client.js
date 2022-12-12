
const WebSocket = require('ws');
function main() {
  


  function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}
  
  //const myInterval = setInterval(render, 200);
  let id=create_UUID();
 
 



  const WS_URL1 = "ws://localhost:11111"+"/?id="+id;
  const ws1 = new WebSocket(WS_URL1, "echo-protocol");
  
  ws1.onopen = () => console.log(`Connected to ${WS_URL1}`);
  let blobArray = [];
  //let ct=0
  let count = 0;
  let start;
  let end;
  let pcount = 0;
  let c = 0;
  ws1.onmessage = (message) => {
      console.log(message.data);
  };
 





}
main();
