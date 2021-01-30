// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
var windowTopBar = document.createElement('div')
windowTopBar.style.width = "100%"
windowTopBar.style.height = "32px"
windowTopBar.style.backgroundColor = "#fff"
windowTopBar.style.position = "absolute"
windowTopBar.style.top = windowTopBar.style.left = 0
windowTopBar.style.webkitAppRegion = "drag"
document.body.appendChild(windowTopBar)

document.getElementById("show_settings").addEventListener('click', ()=>{
    document.getElementById("scannerView").style.display = "none"
    document.getElementById("settingsView").style.display = "block"
  
  })
  
  document.getElementById("show_menu").addEventListener('click', ()=>{
    document.getElementById("settingsView").style.display = "none"
    document.getElementById("scannerView").style.display = "block"
  
  })
  
  document.getElementById("updateApp").addEventListener('click', updateAppData)
