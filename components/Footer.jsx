import { Container, Grid, GridItem, Image, Text, HStack, Center } from '@chakra-ui/react'
import React from 'react'
import Twitter from '../assets/icons/twitter.png'
import Discord from '../assets/icons/discord.png'
import Website from '../assets/icons/click.png'




const Footer = () => {
  return (
 <>

     <Container maxW='100%' bgGradient='linear(to-r, #141E30, #243B55)' align='center' py={5}>
     <Grid templateColumns={['repeat(1, 1fr)', null, null, null, 'repeat(3, 1fr)']} 
     gap={6} color='white' alignItems={'center'} justifyContent={'space-between'}>

        <GridItem w='100%'><Text fontSize='2xl'><b>NFT Minty</b></Text></GridItem>

        <GridItem w='100%' mt={[null, null, null, null, '10px']}><Text>All Rights Reserved.</Text></GridItem>

        <GridItem w='100%' align='right'>
        <Center>
            <HStack>
                <a href='#' target='_blank'><Image src={Twitter.src} alt='Twitter' w={5}/></a>
                <a href='#' target='_blank'><Image src={Discord.src} alt='Discord' w={5}/></a>
                <a href='#' target='_blank'><Image src={Website.src} alt='Website' w={5}/></a>

            </HStack></Center>
        </GridItem>

    </Grid>
     </Container>
 </>
  )
}

export default Footer