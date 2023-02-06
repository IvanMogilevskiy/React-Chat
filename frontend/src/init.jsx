import { Provider } from 'react-redux';
import { ToastContainer } from 'react-bootstrap';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import filter from 'leo-profanity';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from './locales/ru.js';
import App from './components/App.js';
import store from './slices/index.js';
import ApiProvider from './components/api/ApiProvider.js';
import AuthProvider from './components/authentication/AuthProvider.js';
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

const initChat = async (socket) => {
  const i18n = i18next.createInstance();
  await i18n
    .use(initReactI18next)
    .init({
      fallbackLng: 'ru',
      lng: 'ru',
      resources: {
        ru,
      },
      debug: process.env.NODE_ENV === 'development',
    });
  filter.add(filter.getDictionary('ru'));
  filter.add(filter.getDictionary('en'));
  return (
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
};

export default initChat;
