"use client"
import { useState } from 'react'
import { Flex, Input, Button, Text } from "@chakra-ui/react"
import { ethers } from "ethers"
import { prepareWriteContract, writeContract } from '@wagmi/core'
import { votingAddress, votingAbi } from "@/components/voting/utils"

const Vote = ({ workflowStatusId, isVoter, btnColor }) => {

  const [id, setId] = useState(null)

  const setVote = async () => {
    try {
      const { request } = await prepareWriteContract({
        address: votingAddress,
        abi: votingAbi,
        functionName: "setVote",
        args: [id]
      });
      const { hash } = await writeContract(request);
      return hash;
    } catch (err) {
      console.log(err.message)
    }      
  }

  const handleVote = () => {
    if (workflowStatusId === 3) {
      if (isVoter)
        return (
          <>
            <Input
              mr="1rem"
              onChange={e => setId(e.target.value)}
              placeholder="Proposal ID..."
            />
            <Button onClick={() => setVote()} colorScheme={btnColor}>
              Vote
            </Button>
          </>
        )          
      else
        return (
          <Text>
            You are not register.
          </Text>
        )
    }
  }

  return (
    <>
      {handleVote()}
    </>
  )
}

export default Vote
