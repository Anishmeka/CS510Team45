import React, { useEffect, useState } from 'react';
import './Popup.css';
import {
  Divider,
  HStack,
  Heading,
  Input,
  Text,
  Button,
} from '@chakra-ui/react';

const Popup = () => {
  const [response, setResponse] = useState('');
  const [userQuery, setUserQuery] = useState('');

  const onQuerySubmit = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { method: 'getText', userQuery: userQuery },
        function (response) {
          console.log('Function called');
          console.log(response);
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
            return;
          }
          if (response && response.method === 'getText') {
            // TODO: make API query
            setResponse(response.data);
          }
        }
      );
    });
  };

  return (
    <div className="App">
      <Heading>Document Evaluator</Heading>
      <Text mb={5}>Ask about the document on the page here!</Text>
      <HStack>
        <Input
          placeholder="E.g. Summarize this paper"
          onSubmit={onQuerySubmit}
          value={userQuery}
          onChange={(e) => {
            console.log(e.target.value);
            setUserQuery(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') onQuerySubmit();
          }}
        />
        <Button onClick={onQuerySubmit}>Submit</Button>
      </HStack>
      {response && (
        <>
          <Divider mt={5} mb={3} />
          <Text maxHeight="400px" overflowY="scroll" textAlign="left">
            {response}
          </Text>
        </>
      )}
    </div>
  );
};

export default Popup;
