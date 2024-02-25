import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './redux/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
      <App />
    </PersistGate>
  </BrowserRouter>
);
