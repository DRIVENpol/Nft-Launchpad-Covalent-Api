import React from 'react'

import { Grid, GridItem, Box } from '@chakra-ui/react'

const Project = () => {
  return (
   <>

     <Grid
  templateRows='repeat(2, 1fr)'
  templateColumns='repeat(5, 1fr)'
  gap={2} h='calc(80vh)' maxW={'100%'} mt={20} mb={4} mx={2}
>
  <GridItem rowSpan={2} colSpan={1} bgGradient='linear(to-r, #141E30, #243B55)' borderWidth='1px' borderRadius='lg'>

  </GridItem>


  <GridItem colSpan={2} bgGradient='linear(to-r, #141E30, #243B55)' borderWidth='1px' borderRadius='lg'>

  </GridItem>


  <GridItem colSpan={2} bgGradient='linear(to-r, #141E30, #243B55)' borderWidth='1px' borderRadius='lg'>

  </GridItem>


  <GridItem colSpan={4} bgGradient='linear(to-r, #141E30, #243B55)' borderWidth='1px' borderRadius='lg'>
      
  </GridItem>


</Grid>
   </>
  )
}

export default Project