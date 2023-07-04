"use client"
import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const Header = () => {
  return (
    <Flex justifyContent="space-between" alignItems="center" p="2rem">
      <Text>Voting Dapp</Text>
      <ConnectButton />
    </Flex>
  )
}

export default Header 
