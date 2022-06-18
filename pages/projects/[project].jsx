import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Grid, GridItem, Link, Text, 
    Center, HStack, VStack, Image, Box, Badge,
TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot } from '@chakra-ui/react'

import Twitter from '../../assets/icons/twitter.png'
import Discord from '../../assets/icons/discord.png'
import Website from '../../assets/icons/click.png'

import { projects } from '../../data'

// Fetching data from the JSON file
export const getStaticProps = async ({ params }) => {
    const key = 'ckey_148ca1425bb2412cb4c98bf085f';
    const baseURL = 'https://api.covalenthq.com/v1'
    const chainId = '137'
    const address = "0x8a33e477F73D22960D850Ff61FD8C58b3B2E21b3";

    const url = new URL(`${baseURL}/${chainId}/events/address/${address}/?starting-block=28672470&ending-block=29672470&key=${key}&page-number=1`);
    const response = await fetch(url);
    const result = await response.json();
    const data = result.data.items;

    const obj = projects.filter((p) => p.name.toString() === params.project)
    const trs = data.filter((t) => t.decoded.name.toString() === "Transfer");
    return {
        props: {name: obj[0].name,
        description: obj[0].type,
        image: obj[0].link,
        transactions: trs},
          }
}

export async function getStaticPaths() {
   const paths = projects.map((d) => {
     return {
       params: {project: d.name.toString()}
     }
   })

   return {
       paths,
       fallback: false
       
     }

   }



export default (props) => {
const router = useRouter();

// const [transfers, setTransfers] = useState(0);

// const key = 'ckey_148ca1425bb2412cb4c98bf085f';
// const baseURL = 'https://api.covalenthq.com/v1'
// const chainId = '137'
// const count = 0;
// const address = router.query.address;


// async function useAPI() {
//     const url = new URL(`${baseURL}/${chainId}/events/address/${address}/?starting-block=28672470&ending-block=29672470&key=${key}&page-number=1`);
//     const response = await fetch(url);
//     const result = await response.json();
//     const data = result.data.items;
//     setTransfers(data);
//     console.log(data.items);
    
// }

// useEffect(() => {
//     useAPI();
//   }, [])
    
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
    bgSize={['300%', '200%', '200%', '200%', '100%']}
    borderRadius='lg'
    bgImg={props.image}
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
        <Text>Last 15 Transactions</Text>
        <TableContainer>
  <Table variant='simple' size='sm' mt={4}>
    <Thead textAlign={'left'}>
      <Tr>
        <Th>Event</Th>
        <Th>Tx. Hash</Th>
      </Tr>
    </Thead>
    <Tbody>
    {props.transactions && props.transactions.map((transfer) => {
         let _data = transfer.decoded.name;
         let _tx = transfer.tx_hash;
      
          return (
             <>
    <Tr>
        <Td>{_data}</Td>
        <Td><Link href={`https://www.polygonscan.com/tx/${_tx}`} target='_blank'>See on explorer</Link></Td>
      </Tr>
      </>
             )
       })}
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
                <Text mr={3} fontSize={'2xl'}><b>{props.name}</b></Text>
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

        <Text noOfLines={['5', '5', '5', '7', '9']} fontSize={15}>{props.description}</Text>

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


