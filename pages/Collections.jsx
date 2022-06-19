import Hero from "../components/Hero"

import { Text, Center, Grid, GridItem, Box, Container } from '@chakra-ui/react'
import { Stack, Button, HStack, Image } from '@chakra-ui/react'

import { projects } from '../data'

import Twitter from '../assets/icons/twitter.png'
import Discord from '../assets/icons/discord.png'
import Website from '../assets/icons/click.png'

import Link from 'next/link'

const Collections = function ({obj}) {

  return (
    <>
     <Hero />
      <Container maxW={'100%'} bg='white' color={'black'} mt='-20px' pt='5%' pb='2%'>
        <Center>
          <Text fontSize='3xl' ><b>All Active Collections</b></Text>
        </Center>

        <Center> 
          <Text align='center'>
          Created using NFT Minty! DYOR!
          </Text>
        </Center><br/>

        <Center>
          <Grid templateColumns={['repeat(1, 1fr)', null, 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)', 'repeat(4, 1fr)']}
          gap={6}
          w='75%'>
          {obj && obj.map((project) => (
            <div key={project.name} {...project}>
              <GridItem w='100%' h='10' align='center' mb={['420', '420', '420', '400', '380', '400']}>
                <Box
                maxW='sm'
                borderWidth='1px'
                borderRadius='lg'
                overflow='hidden'
                bgGradient='linear(to-r, #141E30, #243B55)'
                color={'white'}>
                  <Image 
                  src={project.link}
                  maxH={200}
                  maxW='100%'
                  minH={200}
                  alt={project.link}
                  />
    
                  <Stack direction='column' mx={4} mb='5%' mt='5%' alignItems="center" my={4}>  
                      <Text fontSize={'29px'}><b>{project.name}</b></Text>
                      <Text fontSize={'14px'} noOfLines={2}>{project.type}</Text>
                        <Stack direction='row' mb='5%' mt='5%'>
                          <Link href={'/projects/' + project.name} key={project.type} passHref>
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
