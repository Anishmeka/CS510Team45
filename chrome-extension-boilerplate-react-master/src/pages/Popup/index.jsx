import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';

import Popup from './Popup';
import './index.css';

const container = document.getElementById('app-container');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

const customStyles = `
  .chakra-ui-light {
    height: auto !important;
    width: 500px;
  }
`;

const styleTag = document.createElement('style');
styleTag.textContent = customStyles;
document.head.appendChild(styleTag);

root.render(
  <ChakraProvider>
    <Popup />
  </ChakraProvider>
);
