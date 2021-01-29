// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
var evilscan = require('evilscan');
const { orderBy } = require('natural-orderby')

let found_ip =  [];

var options = {
    target:'192.168.1.1-50',
    port:'20,21,22,80,443',
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
    // finished !
    console.log(found_ip)
    found_ip = orderBy(found_ip)
    sortElement()
});

scanner.run();

window.addEventListener('DOMContentLoaded', () => {

  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})


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