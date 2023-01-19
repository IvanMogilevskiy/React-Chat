import { Provider } from 'react-redux';
import { ToastContainer } from 'react-bootstrap';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import App from './components/App.js';
import store from './slices/index.js';
import ApiProvider from './components/ApiProvider.js';
import AuthProvider from './components/AuthProvider.js';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
  payload: {
    environment: 'production',
  },
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const initChat = (socket) => (
  <Provider store={store}>
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <ApiProvider socket={socket}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ApiProvider>
        <ToastContainer />
      </ErrorBoundary>
    </RollbarProvider>
  </Provider>
);

export default initChat;
