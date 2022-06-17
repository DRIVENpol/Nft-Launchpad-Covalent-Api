import React, { useEffect, useState } from 'react'
import { Text, Center, Grid, GridItem, Box, Container } from '@chakra-ui/react'

const MyNfts = () => {

  const [transfers, setTransfers] = useState(0);

  const key = 'ckey_148ca1425bb2412cb4c98bf085f';
  const baseURL = 'https://api.covalenthq.com/v1'
  const chainId = '137'
  const address = '0x8a33e477F73D22960D850Ff61FD8C58b3B2E21b3'
  
  async function useAPI() {
      const url = new URL(`${baseURL}/${chainId}/events/address/${address}/?starting-block=28672470&ending-block=29672470&key=${key}`);
      const response = await fetch(url);
      const result = await response.json();
      const data = result.data;
      setTransfers(data.items);
      console.log(data.items);
      
  }


  useEffect(() => {
    useAPI();
  }, [])

  
  return (
    <> 
       {transfers && transfers.map((transfer) => {
         let _data = transfer.decoded.name;
         let _tx = transfer.tx_hash;
         if(_data === 'Transfer') {
           return (
             <>
             <Text>{_data} // {_tx}</Text>
             </>
             )
         }
       })}
    </>
  )
}

export default MyNfts