import Navbar from '@/componet/Navbar'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return<> 
  <Navbar/>
  <Component {...pageProps} />
  </>
}
// npm run dev to start an application on local host