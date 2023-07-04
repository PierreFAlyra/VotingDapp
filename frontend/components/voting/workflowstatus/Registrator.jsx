"use client"
import { useState } from 'react'
import { Flex, Input, Button, Text } from "@chakra-ui/react"
import { prepareWriteContract, writeContract } from '@wagmi/core'
import { votingAddress, votingAbi } from "@/components/voting/utils"

const Registrator = ({ workflowStatusId, isOwner, getVoterEvents, btnColor }) => {

  const [address, setAddress] = useState(null)
  
  const addVoter = async () => {
    try {
      const { request } = await prepareWriteContract({
        address: votingAddress,
        abi: votingAbi,
        functionName: "addVoter",
        args: [address]
      });
      const { hash } = await writeContract(request);
      getVoterEvents()
      return hash;
    } catch (err) {
      console.log(err.message)
    }      
  }

  const handleRegistration = () => {
    if (workflowStatusId === 0) {
      if (isOwner)
        return (
          <>
            <Input
              mr="1rem"
              onChange={e => setAddress(e.target.value)}
              placeholder="Voter public address..."
            />
            <Button onClick={() => addVoter()} colorScheme={btnColor}>
              Add Voter
            </Button>
          </>
        )
      else
        return (
          <Text>
            You are not the owner of the contract.
          </Text>
        )
    }
  }

  return (
    <>
      {handleRegistration()}
    </>
  )
}

export default Registrator
