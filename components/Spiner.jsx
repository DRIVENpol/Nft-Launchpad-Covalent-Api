import React from 'react'
import { Container, Spinner, Center, Text } from '@chakra-ui/react'
const Spiner = () => {
  return (
   <Container mt={40} height='500px'>
   <Center>
<Spinner
  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='#141E30'
  size='xl'
/>
    </Center>
    <Text align={'center'} fontSize='30px' mt={10} color='#141E30'>Fetching Data</Text>
   </Container>
  )
}

export default Spiner