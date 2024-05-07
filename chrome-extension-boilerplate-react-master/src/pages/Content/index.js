import { printLine } from './modules/print';
// export default highlightText;

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.method === 'getText') {
    // Perform whatever you need to get the text from the page
    const text = document.all[0].innerText;
    sendResponse({ data: text, method: 'getText' });
  }
  // if (request.highlight === true) {
  //   highlightText(document.body);
  //   sendResponse({messageStatus: "received"});
  // }

  if (request.method === 'highlightText') {
    var searchText = request.text;
    var regex = new RegExp(searchText, "gi");
    var matches = document.body.innerHTML.match(regex);
    console.log("Reached");
    
    if (matches !== null && matches.length > 0) {
      console.log("Found word");
      var bodyHTML = document.body.innerHTML;
      var highlightedHTML = bodyHTML.replace(regex, "<span style='background-color: yellow'>$&</span>");
      document.body.innerHTML = highlightedHTML;
    }
  }
  // if (request.method == 'highlightText') {
  //   const bodyText = document.all[0].innerText;
  //   const re = new RegExp(searchText, "gi");
  //   const matches = bodyText.match(re);
  //   if (matches) {
  //     document.all[0].innerText = bodyText.replace(re, `<span style="background-color: yellow;">${searchText}</span>`);
  //   }
  // }
});

// function highlightText(element) {
//   var nodes = element.childNodes;
//   for (var i = 0, l = nodes.length; i < l; i++) {
//     if (nodes[i].nodeType === 3) {  // Node Type 3 is a text node
//       var text = nodes[i].innerHTML;
//       nodes[i].innerHTML = "<span style='background-color:#FFEA0'>" + text + "</span>";
//     } else if (nodes[i].childNodes.length > 0) {
//       highlightText(nodes[i]);  // Not a text node or leaf, so check it's children
//     }
//   }
// }