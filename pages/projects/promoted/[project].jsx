import React, { useEffect, useState } from 'react'

import {
Button, Grid, GridItem, Link, Text, 
Container, HStack, Image, Box,
TableContainer, Table, Thead, Tr, Th, Tbody, Td,
NumberInput, NumberInputField, NumberInputStepper,
NumberIncrementStepper,NumberDecrementStepper,
VStack, useDisclosure, Modal, ModalOverlay,
ModalContent, ModalHeader, ModalFooter,
ModalBody, ModalCloseButton, Input
} from '@chakra-ui/react'

import Twitter from '../../../assets/icons/twitter.png'
import Discord from '../../../assets/icons/discord.png'
import Website from '../../../assets/icons/click.png'

import { projects } from '../../../data'

import { networkParams } from "../../../components/Utils/Networks";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { providerOptions } from "../../../components/Utils/providerOptions";

// Fetching data from the JSON file
export const getStaticProps = async ({ params }) => {
  let endBlock = '0';
  let startBlock = '1';

  const providers = ethers.providers;

  const _provider = providers.getDefaultProvider('matic');

  await _provider.getBlockNumber().then(function(blockNumber) {
   endBlock = blockNumber;
   startBlock = endBlock - 1000000;
});

    const obj = projects.filter((p) => p.address.toString() === params.project);

    const key = 'ckey_148ca1425bb2412cb4c98bf085f';
    const baseURL = 'https://api.covalenthq.com/v1'
    const chainId = '137'
    const address = obj[0].address;

    const url = new URL(`${baseURL}/${chainId}/events/address/${address}/?starting-block=${startBlock}&ending-block=29793247&key=${key}`);
    const response = await fetch(url);
    const result = await response.json();
    const data = result.data.items;

  
    const trs = data.filter((t) => t.decoded.name.toString().includes(""));
    // const _trs = trs.filter((e,k) => k < 50);
    const __trs = data.sort((a, b) => (b.block_height - a.block_height))
    
    return {
        props: {name: obj[0].name,
        description: obj[0].type,
        image: obj[0].link,
        twitter: obj[0].twitter,
        website: obj[0].website,
        discord: obj[0].discord,
        transactions: __trs},
          }
}

export async function getStaticPaths() {
   const paths = projects.map((d) => {
     return {
       params: {project: d.address.toString()}
     }
   })

   return {
       paths,
       fallback: false
     }
   }


const Project = function (props) {
  // console.log(props.transactions)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [ownerAddress, setOwnerAddress] = useState('0x4E8892C244CF98b3e59b709b4c81553ef8FeF5cF');

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
    
   <><Container maxW={'100%'} align='center' py={4} bgColor='#e0e0eb'> 
       {/* {account === ownerAddress ? ( */}
        <Box bgGradient='linear(to-r, #141E30, #243B55)' 
          py='3' 
          mb={'4'} 
          borderRadius='10'
          color={'white'}
          boxShadow='md' onClick={onOpen}>
<Text as={'b'}><Link onClick={onOpen}>Manage Collection</Link></Text></Box>
{/* ) : null} */}

     <Grid
  templateRows='repeat(2, 1fr)'
  templateColumns='repeat(5, 1fr)'
  gap={4} 
  color='white'
>
    <GridItem colSpan={['5', '5', '4', '4', '4']} height={['400', '400', '275', '300', '335']}
    bgGradient='linear(to-r, #141E30, #243B55)' 
    bgPosition={'center'}
    bgSize={['400%', '200%', '200%', '200%', '100%']}
    borderRadius='lg'
    bgImg={props.image}
    bgRepeat="no-repeat"
    p={6} />

    <GridItem rowSpan={['20', '20', '2', '2', '2']} 
    colSpan={['5', '5', '1', '1', '1']} 
    bgGradient='linear(to-r, #141E30, #243B55)'
    borderWidth='1px' 
    borderRadius='lg'
    p={6} maxH='700' overflowY={'scroll'}
    >

    <Text><b>Transactions</b></Text>
        <Text>Last Recorded Transactions</Text>
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
        <Td><Link href={`https://www.polygonscan.com/tx/${_tx}`} target='_blank'>
        <Button width={20} height={5} bg='black'
        _hover={{bgColor: "grey", color: "white"}}><Text fontSize={'10px'}>View</Text></Button>
        </Link></Td>
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
                <a href={props.twitter} target='_blank' rel="noreferrer" ><Image src={Twitter.src} alt='Twitter' w={3}/></a>
                <Text>|</Text>
                <a href={props.discord} target='_blank' rel="noreferrer" ><Image src={Discord.src} alt='Discord' w={3}/></a>
                <Text>|</Text>
                <a href={props.website} target='_blank' rel="noreferrer" ><Image src={Website.src} alt='Website' w={3}/></a>
                </HStack>
                </Box>
            </HStack>
        <Text noOfLines={['5', '5', '5', '7', '9']} fontSize={15} textAlign='left'>{props.description}</Text>

    </GridItem>


    <GridItem colSpan={['5', '5', '2', '2', '2']}  
    bgGradient='linear(to-r, #141E30, #243B55)' 
    borderWidth='1px' 
    borderRadius='lg' align={'center'}>

{!account ? (<><VStack py={'17%'}><Button
              onClick={connectWallet}
              variant={'solid'}
              size='lg'
              bgGradient='linear(to-l, #7928CA, #FF0080)'
              color='white'
              maxW={'100%'}
              fontSize={['12px', null, null, null, '100%']}
              _hover={{bgGradient: "linear(to-l, #8a32e3, #FF0080)", color: "white"}}
               borderRadius={40}
               >
             <b>Connect Your Wallet & Mint</b>
            </Button></VStack></>): (<><VStack py={'7.5%'} gap={3} justify={'center'}>
            <Text fontSize={'2xl'}><b>Mint Your {props.name} NFT</b></Text>
            <NumberInput step={1} defaultValue={0} min={0} 
                focusBorderColor = "white"
                textColor={'white'} size='lg' maxWidth={'50%'}>
             <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Button
              onClick={connectWallet}
              variant={'solid'}
              size='lg'
              bgGradient='linear(to-l, #7928CA, #FF0080)'
              color='white'
              maxW={'100%'}
              mt={6}
              fontSize={['12px', null, null, null, '100%']}
              _hover={{bgGradient: "linear(to-l, #8a32e3, #FF0080)", color: "white"}}
               borderRadius={10}
               >
             <b>Mint Now!</b>
            </Button></VStack></>)}
    </GridItem>
</Grid>
</Container>

<Modal isOpen={isOpen} onClose={onClose} isCentered  size={'2xl'} >
        <ModalOverlay />
        <ModalContent bgColor='#ededed'>
          <ModalHeader>Manage Your Collection</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid templateColumns='repeat(2, 1fr)' gap={6}>

              <GridItem w='100%'>
                <Text mt='30px'><b>Pause Mint?</b></Text>
                <Input placeholder='Yes/No' mt='10px' bg='white' />
              </GridItem>

              <GridItem w='100%'>
                <Text mt='30px'><b>Batch Mint (1 NFT)</b></Text>
                <Input placeholder='Address 1, Addres 2 ...' mt='10px' bg='white' />
              </GridItem>

              <GridItem w='100%'>
                <Text mt='30px'><b>New Base URI</b></Text>
                <Input placeholder='Pinata IPFS Link' mt='10px' bg='white' />
              </GridItem>

              <GridItem w='100%'>
                <Text mt='30px'><b>New Not-Revealed URI</b></Text>
                <Input placeholder='Pinata IPFS Link' mt='10px' bg='white' />
              </GridItem>

              <GridItem w='100%'>
                <Text mt='30px'><b>Block Addresses</b></Text>
                <Input placeholder='Address 1, Addres 2 ...' mt='10px' bg='white' />
              </GridItem>

              <GridItem w='100%'>
                <Text mt='30px'><b>Mint Price (MATIC)</b></Text>
                <Input placeholder='200' mt='10px' bg='white' />
              </GridItem>

              <GridItem w='100%'>
                <Text mt='30px'><b>Transfer Ownership</b></Text>
                <Input placeholder='New Owner: Address' mt='10px' bg='white' />
              </GridItem>

              <GridItem w='100%'>
                <Text mt='30px'><b>Banner Image</b></Text>
                <Input placeholder='www.example.com/image.png' mt='10px' bg='white' />
              </GridItem>

            </Grid>
          </ModalBody>
          <ModalFooter>
          <Button onClick={onClose} width={'20%'} bgGradient='linear(to-l, #7928CA, #FF0080)' color={'white'} _hover={{bgGradient: "linear(to-l, #8a32e3, #FF0080)", color: "white"}}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
   </>
  )
}

export default Project