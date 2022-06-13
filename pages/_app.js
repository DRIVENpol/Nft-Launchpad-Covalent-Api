// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes'
import Navbar from '../components/Navbar'

function MyApp({ Component, pageProps }) {
  return (<>
    <ChakraProvider>
    <ThemeProvider>
    <Navbar />
      <Component {...pageProps} />
    </ThemeProvider>
    </ChakraProvider>
    </>)
}

export default MyApp