import React from 'react'

import { 
    Box, Text,
    Grid, GridItem,
    Button,

    } from '@chakra-ui/react'
import { HStack } from '@chakra-ui/react'

import { useRouter } from 'next/router'

const Navbar = () => {

    const Link = ({ children, href }) => {
        const router = useRouter()
        return (
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              // typically you want to use `next/link` for this usecase
              // but this example shows how you can also access the router
              // and use it manually
              router.push(href)
            }}
          >
            {children}
          </a>
        )
      }


    return (
        <>
            <Box bgGradient='linear(to-r, #141E30, #243B55)' w='100%' color='white'>

            <Grid templateColumns='repeat(3, 1fr)' gap={6} py={4} px={4}>

                <GridItem w='100%' align='center' display='flex' justifyContent='center'>
                <Link href="/"><Text fontSize='2xl' >Logo</Text></Link>
                </GridItem>


                <GridItem w='100%' align='center' display='flex' justifyContent='center'>
                    <HStack spacing='24px'>
                        <Button _hover={{background: "#243B55", color: "white"}} bgColor='transparent'>
                        <Link href="/">Home</Link>
                        </Button>

                        <Button _hover={{background: "#243B55", color: "white"}} bgColor='transparent'>
                            <Link href="/Collections">Explore</Link>
                        </Button>

                        <Button _hover={{background: "#243B55", color: "white"}} bgColor='transparent'>
                            <Link href="/MyNfts">My NFTs</Link>
                        </Button>
                    </HStack>
                </GridItem>


                <GridItem w='100%' align='center' display='flex' justifyContent='center' mt={1}>
                <Button bgGradient='linear(to-l, #7928CA, #FF0080)' size='sm'>
                    <Link href="/CreateNft">+ Create NFT Collection</Link>
                </Button>
                </GridItem>

            </Grid>
                
            </Box>
        </>
  )
}

export default Navbar