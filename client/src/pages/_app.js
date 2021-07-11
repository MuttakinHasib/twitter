import { persistor, store } from '@app/store';
import Layout from '@components/Layout';
import { QueryClient } from 'react-query';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
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
            {process.env.NODE_ENV !== 'production' && <ReactQueryDevtools />}
          </Layout>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
