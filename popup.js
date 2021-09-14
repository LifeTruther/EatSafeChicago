
// This is the first call that gets the address info

window.onload = onWindowLoad;

chrome.runtime.onMessage.addListener(function(request, sender) {});
    function onWindowLoad() {
        var message = document.querySelector('#message')
        chrome.tabs.executeScript(null, {
        file: "getPagesSource.js"
        }, function() {
        // If you try and inject into an extensions page or the webstore/NTP you'll get an error
        if (chrome.runtime.lastError) {
            message.innerHTML = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
        }
        });
    }
    


// This is the first info that went on the actual page
chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == "getTrust") {
        trust.innerHTML += request.source
    }
    });

    function onWindowLoad() {
        var trust = document.querySelector('#trust');
    
        chrome.tabs.executeScript(null, {
        file: "getPagesSource.js"
        });
    }

// This is the first of the conditional statements regarding the latest 5 inspections
chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == "getFiveGreen") {
        lastFiveGreen.innerHTML += request.source
    }
    });

    function onWindowLoad() {
        var trust = document.querySelector('#lastFiveGreen');
    
        chrome.tabs.executeScript(null, {
        file: "getPagesSource.js"
        });
    }

chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == "getFiveYellow") {
        lastFiveYellow.innerHTML += request.source
    }
    });

    function onWindowLoad() {
        var trust = document.querySelector('#lastFiveYellow');
    
        chrome.tabs.executeScript(null, {
        file: "getPagesSource.js"
        });
    }

chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == "getFiveRed") {
        lastFiveRed.innerHTML += request.source
    }
    });

    function onWindowLoad() {
        var trust = document.querySelector('#lastFiveRed');
    
        chrome.tabs.executeScript(null, {
        file: "getPagesSource.js"
        });
    }

chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == "date") {
        date.innerHTML += request.source
    }
    });

    function onWindowLoad() {
        var trust = document.querySelector('#date');
    
        chrome.tabs.executeScript(null, {
        file: "getPagesSource.js"
        });
    }


chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == "violate") {
        violated.innerHTML += request.source
    }
    });

    function onWindowLoad() {
        var trust = document.querySelector('#violated');
    
        chrome.tabs.executeScript(null, {
        file: "getPagesSource.js"
        });
    }

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight){
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
        });
}

