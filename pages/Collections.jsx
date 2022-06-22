import React, { useState, useEffect } from "react"

import { networkParams } from "../components/Utils/Networks";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { providerOptions } from "../components/Utils/providerOptions";


import { Text, Center, Grid, GridItem, Box, Container, VStack } from '@chakra-ui/react'
import { Stack, Button, HStack, Image, Input } from '@chakra-ui/react'

import { projects } from '../data'

import Twitter from '../assets/icons/twitter.png'
import Discord from '../assets/icons/discord.png'
import Website from '../assets/icons/click.png'

import Link from 'next/link'

// import cAbi from "../contracts/abi/Factory.json";

const Collections = function ({obj}) {


  const [search, setSearch] = useState("");
  const searchResult = obj.filter((p) => (p.name.toString().includes(search.toString())
  || p.address.toString().includes(search.toString()))
  );

  // const factoryAddress = "0x152375892E4a70C44f637bf01721120386A73CF9"; With Fee
  const factoryAddress = "0xf297cE9874Dafd8c87FeF893878C142ED5bdA2e7"; // Without Fee - for testing

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

  const [cLength, setCLength] = useState(0);
  const [cAddresses, setCAddresses] = useState([]);

  const getCollectionLength = async () => {
        
        // const { ethereum } = window;
        const iProvider = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/3be75b2217884d8d85a91da35b3b7a4f");
        // const signer = provider.getSigner();

        // setProvider(provider);
        // setLibrary(library);

        const abi = ["function getLengthOfCollections() public view returns(uint256)"];
        const connectedContract = new ethers.Contract(factoryAddress, abi, iProvider);

        let _collectionLength = await connectedContract.getLengthOfCollections();
        let _cL = _collectionLength.toNumber();
        setCLength(_cL);

        let z = _cL - 1;

        for (let i = 0; i <= z; i++) {
          getCollectionAddress(i);          
        }
   
}

const getCollectionAddress = async (index) => {
      
      // const { ethereum } = window;
      const iProvider = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/3be75b2217884d8d85a91da35b3b7a4f");
      // const signer = provider.getSigner();

      // setProvider(provider);
      // setLibrary(library);

      const abi = ["function getColelctionProps(uint256 index) public view returns(address, string memory, string memory, string memory)"];
      const connectedContract = new ethers.Contract(factoryAddress, abi, iProvider);

      let _collectionAddress = await connectedContract.getColelctionProps(index);
      // let _cA = _collectionAddress;
      console.log(_collectionAddress);
      setCAddresses(oldArray => [...oldArray, _collectionAddress]);
      // cAddresses2.push()
 
}

useEffect(() => {
  getCollectionLength();
  console.log(cAddresses);
}, [])


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
      <Container maxW={'100%'} bg='white' color={'black'} pt='5%' pb='2%'>
        <Center>
        <Text fontSize={'ml'} mb={3} color='grey'>Search by name or address</Text></Center>
        <Center><Input onChange={(event) => {
          setSearch(event.target.value)
        }}maxWidth={['80%', '80%', '70%', '60%', '50%' ]} placeholder='Search...' mb={10} 
        borderRadius='40' borderColor={'#FF0080'} borderWidth='2px' />
        </Center>
        <Center>
        <Text fontSize='3xl' ><b>Featured Collections</b></Text>
        </Center>

        <Center> 
          <Text align='center'>
          Picked up by NFT Minty! DYOR!
          </Text>
        </Center><br/>

        <Center>
        <Grid templateColumns={['repeat(1, 1fr)', null, 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)', 'repeat(4, 1fr)']} gap={6} w='75%'>
          {obj && obj.map((project) => (
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
        {/* {account ? (<> */}
        {cAddresses && cAddresses.map((e) => (<>
<VStack><Text>{e[0]}</Text></VStack>
<VStack><Text>{e[1]}</Text></VStack>
<VStack><Text>{e[2]}</Text></VStack>
<VStack><Text>{e[3]}</Text></VStack>
</>))}
 {/* </>): ( <Button onClick={connectWallet}>Button</Button>)} */}
       

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
