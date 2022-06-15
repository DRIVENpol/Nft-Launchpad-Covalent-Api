import React from 'react'
import { useRouter } from 'next/router'
import { Button, Grid, GridItem, Link, Text, Center } from '@chakra-ui/react'

const Project = () => {
    const router = useRouter();
    console.log(router.query);
    
  return (
   <>
    
     <Grid
  templateRows='repeat(2, 1fr)'
  templateColumns='repeat(5, 1fr)'
  gap={2} 
  h='calc(80vh)' 
  maxW={'100%'} 
  mt={20} 
  mb={4} 
  mx={2} 
  color='white'
>
    <GridItem colSpan={['5', '5', '4', '4', '4']} 
    bgGradient='linear(to-r, #141E30, #243B55)' 
    bgPosition={'center'}
    bgSize='100%'
    borderRadius='lg'
    bgImg={router.query.banner}
    bgRepeat="no-repeat"
    p={4} />

    <GridItem rowSpan={['1', '2', '2', '2', '2']} 
    colSpan={['5', '5', '1', '1', '1']} 
    bgGradient='linear(to-r, #141E30, #243B55)'
    borderWidth='1px' 
    borderRadius='lg' 
    p={4}
    >

        <Text><b>Transactions</b></Text>

    </GridItem>

  

    <GridItem 
    colSpan={['5', '5', '2', '2', '2']}  
    bgGradient='linear(to-r, #141E30, #243B55)' 
    borderWidth='1px' 
    borderRadius='lg' 
    p={4}>
        <Text><b>{router.query.project}</b></Text>
        <Text>{router.query.description}</Text>

    </GridItem>


    <GridItem colSpan={['5', '5', '2', '2', '2']}  
    bgGradient='linear(to-r, #141E30, #243B55)' 
    borderWidth='1px' 
    borderRadius='lg' 
    p={4}>

<Center my='17%'><Button
              variant={'solid'}
              size='lg'
              bgGradient='linear(to-l, #7928CA, #FF0080)'
              color='white'
              maxW={'100%'}
              fontSize={['12px', null, null, null, '100%']}
              _hover={{bgGradient: "linear(to-l, #8a32e3, #FF0080)", color: "white"}}
               borderRadius={40}
               >
              <Link href='/CreateNft'>
             <b>Mint Now!</b>
              </Link>
            </Button>
</Center>
    </GridItem>


</Grid>
   </>
  )
}

export default Project