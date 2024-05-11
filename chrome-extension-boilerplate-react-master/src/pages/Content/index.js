import { printLine } from './modules/print';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');
console.log('YO43');

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
          response.data.map((line) => {
            if (line.trim()) {
              // // Split each line by the first colon to separate the term and the definition
              // const [term, definition] = line.split(/:\s*/);
              // return {
              const term = line.replace(/^\d+\.\s*/, ''); // Remove the numbering
              const termWithoutQuotes = term.replace(/^"(.*)"$/, '$1');
              console.log(termWithoutQuotes);
              highlightText(termWithoutQuotes);

              // };
            }
          });
          sendResponse({ data: response.data, method: 'getText' });
        }
      }
    );
    return true; // Keep the messaging channel open for the response
  }
});

function highlightText(searchText) {
  console.log(searchText);
  const regex = new RegExp(`(${searchText})`, 'gi'); // Create a regex for case-insensitive matching.
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );
  let node;

  while ((node = walker.nextNode())) {
    if (node.nodeValue.match(regex)) {
      const span = document.createElement('span');
      span.innerHTML = node.nodeValue.replace(
        regex,
        `<span class="highlight">$1</span>`
      );
      node.parentNode.replaceChild(span, node);
    }
  }

  // Append CSS for highlighting if not already added
  if (!document.querySelector('#highlight-style')) {
    const style = document.createElement('style');
    style.id = 'highlight-style';
    style.textContent = `.highlight { background-color: yellow; }`;
    document.head.appendChild(style);
  }
}
