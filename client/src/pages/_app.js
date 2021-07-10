import { persistor, store } from '@app/store';
import Layout from '@components/Layout';
import { QueryClient } from 'react-query';
import { QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import '../styles/globals.css';

export const client = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider {...{ client }}>
      <Provider {...{ store }}>
        <PersistGate loading={null} {...{ persistor }}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
