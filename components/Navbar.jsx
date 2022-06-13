import React from 'react'

import { useRouter } from 'next/router'

import {
  Box,
  Flex,
  Image,
  HStack,
  IconButton,
  Button,
  Stack, Text
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useDisclosure } from '@chakra-ui/react'



const Navbar = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();

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
      <Box bgGradient='linear(to-r, #141E30, #243B55)' px={4} position="fixed" width='100%' zIndex={'1'}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'} color='white'>
          <IconButton
            size={'sm'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
            color='black'
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box ml={10}><Link href='/'><Text>Logo</Text></Link></Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              
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
          </HStack>
          <Flex alignItems={'center'} mr={20}>
            <Button
              variant={'solid'}
              size='sm'
              bgGradient='linear(to-l, #7928CA, #FF0080)'
              color='white'
              maxW={['75%', null, '100%', '100%', '100%']}
              ml="30px"
              fontSize={['12px', null, null, null, '100%']}
              _hover={{bgGradient: "linear(to-l, #8a32e3, #FF0080)", color: "white"}}
              display={{ base: 'none', md: 'flex' }} px={6}>
              <Link href='/CreateNft'>
              + Create Collection
              </Link>
            </Button>
          </Flex>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
            <Button colorScheme='blackAlpha'><Link href="/">Home</Link></Button>
            <Button colorScheme='blackAlpha'><Link href="/Collections">Explore</Link></Button>
            <Button colorScheme='blackAlpha'><Link href="/MyNfts">My NFTs</Link></Button>
            <Button bgGradient='linear(to-l, #7928CA, #FF0080)' color={'white'} _hover={{bgGradient: "linear(to-l, #8a32e3, #FF0080)", color: "white"}}>
            <Link href="/CreateNft">+ Create NFT Collection</Link></Button>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}

export default Navbar