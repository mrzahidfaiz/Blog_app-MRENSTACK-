import '@/styles/globals.css'
import { Provider } from 'react-redux';
import store from '@/store/store';
import Navbar from '@/components/Navbar';

export default function App({ Component, pageProps }) {
  return( 
  <>
  <Navbar />
  <Provider store={store}>
  <Component {...pageProps} />
  </Provider>
  </>
  )
}
