import WalletConnect from "@walletconnect/web3-provider";

export const providerOptions = {
  walletconnect: {
    package: WalletConnect, // required
    options: {
      infuraId:"3be75b2217884d8d85a91da35b3b7a4f" // required
    }
  }
};
