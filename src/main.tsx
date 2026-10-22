import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Portfolio from './Portfolio';
import './styles/index.css';

const root = document.getElementById('root');
if (!root) throw new Error('The portfolio root element is missing.');
createRoot(root).render(
  <StrictMode>
    <Portfolio />
  </StrictMode>,
);
