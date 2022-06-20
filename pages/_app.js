// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import { Flex } from '@chakra-ui/react'



function MyApp({ Component, pageProps }) {
  return (<>
    <ChakraProvider>
      <Navbar />
        <Component {...pageProps} />
      <Footer />
    </ChakraProvider>
    </>)
}

export default MyApp