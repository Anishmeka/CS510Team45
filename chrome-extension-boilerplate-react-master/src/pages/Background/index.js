console.log('This is the background page.');
console.log('Put the background scripts here.');

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   if (request.text) {
//     // Do something with the extracted text
//     console.log('Text from the page:', request.text);
//   }
// });

// import axios from 'axios';

const openAiApiCall = async (queryData, sendResponse) => {
  console.log('In background');
  const url = 'https://api.openai.com/v1/chat/completions';
  const payload = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: `Given the following article: ${queryData.bgText.substring(
          0,
          3000
        )}, can you quote top three sentences or phrases from this article (take them exactly from the article word for word) that you think best match this following user inquiry about the article: ${
          queryData.userQuery
        } `,
        // content: `Given the following article: "Congress made people poor. They took away people's homes. People were really mad. Congress also killed animals.", can you return top two sentences or phrases from the article that you think best match this following user inquiry about the article: ${queryData.userQuery} `,
      },
    ],
    max_tokens: 200, // Changed this
  };
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_KEY}`, // Ensure API_KEY is securely retrieved
  };

  console.log('here is payload');
  console.log(payload);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.choices[0].message.content; // Return the relevant part of the API response
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error; // Rethrow to handle in the listener
  }
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.method === 'callOpenAI') {
    openAiApiCall(request.data)
      .then((response) => {
        sendResponse({ data: response, method: 'getAIResponse' });
      })
      .catch((error) => {
        console.error('Failed to process OpenAI call:', error);
        sendResponse({ error: error.toString() });
      });
    return true; // Indicates an asynchronous response is expected
  }
});
