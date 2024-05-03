import React, { useState } from 'react';
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

  const onQuerySubmit = () => {
    // TODO: make api call and set response
    setResponse('');
  };

  return (
    <div className="App">
      <Heading>Document Evaluator</Heading>
      <Text mb={5}>Ask about the document on the page here!</Text>
      <HStack>
        <Input
          placeholder="E.g. Summarize this paper"
          onSubmit={onQuerySubmit}
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
