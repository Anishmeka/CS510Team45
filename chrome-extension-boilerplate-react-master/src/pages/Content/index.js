import { printLine } from './modules/print';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');
console.log('YO34');

printLine("Using the 'printLine' function from the Print Module");

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('HERE1');
  if (request.method === 'getText') {
    console.log('HI');
    console.log(request);
    // Fetch text and send to background
    const text = document.all[0].innerText;
    console.log(text);
    chrome.runtime.sendMessage(
      {
        method: 'callOpenAI',
        data: { bgText: text, userQuery: request.userQuery },
      },
      (response) => {
        if (response.method === 'getAIResponse') {
          sendResponse({ data: response.data, method: 'getText' });
        }
      }
    );
    return true; // Keep the messaging channel open for the response
  }
});
