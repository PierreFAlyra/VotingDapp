"use client"
import { useState, useEffect } from 'react'
import { Text, Button } from '@chakra-ui/react'
import { readContract } from '@wagmi/core'
import { votingAddress, votingAbi } from "@/components/voting/utils"

const TallyVote = ( { workflowStatusId, isVoter } ) => {

  const [winningProposalId, setWinningProposalId] = useState(0)

  useEffect(() => {
    updateWinningProposalId()
  })

  const updateWinningProposalId = async () => {
    const interWinningProposalId = await getWinningProposalId()
    setWinningProposalId(interWinningProposalId)
  }

  const getWinningProposalId = async () => {
    try {
      const data = await readContract({
        address: votingAddress,
        abi: votingAbi,
        functionName: "winningProposalID"
      });
      return data;
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleTallyVote = () => {
    if (workflowStatusId === 5) {
      return (
        <>
          <Text>
            The winner is the proposal ID : {winningProposalId.toString()}
          </Text>
        </>
        )
    }
    return null
  }

  return (
    <>
      {handleTallyVote()}
    </>
  )
}

export default TallyVote
