import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UsuariosProvider } from './context/UsuariosContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UsuariosProvider>
      <App />
    </UsuariosProvider>
  </React.StrictMode>
);
