"use client"
import { useState } from 'react'
import { Flex, Spacer, Box, Textarea, Button, Text } from "@chakra-ui/react"
import { prepareWriteContract, writeContract } from '@wagmi/core'
import { votingAddress, votingAbi } from "@/components/voting/utils"

const Proposal = ({ workflowStatusId, isVoter, getProposalEvents, btnColor }) => {

  const [string, setString] = useState(null)

  const addProposal = async () => {
    try {
      const { request } = await prepareWriteContract({
        address: votingAddress,
        abi: votingAbi,
        functionName: "addProposal",
        args: [string]
      });
      const { hash } = await writeContract(request);
      getProposalEvents()
      return hash;
    } catch (err) {
      console.log(err.message)
    }      
  }

  const handleProposal = () => {
    if (workflowStatusId === 1) {
      if (isVoter)
        return (
          <>
            <Textarea
              onChange={e => setString(e.target.value)}
              placeholder="Write your proposal here."
            />
            <Button onClick={() => addProposal()} colorScheme={btnColor}>
              Add Proposal
            </Button>
          </>
        )
      else
        return (
          <Text>
            You are not register as a voter.
          </Text>
        )
    }
  }

  return (
    <>
      {handleProposal()}
    </>
  )
      
}

export default Proposal
