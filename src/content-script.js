const target = document.createElement("script");
target.type = "text/javascript";
target.src = chrome.runtime.getURL("main.tsx");

document.documentElement.appendChild(target);
