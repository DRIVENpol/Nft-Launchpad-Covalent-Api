import React, {useState, useEffect} from 'react'

import { networkParams } from "../components/Utils/Networks";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { providerOptions } from "../components/Utils/providerOptions";


import {
 Input, Text, Button, Container, Switch, Alert, AlertIcon, Textarea
} from '@chakra-ui/react'

const CreateNft = () => {
  
const [revealed, setRevealed] = useState('No: By Default');
const [isRevealed, setIsRevealed] = useState(false);

// const factoryAddress = "0x152375892E4a70C44f637bf01721120386A73CF9"; With Fee
const factoryAddress = "0xC3a0Db8dc25E9Bee442124bf4D3d03f2F96AE0Cb"; // Without Fee - for testing

const [nftDetails, setNftDetails] = useState({
  tokenName: '',
  tokenSymbol: '',
  tokenBanner: '',
  tokenSupply: 0,
  simpleUri: '',
  notRevealedUri: '',
  notRevealed: false,
  price: 0,
  description: '',
  website: '',
  twitter: '',
  discord: '',
 });

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

const [buttonLoading, setButtonLoading] = useState(false);
const [isNotif, setIsNotif] = useState(false);

// Manipulate notifications
const manipulateNotif = async() => {
  setIsNotif(true);
  await sleep(50000);
  setIsNotif(false);
}

// OnChange Handlers
const nameChangeHandler = (event) => {
  setNftDetails(() => {
    return {...nftDetails, tokenName: event.target.value}
   });
}

const symbolChangeHandler = (event) => {
  setNftDetails(() => {
    return {...nftDetails, tokenSymbol: event.target.value}
   });
}

const bannerChangeHandler = (event) => {
  setNftDetails(() => {
    return {...nftDetails, tokenBanner: event.target.value}
   });
}

const supplyChangeHandler = (event) => {
  setNftDetails(() => {
    return {...nftDetails, tokenSupply: event.target.value}
   });
}

const simpleUriChangeHandler = (event) => {
  setNftDetails(() => {
    return {...nftDetails, simpleUri: event.target.value}
   });
}

const notRevealedUriChangeHandler = (event) => {
  setNftDetails(() => {
    return {...nftDetails, notRevealedUri: event.target.value}
   });
}

// const revealedChangeHandler = (event) => {
//   setNftDetails(() => {
//     return {...nftDetails, notRevealed: event.target.value}
//    });
// }

const priceChangeHandler = (event) => {
  setNftDetails(() => {
    return {...nftDetails, price: event.target.value}
   });
}

const descriptionChangeHandler = (event) => {
  setNftDetails(() => {
    return {...nftDetails, description: event.target.value}
   });
}

const websiteChangeHandler = (event) => {
  setNftDetails(() => {
    return {...nftDetails, website: event.target.value}
   });
}

const twitterChangeHandler = (event) => {
  setNftDetails(() => {
    return {...nftDetails, twitter: event.target.value}
   });
}

const discordChangeHandler = (event) => {
  setNftDetails(() => {
    return {...nftDetails, discord: event.target.value}
   });
}

// const maxPerWalletChangeHandler = (event) => {
//   setNftDetails(() => {
//     return {...nftDetails, maxPerWallet: event.target.value}
//    });
// }

const createCollection = async () => {
    if (typeof window !== 'undefined'){
      try {
        
        const { ethereum } = window;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        setProvider(provider);
        setLibrary(library);

        const abi = ["function createCollection(string memory _name, string memory _symbol, string memory _cBanner, string memory _initBaseURI, string memory _initNotRevealedUri, uint256 _fee, uint256 _maxSupply, bool _revealed, string memory _description, string memory _website, string memory _twitterLink, string memory _discordLink) public"]
        const connectedContract = new ethers.Contract(factoryAddress, abi, signer);
        setError("");
        let _createNft = await connectedContract.createCollection(
          nftDetails.tokenName, 
          nftDetails.tokenSymbol, 
          nftDetails.tokenBanner, 
          nftDetails.simpleUri,
          nftDetails.notRevealedUri,
          nftDetails.price,
          nftDetails.tokenSupply,
          isRevealed,
          nftDetails.description,
          nftDetails.website,
          nftDetails.twitter,
          nftDetails.discord,
          {gasLimit:6000000});

          setButtonLoading(true);
          await _createNft.wait();
          setButtonLoading(false);
          manipulateNotif();

        console.log(_createNft);
        console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${_createNft.hash}`);
        // setTransactionNft(`https://rinkeby.etherscan.io/tx/${_createNft.hash}`);


      } catch (error) {
        setError(error);
      }
    }
   
}

// Delay
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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

const isRevealedCollection = () => {
  if(revealed == 'No: By Default') {

    setRevealed('Yes, I want the reveal function.');
    setIsRevealed(false);

  } else {

    setRevealed('No: By Default');
    setIsRevealed(true);

  }
}

  return (
   <><Container py={20}>
   <Text fontSize='3xl' ><b>Create Your NFT Collection</b></Text>
   <Text mb={5}>
          Fast and Easy with full access to your smart contract using our integrated
          admin dashboard!
        </Text>
           <Text><b>Collection Name</b></Text>
           <Input placeholder='My NFTs' mt='10px' onChange={nameChangeHandler} />

           <br />
           <Text mt='30px'><b>Collection Symbol</b></Text>
           <Input placeholder='$MNFT' mt='10px' onChange={symbolChangeHandler} />

           <br />
           <Text mt='30px'><b>Description</b></Text>
           <Textarea placeholder='Description' mt='10px' onChange={descriptionChangeHandler} />

           <br />
           <Text mt='30px'><b>Website</b></Text>
           <Input placeholder='HTTPS://' mt='10px' onChange={websiteChangeHandler} />

           <br />
           <Text mt='30px'><b>Twitter</b></Text>
           <Input placeholder='HTTPS://' mt='10px' onChange={twitterChangeHandler} />

           <br />
           <Text mt='30px'><b>Discord</b></Text>
           <Input placeholder='HTTPS://' mt='10px' onChange={discordChangeHandler} />

           <br />
           <Text mt='30px'><b>Banner</b></Text>
           <Input placeholder='Link' mt='10px' onChange={bannerChangeHandler} />


            <br />
           <Text mt='30px'><b>Total Supply</b></Text>
           <Input placeholder='1000' mt='10px' onChange={supplyChangeHandler} />

           {/* <br />
           <Text mt='30px'><b>Max Amount Per Wallet</b></Text>
           <Input placeholder='3' mt='10px' onChange={maxPerWalletChangeHandler} /> */}

           <br />
           <Text mt='30px'><b>Mint Price [MATIC]</b></Text>
           <Input placeholder='100' mt='10px' onChange={priceChangeHandler} />

            <br />
           <Text mt='30px'><b>Base URI</b></Text>
           <Input placeholder='Pinata IPFS Link' mt='10px' onChange={simpleUriChangeHandler} />

           <br />
           <Text mt={5} mb={2}>Enable Reveal Function? [{revealed}]</Text>
           <Switch size='lg' onChange={isRevealedCollection} />


           {revealed === 'Yes, I want the reveal function.' ? (<>
            <Text mt='30px'><b>Not Revealed URI</b></Text>
           <Input placeholder='Pinata IPFS Link' mt='10px' onChange={notRevealedUriChangeHandler} />
           </>): null}
              
           <br />
           {account ? (<>
            {buttonLoading === true ? (<><Button
              isLoading
              loadingText='Creating...'
              variant={'solid'}
              mt='5'
              size='lg'
              bgGradient='linear(to-l, #7928CA, #FF0080)'
              color='white'
              maxW={'100%'}
              fontSize={['12px', null, null, null, '100%']}
              _hover={{bgGradient: "linear(to-l, #8a32e3, #FF0080)", color: "white"}}
               borderRadius={10}
               >
             <b>Create Collection</b>
            </Button></>) : (<><Button
              onClick={createCollection}
              variant={'solid'}
              mt='5'
              size='lg'
              bgGradient='linear(to-l, #7928CA, #FF0080)'
              color='white'
              maxW={'100%'}
              fontSize={['12px', null, null, null, '100%']}
              _hover={{bgGradient: "linear(to-l, #8a32e3, #FF0080)", color: "white"}}
               borderRadius={10}
               >
             <b>Create Collection</b>
            </Button></>)}</>):
           (<><Button
           onClick={connectWallet}
              variant={'solid'}
              mt='5'
              size='lg'
              bgGradient='linear(to-l, #7928CA, #FF0080)'
              color='white'
              maxW={'100%'}
              fontSize={['12px', null, null, null, '100%']}
              _hover={{bgGradient: "linear(to-l, #8a32e3, #FF0080)", color: "white"}}
               borderRadius={10}
               >
             <b>Connect Your Wallet</b>
            </Button></>)
            }
            {isNotif ? (<Alert mt='10' status='success' borderRadius='15' maxW={'100%'}>
              <AlertIcon  mr='10' />
              <b>Congrats! </b>&nbsp; You created your collection!
            </Alert>) : null}

            {isError != '' ? (<Alert mt='10' status='error' borderRadius='15'>
              <AlertIcon />
              <b>Error! </b>&nbsp; {isError.message}
            </Alert>) : null}
            </Container>
   </>
  )
}

export default CreateNft