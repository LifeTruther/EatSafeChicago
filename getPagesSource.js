// credit to Rob W <http://stackoverflow.com/users/938089/rob-w>
// Demo: var serialized_html = DOMtoString(document); 

var message = document.querySelector('#message');
var addressRaw = ``

function doEverything(document_root) {
    node = document_root.firstChild;
    while (node) {
        switch (node.nodeType) {
        case Node.ELEMENT_NODE:
            if (node.outerHTML.search('>Menu<') != -1){
                var patt = new RegExp(/[\w\d\s-]+(?=, Chicago)/);
                addressRaw += patt.exec(node.outerHTML).toString().toUpperCase().slice(1);
                console.log(addressRaw)
            }else{html += "No Restaurant Here"};
            break;
        }
        node = node.nextSibling;
    }
    return addressRaw
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: doEverything(document)
});


async function getData(url = `https://data.cityofchicago.org/resource/4ijn-s7e5.json?$where=address=%22${addressRaw}%20%22`) {
    const response = await fetch(url, {
        method: 'GET',
        headers: {'Content-type': 'application/json'},
        });
        return response.json();
    }
console.log(getData());
getData();


async function loadData() {
    var inspect = await getData();
    console.log(inspect[0].results)
    
    var shim = `${inspect[0].aka_name}`
    chrome.runtime.sendMessage({
        action: "getTrust",
        source: shim,
    });


    var violate = ``
    if (inspect[0].violations !== undefined) {
        violate += `${inspect[0].violations}`;
        chrome.runtime.sendMessage({
            action: "violate",
            source: violate,
        });
    }else{
        violate += `No Violations recorded in latest inspection`;
        chrome.runtime.sendMessage({
            action: "violate",
            source: violate,
        });
    }
    

    var lastFive = ``
    if (inspect[0].results.slice(0,4) == 'Fail') {
        lastFive += 'SUSPICIOUS';
        chrome.runtime.sendMessage({
            action: "getFiveRed",
            source: lastFive,
        });
    }else if (inspect[0].results.slice(0,4) == 'Pass' && inspect[1].results.slice(0,4) == 'Pass' && inspect[2].results.slice(0,4) == 'Pass') {
        lastFive += 'CLEAN';
        chrome.runtime.sendMessage({
            action: "getFiveGreen",
            source: lastFive,
        });
    }else{
        lastFive += 'NOT VERIFIED';
        chrome.runtime.sendMessage({
            action: "getFiveYellow",
            source: lastFive,
        });
    }
    var date = `Latest Test Date: ${inspect[0].inspection_date.slice(0,10)}`
    console.log(date)
    chrome.runtime.sendMessage({
        action: "date",
        source: date,
    });

};
loadData()






















// function DOMtoString(document_root) {
//     var html = '',
//         node = document_root.firstChild;
//     while (node) {
//         switch (node.nodeType) {
//         case Node.ELEMENT_NODE:
//             html += node.outerHTML;
//             break;
//         case Node.TEXT_NODE:
//             html += node.nodeValue;
//             break;
//         case Node.CDATA_SECTION_NODE:
//             html += '<![CDATA[' + node.nodeValue + ']]>';
//             break;
//         case Node.COMMENT_NODE:
//             html += '<!--' + node.nodeValue + '-->';
//             break;
//         case Node.DOCUMENT_TYPE_NODE:
//             // (X)HTML documents are identified by public identifiers
//             html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
//             break;
//         }
//         node = node.nextSibling;
//     }
//     return html;
// }

// chrome.runtime.sendMessage({
//     action: "getSource",
//     source: DOMtoString(document)
// });