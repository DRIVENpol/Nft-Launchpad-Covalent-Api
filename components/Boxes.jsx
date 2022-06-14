import React from 'react'

import { Text, Center, Grid, GridItem, Box, Container, Icon } from '@chakra-ui/react'
import { Stack, Button, Link, HStack, Image } from '@chakra-ui/react'
import Twitter from '../assets/icons/twitter.png'
import Discord from '../assets/icons/discord.png'
import Website from '../assets/icons/click.png'

const projects = [
    {
        name: 'Project Name',
        type: 'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.',
        link: 'https://bit.ly/2Z4KKcF',
        website: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf',
        discord: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf',
        twitter: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf'
      },
      {
        name: 'Project Name',
        type: 'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.',
        link: 'https://bit.ly/2Z4KKcF',
        facebook: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf',
        discord: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf',
        twitter: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf'
      },
      {
        name: 'Project Name',
        type: 'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.',
        link: 'https://bit.ly/2Z4KKcF',
        facebook: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf',
        discord: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf',
        twitter: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf'
      },
      {
        name: 'Project Name',
        type: 'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.',
        link: 'https://bit.ly/2Z4KKcF',
        facebook: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf',
        discord: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf',
        twitter: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf'
      },
      {
        name: 'Project Name',
        type: 'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.',
        link: 'https://bit.ly/2Z4KKcF',
        facebook: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf',
        discord: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf',
        twitter: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf'
      },
      {
        name: 'Project Name',
        type: 'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.',
        link: 'https://bit.ly/2Z4KKcF',
        facebook: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf',
        discord: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf',
        twitter: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf'
      },
      {
        name: 'Project Name',
        type: 'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.',
        link: 'https://bit.ly/2Z4KKcF',
        facebook: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf',
        discord: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf',
        twitter: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf'
      },
      {
        name: 'Project Name',
        type: 'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.',
        link: 'https://bit.ly/2Z4KKcF',
        facebook: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf',
        discord: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf',
        twitter: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf'
      },
      {
        name: 'Project Name',
        type: 'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.',
        link: 'https://bit.ly/2Z4KKcF',
        facebook: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf',
        discord: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf',
        twitter: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf'
      },
      {
        name: 'Project Name',
        type: 'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.',
        link: 'https://bit.ly/2Z4KKcF',
        facebook: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf',
        discord: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf',
        twitter: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf'
      },

]

const Boxes = () => {
  return (
    <>
<Container maxW={'100%'} bg='white' color={'black'} mt='-20px' pt='5%' pb='2%'>
<Center>
    <Text fontSize='3xl' ><b>Featured Projects</b></Text>
    </Center>
    <Center><Text align='center'>
          NFT Minty Picks for 13-20 June! DYOR!
        </Text></Center><br/>
    <Center>
    <Grid templateColumns={['repeat(1, 1fr)', null, 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)', 'repeat(5, 1fr)']} gap={6} w='75%' mb='6px'>
   {projects && projects.map(project => (
       <div key={project.name} >
       <GridItem w='100%' h='10' align='center' mb={['300', '420', '400', '400', '380', '380']}>
       <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' bgGradient='linear(to-r, #141E30, #243B55)' color={'white'}>
        <Stack direction='row' alignItems='baseline'>
            <Image src={project.link} alt={project.link} />

   </Stack>
    
    <Stack direction='column' mx={2} mb='5%' mt='5%' alignItems="center" my={4}>  
        <Text fontSize={'29px'}><b>{project.name}</b></Text>
        <Text fontSize={'14px'}>{project.type}</Text>
        <Stack direction='row' mb='5%' mt='5%'> 
        <Button
              variant={'solid'}
              size='sm' my={4}
              bgGradient='linear(to-l, #7928CA, #FF0080)'
              color='white'
              maxW={['100%', null, '100%', '100%', '100%']}
              fontSize={['12px', null, null, null, '100%']}
              _hover={{bgGradient: "linear(to-l, #8a32e3, #FF0080)", color: "white"}}
                 px={6} borderRadius={20}>
              <Link href='/CreateNft'>
              Mint Now
              </Link>
            </Button>
            </Stack>
            <HStack>
            <a href={project.twitter} target='_blank'><Image src={Twitter.src} alt='Twitter' w={5}/></a>
            <a href={project.discord} target='_blank'><Image src={Discord.src} alt='Discord' w={5}/></a>
            <a href={project.website} target='_blank'><Image src={Website.src} alt='Website' w={5}/></a>
           </HStack>

            </Stack>
            

    </Box>
    </GridItem>
       </div>
   ))}


<br />

    </Grid>
   </Center><br /><br /></Container>
    </>
  )
}

export default Boxes