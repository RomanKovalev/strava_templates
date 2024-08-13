import React from 'react';
import App from './components/App.jsx'
import './index.css'
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store/store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
      </Provider>
  </React.StrictMode>,
)
