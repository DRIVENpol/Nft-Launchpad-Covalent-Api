import React, { useEffect, useState } from 'react'
import { Text, Center, Grid, GridItem, Box, Container } from '@chakra-ui/react'

const MyNfts = () => {

  const [balance, setBalance] = useState(0);

  const APIKEY = 'ckey_148ca1425bb2412cb4c98bf085f';
  const baseURL = 'https://api.covalenthq.com/v1'
  const blockchainChainId = '1'
  const demoAddress = '0xae6ae4daa32d9b1Af31460573a8E075fDbb11ea8'
  
  async function getWalletBalance() {
      const url = new URL(`${baseURL}/${blockchainChainId}/address/${demoAddress}/balances_v2/?key=${APIKEY}`);
      const response = await fetch(url);
      const result = await response.json();
      const data = result.data;

      // Show ETH Balance of Address
      setBalance(data.items[data.items.length - 1].balance);
  }

  useEffect(() => {
    getWalletBalance();
  }, [])

  return (
    <Text my={200} mx={100}>{balance/10**18} ETH</Text>) 
}

export default MyNfts