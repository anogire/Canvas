import React from 'react';
import ReactDOM from 'react-dom/client';
import { Canvas } from './Canvas';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Canvas />
  </React.StrictMode>
);