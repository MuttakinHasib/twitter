import { Toaster } from 'react-hot-toast';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className='max-w-4xl w-full mx-auto container pb-16'>
        {children}
      </main>
      <Toaster
        position='top-right'
        reverseOrder={false}
        // toastOptions={{ style: { marginTop: '4.5rem' } }}
      />
    </>
  );
};

export default Layout;
