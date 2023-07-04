"use client"
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Flex } from '@chakra-ui/react'

const Layout = ({ children }) => {
  return (
    <Flex direction="column" h="100vh" justifyContent="center">
      <Header />
      {children}
      <Footer />
    </Flex>
  )
}

export default Layout
