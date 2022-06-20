import React, {useState} from 'react'

import {
 Input, Text, Stack, Button, Container, Switch
} from '@chakra-ui/react'

const CreateNft = () => {
  
const [revealed, setRevealed] = useState('No: By Default');

const isRevealedCollection = () => {
  if(revealed == 'No: By Default') {
    setRevealed('Yes, I want the reveal function.');
  } else {
    setRevealed('No: By Default')
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
           <Input placeholder='My NFTs' mt='10px' />

           <br />
           <Text mt='30px'><b>Collection Symbol</b></Text>
           <Input placeholder='$MNFT' mt='10px'/>

            <br />
           <Text mt='30px'><b>Total Supply</b></Text>
           <Input placeholder='1000' mt='10px' />

           <br />
           <Text mt='30px'><b>Max Amount Per Wallet</b></Text>
           <Input placeholder='3' mt='10px' />

           <br />
           <Text mt='30px'><b>Mint Price [MATIC]</b></Text>
           <Input placeholder='100' mt='10px' />

            <br />
           <Text mt='30px'><b>Base URI</b></Text>
           <Input placeholder='Pinata IPFS Link' mt='10px' />

           <br />
           <Text mt={5} mb={2}>Enable Reveal Function? [{revealed}]</Text>
           <Switch size='lg' onChange={isRevealedCollection}/>


           {revealed === 'Yes, I want the reveal function.' ? (<>
            <Text mt='30px'><b>Not Revealed URI</b></Text>
           <Input placeholder='Pinata IPFS Link' mt='10px' />
           </>): null}
              
           <br />
            <Button
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
            </Button></Container>
   </>
  )
}

export default CreateNft