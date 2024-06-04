import { WalletAdapterNetwork, WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider, useAnchorWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Button } from '@solana/wallet-adapter-react-ui/lib/types/Button';
import '../src/css/bootstrap.css'
import {
    GlowWalletAdapter,
    LedgerWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    SolletExtensionWalletAdapter,
    SolletWalletAdapter,
    TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import fs from "fs";
import React, { FC, ReactNode, useMemo, useCallback, useState } from 'react';
import idl from "./idl.json";
import { Provider } from '@project-serum/anchor';
import { Connection, clusterApiUrl } from '@solana/web3.js';
// import { actions, utils, programs, NodeWallet, Connection} from '@metaplex/js';
require('./App.css');
require('@solana/wallet-adapter-react-ui/styles.css');
let thelamports = 0;
let theWallet = "9m5kFDqgpf7Ckzbox91RYcADqcmvxW4MmuNvroD5H2r9"
function getWallet(){
   
}
const App: FC = () => {
    return (
        <Context>
            <Content />
        </Context>
    );
};
export default App;
const Context: FC<{ children: ReactNode }> = ({ children }) => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Devnet;
    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
    // Only the wallets you configure here will be compiled into your application, and only the dependencies
    // of wallets that your users connect to will be loaded.
    const wallets = useMemo(
        () => [
            new LedgerWalletAdapter(),
            new PhantomWalletAdapter(),
            new GlowWalletAdapter(),
            new SlopeWalletAdapter(),
            new SolletExtensionWalletAdapter(),
            new SolletWalletAdapter(),
            new SolflareWalletAdapter({ network }),
            new TorusWalletAdapter(),
        ],
        [network]
    );
  
    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};
const Content: FC = () => {
    function GetProvider() {
        const wallet = useAnchorWallet();
        if(!wallet) {
            return null;
        }
        const network = 'http://127.0.0.1:8899';
        const connection = new Connection(network, "processed");
        const provider = new Provider(
            connection, wallet, {"preflightCommitment": "processed"},
        );
        return provider;
    }
    return (
      
        <div className="App">
            <li><WalletMultiButton /></li>
        </div>
    );
};