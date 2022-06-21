import React, { useState } from "react"


import { Text, Center, Grid, GridItem, Box, Container } from '@chakra-ui/react'
import { Stack, Button, HStack, Image, Input } from '@chakra-ui/react'

import { projects } from '../data'

import Twitter from '../assets/icons/twitter.png'
import Discord from '../assets/icons/discord.png'
import Website from '../assets/icons/click.png'

import Link from 'next/link'

const Collections = function ({obj}) {

  const [search, setSearch] = useState("");
  const searchResult = obj.filter((p) => (p.name.toString().includes(search.toString())
  || p.address.toString().includes(search.toString()))
  );

  return (
    <>
      <Container maxW={'100%'} bg='white' color={'black'} pt='5%' pb='2%'>
        <Center>
        <Text fontSize={'ml'} mb={3} color='grey'>Search by name or address</Text></Center>
        <Center><Input onChange={(event) => {
          setSearch(event.target.value)
        }}maxWidth={['80%', '80%', '70%', '60%', '50%' ]} placeholder='Search...' mb={10} 
        borderRadius='40' borderColor={'#FF0080'} borderWidth='2px' />
        </Center>
        <Center>
        <Text fontSize='3xl' ><b>All Active Collections</b></Text>
        </Center>

        <Center> 
          <Text align='center'>
          Created using NFT Minty! DYOR!
          </Text>
        </Center><br/>

        <Center>
        <Grid templateColumns={['repeat(1, 1fr)', null, 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)', 'repeat(4, 1fr)']} gap={6} w='75%'>
          {searchResult && searchResult.map((project) => (
            <div key={project.name} {...project}>
            <GridItem w='100%' h='10' align='center' mb={['400', '400', '420', '400', '380', '400']}>
       <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' bgGradient='linear(to-r, #141E30, #243B55)' color={'white'}>
      <Box w={'200'} h='200' bgImg={project.link} bgRepeat="no-repeat" bgPosition={'center'} bgSize='200%'>
      {/* <Image src={project.link}
        width='100' height='200' alt={project.link} display='block'
      /> */}
      </Box>
    
    <Stack direction='column' mx={4} mb='5%' mt='5%' alignItems="center" my={4}>  
        <Text fontSize={'29px'}><b>{project.name}</b></Text>
        <Text fontSize={'14px'} noOfLines={2}>{project.type}</Text>
        <Stack direction='row' mb='5%' mt='5%'>
        <Link href={`/projects/${project.name}`}
              key={project.type} rel="noreferrer" passHref>
        <Button
              variant={'solid'}
              size='sm' my={4}
              bgGradient='linear(to-l, #7928CA, #FF0080)'
              color='white'
              maxW={['100%', null, '100%', '100%', '100%']}
              fontSize={['12px', null, null, null, '100%']}
              _hover={{bgGradient: "linear(to-l, #8a32e3, #FF0080)", color: "white"}}
                 px={6} borderRadius={20}>
              Mint Now
            </Button>
            </Link>
            </Stack>
            <HStack>
            <a href={project.twitter} target='_blank' rel="noreferrer"><Image src={Twitter.src} alt='Twitter' w={5}/></a>
            <a href={project.discord} target='_blank' rel="noreferrer"><Image src={Discord.src} alt='Discord' w={5}/></a>
            <a href={project.website} target='_blank' rel="noreferrer"><Image src={Website.src} alt='Website' w={5}/></a>
           </HStack>
            </Stack>
    </Box>
    </GridItem>
       </div>
   ))}
            <br />
          </Grid>
        </Center>
        <br />
        <br />
      </Container>
    </>
  )
}

// Fetching data from the JSON file
export async function getStaticProps() {
  return {
    props: {obj: projects}
  }
}

export default Collections
