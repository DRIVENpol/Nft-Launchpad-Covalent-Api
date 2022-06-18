import React, { useState, useEffect } from 'react'

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

import { networkParams } from "./Utils/Networks";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { providerOptions } from "./Utils/providerOptions";



const Navbar = () => {

  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [account, setAccount] = useState();
  const [signature, setSignature] = useState("");
  const [isError, setError] = useState("");
  const [chainId, setChainId] = useState();
  const [network, setNetwork] = useState();
  const [message, setMessage] = useState("");
  const [signedMessage, setSignedMessage] = useState("");
  const [verified, setVerified] = useState();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const Link = ({ children, href }) => {
    const router = useRouter();

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


  const connectWallet = async () => {
    if (typeof window !== 'undefined'){
      try {
        const web3Modal = new Web3Modal({
          cacheProvider: true, // optional
          providerOptions // required
        });

        
        const provider = await web3Modal.connect();
        const library = new ethers.providers.Web3Provider(provider);
        const accounts = await library.listAccounts();
        const network = await library.getNetwork();
        setProvider(provider);
        setLibrary(library);
        if (accounts) setAccount(accounts[0]);
        setChainId(network.chainId);

      } catch (error) {
        setError(error);
      }
    }
   
  };

  const handleNetwork = (e) => {
    const id = e.target.value;
    setNetwork(Number(id));
  };

  const handleInput = (e) => {
    const msg = e.target.value;
    setMessage(msg);
  };

  const switchNetwork = async () => {
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(network) }]
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await library.provider.request({
            method: "wallet_addEthereumChain",
            params: [networkParams[toHex(network)]]
          });
        } catch (error) {
          setError(error);
        }
      }
    }
  };

  const signMessage = async () => {
    if (!library) return;
    try {
      const signature = await library.provider.request({
        method: "personal_sign",
        params: [message, account]
      });
      setSignedMessage(message);
      setSignature(signature);
    } catch (error) {
      setError(error);
    }
  };

  const verifyMessage = async () => {
    if (!library) return;
    try {
      const verify = await library.provider.request({
        method: "personal_ecRecover",
        params: [signedMessage, signature]
      });
      setVerified(verify === account.toLowerCase());
    } catch (error) {
      setError(error);
    }
  };

  const refreshState = () => {
      
    setAccount();
    setChainId();
    setNetwork("");
    setMessage("");
    setSignature("");
    setVerified(undefined);
   
  };

  const disconnect = async () => {
    const web3Modal = new Web3Modal({
      cacheProvider: true, // optional
      providerOptions // required
    });
    await web3Modal.clearCachedProvider();
    refreshState();
  };

  useEffect(() => {
    const web3Modal = new Web3Modal({
      cacheProvider: true, // optional
      providerOptions // required
    });
    if (web3Modal.cachedProvider) {
      connectWallet();
     
    }
  }, []);

  useEffect(() => {
      
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        console.log("accountsChanged", accounts);
        if (accounts) setAccount(accounts[0]);
      };

      const handleChainChanged = (_hexChainId) => {
        setChainId(_hexChainId);
      };

      const handleDisconnect = () => {
        console.log("disconnect", error);
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);

  useEffect(() => {
    if (window.ethereum){
      setProvider(new ethers.providers.Web3Provider(window.ethereum))
    } else {
      setProvider(providerOptions.walletconnect)
    }
}, []);


  return (
    <>
      <Box bgGradient='linear(to-r, #141E30, #243B55)' px={4} position="fixed" width='100%' top={0} zIndex={1}>
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
            <Box ml={10}><Link href='/'><Text fontSize='2xl'><b>NFT Minty</b></Text></Link></Box>
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
                            <Link href="/MyNfts">Create</Link>
                        </Button>
            </HStack>
          </HStack>
          <Flex alignItems={'center'} mr={20}>
            <Button onClick={connectWallet}
              variant={'solid'}
              size='sm'
              bgGradient='linear(to-l, #7928CA, #FF0080)'
              color='white'
              maxW={['75%', null, '100%', '100%', '100%']}
              ml="30px"
              fontSize={['12px', null, null, null, '100%']}
              _hover={{bgGradient: "linear(to-l, #8a32e3, #FF0080)", color: "white"}}
              display={{ base: 'none', md: 'flex' }} px={6} borderRadius={20}>
              Connect Your Wallet
            </Button>
          </Flex>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
            <Button colorScheme='blackAlpha'><Link href="/">Home</Link></Button>
            <Button colorScheme='blackAlpha'><Link href="/Collections">Explore</Link></Button>
            <Button colorScheme='blackAlpha'><Link href="/MyNfts">Create</Link></Button>
            <Button bgGradient='linear(to-l, #7928CA, #FF0080)' color={'white'} _hover={{bgGradient: "linear(to-l, #8a32e3, #FF0080)", color: "white"}}>
            <Link href="/CreateNft">Connect Your Wallet</Link></Button>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}

export default Navbar