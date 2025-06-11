const target = document.createElement("script");
target.type = "text/javascript";
target.src = chrome.runtime.getURL("downloader/main.js");

document.documentElement.appendChild(target);
