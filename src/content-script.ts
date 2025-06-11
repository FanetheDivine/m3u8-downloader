const target = document.createElement("script");
target.type = "module";
target.src = chrome.runtime.getURL("downloader/main.js");

document.documentElement.appendChild(target);
