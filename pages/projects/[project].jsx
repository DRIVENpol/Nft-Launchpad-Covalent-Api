import React from 'react'
import { useRouter } from 'next/router'
import { Button, Grid, GridItem, Link, Text, 
    Center, HStack, VStack, Image, Box, Badge,
TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot } from '@chakra-ui/react'

import Twitter from '../../assets/icons/twitter.png'
import Discord from '../../assets/icons/discord.png'
import Website from '../../assets/icons/click.png'


const Project = () => {
    const router = useRouter();
    
  return (
   <>
    
     <Grid
  templateRows='repeat(2, 1fr)'
  templateColumns='repeat(5, 1fr)'
  gap={2} 
  maxW={'100%'} 
  mt={20} 
  mb={4} 
  mx={2} 
  color='white'
>
    <GridItem colSpan={['5', '5', '4', '4', '4']} 
    bgGradient='linear(to-r, #141E30, #243B55)' 
    bgPosition={'center'}
    bgSize={['200%', '200%', '100%', '100%', '100%']}
    borderRadius='lg'
    bgImg={router.query.banner}
    bgRepeat="no-repeat"
    p={6} />

    <GridItem rowSpan={['1', '2', '2', '2', '2']} 
    colSpan={['5', '5', '1', '1', '1']} 
    bgGradient='linear(to-r, #141E30, #243B55)'
    borderWidth='1px' 
    borderRadius='lg' 
    p={6}
    >

    <Text><b>Transactions</b></Text>
        <Text>Last 10 Transactions</Text>
        <TableContainer>
  <Table variant='simple' size='sm' mt={4}>
    <Thead textAlign={'left'}>
      <Tr>
        <Th>Event</Th>
        <Th>Quantity</Th>
        <Th>Tx. Hash</Th>
      </Tr>
    </Thead>
    <Tbody>
    <Tr>
        <Td>Mint</Td>
        <Td>6</Td>
        <Td>See on Etherscan</Td>
      </Tr>
      <Tr>
        <Td>Mint</Td>
        <Td>2</Td>
        <Td>See on Etherscan</Td>
      </Tr>
      <Tr>
        <Td>Mint</Td>
        <Td>1</Td>
        <Td>See on Etherscan</Td>
      </Tr>
      <Tr>
        <Td>Mint</Td>
        <Td>6</Td>
        <Td>See on Etherscan</Td>
      </Tr>
      <Tr>
        <Td>Mint</Td>
        <Td>2</Td>
        <Td>See on Etherscan</Td>
      </Tr>
      <Tr>
        <Td>Mint</Td>
        <Td>1</Td>
        <Td>See on Etherscan</Td>
      </Tr>
      <Tr>
        <Td>Mint</Td>
        <Td>6</Td>
        <Td>See on Etherscan</Td>
      </Tr>
      <Tr>
        <Td>Mint</Td>
        <Td>2</Td>
        <Td>See on Etherscan</Td>
      </Tr>
      <Tr>
        <Td>Mint</Td>
        <Td>1</Td>
        <Td>See on Etherscan</Td>
      </Tr>
      <Tr>
        <Td>Mint</Td>
        <Td>6</Td>
        <Td>See on Etherscan</Td>
      </Tr>
    </Tbody>
  </Table>
</TableContainer>

    </GridItem>

  

    <GridItem 
    colSpan={['5', '5', '2', '2', '2']}  
    bgGradient='linear(to-r, #141E30, #243B55)' 
    borderWidth='1px' 
    borderRadius='lg' 
    p={6}>
    
        <HStack mb={5}>
                <Text mr={3} fontSize={'2xl'}><b>{router.query.project}</b></Text>
               <Box  bgGradient='linear(to-l, #7928CA, #FF0080)' py={2} px={4} color='white' borderRadius='lg'>
               <HStack>
                <a href='#' target='_blank'><Image src={Twitter.src} alt='Twitter' w={3}/></a>
                <Text>|</Text>
                <a href='#' target='_blank'><Image src={Discord.src} alt='Discord' w={3}/></a>
                <Text>|</Text>
                <a href='#' target='_blank'><Image src={Website.src} alt='Website' w={3}/></a>
                </HStack>
                </Box> 
            </HStack>

        <Text noOfLines={['5', '5', '5', '7', '9']} fontSize={15}>{router.query.description}</Text>

    </GridItem>


    <GridItem colSpan={['5', '5', '2', '2', '2']}  
    bgGradient='linear(to-r, #141E30, #243B55)' 
    borderWidth='1px' 
    borderRadius='lg' 
    p={6}>

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
             <b>Connect Your Wallet & Mint</b>
              </Link>
            </Button>
</Center>
    </GridItem>


</Grid>
   </>
  )
}

export default Project