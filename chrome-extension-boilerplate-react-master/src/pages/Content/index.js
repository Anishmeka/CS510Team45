import { printLine } from './modules/print';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.method === 'getText') {
    // Perform whatever you need to get the text from the page
    const text = document.all[0].innerText;
    sendResponse({ data: text, method: 'getText' });
  }
});
