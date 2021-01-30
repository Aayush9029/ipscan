// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
var evilscan = require('evilscan');
const { orderBy } = require('natural-orderby')
const fs = require("fs");
const path = require("path");


let ip_target;
let port_target;

var datafile = path.join(__dirname, "data/appData.json");


// Reading Saved IP AND PORT
fs.readFile(datafile, (err, data) => {
  let firstTime = JSON.parse(data);
  ip_target = firstTime.ip;
  port_target = firstTime.port;

  if (err || !ip_target) {
    let appData = {
      ip: "192.168.1.1-50",
      port: "20,21,22,80"
    };
    let data = JSON.stringify(appData);
    fs.writeFileSync(datafile, data);
  }
  scan()
  console.log(ip_target, port_target)
});


function updateAppData(){

  let user_ip =  "192.168.1.1-2";
  let user_port = "20,21,22,80";

  user_ip = document.getElementById("ip_range").value;
  user_port = document.getElementById("port_range").nodeValue;
  
  console.log(user_ip, user_port)

  fs.readFile(datafile, (err_, data_) => {
  
      let appData = {
        ip: user_ip,
        port: user_port
      };

      let data = JSON.stringify(appData);
      fs.writeFileSync(datafile, data);
    scan()
  
    console.log(ip_target, port_target)
  });
}

function scan(){
let found_ip =  [];
var options = {
    target:ip_target,
    port: port_target,
    status:'TROU', // Timeout, Refused, Open, Unreachable
    // banner:true,
    display: 'json',
};

var scanner = new evilscan(options);

scanner.on('result',function(data) {
    // fired when item is matching options
    if (data["status"] == "closed (refused)"){
      for (let i = 0; i < found_ip.length; i++) {
        const ip = found_ip[i];
        if (ip == data['ip']){
          return
        }
      }
      addElement(data["ip"])
      // console.log(data);
      found_ip.push(data["ip"])
   

}
});

scanner.on('error',function(err) {
    throw new Error(data.toString());
});

scanner.on('done',function() {
    found_ip = orderBy(found_ip)
    sortElement()
});

scanner.run();


function addElement (ip) {
  const parent_div = document.getElementById("scanned_list");

  // create a new div element
  const newDiv = document.createElement("button");
  newDiv.innerHTML = ip;
  parent_div.appendChild(newDiv);
}



function sortElement() {
  const parent_div = document.getElementById("scanned_list");
  parent_div.innerHTML="";
  for (let i = 0; i < found_ip.length; i++) {
   // create a new div element
   const newDiv = document.createElement("button");
   newDiv.innerHTML = found_ip[i];
   parent_div.appendChild(newDiv);
    
  }
}
}