"use client"
import './globals.css'
import { Inter } from 'next/font/google'

import '@rainbow-me/rainbowkit/styles.css';
import {  getDefaultWallets,  RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { goerli } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { ChakraProvider } from '@chakra-ui/react';

const { chains, publicClient } = configureChains([goerli], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: 'VotingDApp',
  projectId: '343b2052aaac644063b8aa68292db12e',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: false,
  connectors,
  publicClient
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>
            <ChakraProvider>
              {children}
            </ChakraProvider>
          </RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  )
}
