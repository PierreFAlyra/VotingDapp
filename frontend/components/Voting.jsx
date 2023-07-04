"use client"
import { Flex, Text, Heading, Spacer } from "@chakra-ui/react"
import { useAccount } from 'wagmi'
import { useState, useEffect } from 'react'
import { createPublicClient, http, parseAbiItem } from 'viem'
import { localhost, goerli } from 'viem/chains'
import { readContract } from '@wagmi/core'
import { votingAddress, votingAbi } from "@/components/voting/utils"

import WorkflowStatus from "@/components/voting/WorkflowStatus"

const Voting = () => {

  const [owner, setOwner] = useState(null)
  const [isOwner, setIsOwner] = useState(false)
  const [voters, setVoters] = useState([]);
  const [isVoter, setIsVoter] = useState(false);
  const [proposals, setProposals] = useState([]);
  const { isConnected, address } = useAccount()

  const client = createPublicClient({
    chain: goerli,
    transport: http(),
  })
  
  const getVoterEvents = async () => {
    const voterEvents = await client.getLogs({
      event: parseAbiItem('event VoterRegistered(address voterAddress)'),
      fromBlock: 0n,
    })
    setVoters(voterEvents.map(
      voterEvent => ({address: voterEvent.args.voterAddress})))
  }

  const getProposalEvents = async () => {
    const proposalEvents = await client.getLogs({
      event: parseAbiItem('event ProposalRegistered(uint proposalId)'),
      fromBlock: 0n,
    })
    setProposals(proposalEvents.map(
      proposalEvent => (proposalEvent.args.proposalId.toString())))
  }
  
  useEffect(() => {
    const getOwner = async () => {
      try {
        const data = await readContract({
          address: votingAddress,
          abi: votingAbi,
          functionName: "owner"
        });
        return data;
      } catch (err) {
        console.log(err.message)
      }
    }

    const updateOwner = async () => {
      setOwner(await getOwner())
    }

    updateOwner()
    setIsOwner((address === owner))
    getVoterEvents()
    getProposalEvents()
  }, [isConnected])

  useEffect(() => {
    const voter = voters.some(voter => voter.address === address)
    setIsVoter(voter)
  })

  return (
    <Flex p="2rem" width="100%" height="85vh" alignItems="center">
      {isConnected ? (
        <Flex direction="column" width="100%">
          <WorkflowStatus
            isOwner={isOwner}
            isVoter={isVoter}
            getVoterEvents={getVoterEvents}
            getProposalEvents={getProposalEvents}
          />
          <Flex justifyContent="space-between">
            <Flex direction="column" width="100%" alignItems="center" borderRadius='md' bg='whitesmoke'>
              <Heading size='md'>Voter Register</Heading>
              <ul>
                {voters.map((voter, index) => (
                  <li key={index}>{voter.address}</li>
                ))}
              </ul>
            </Flex>
            <Spacer />
            <Flex direction="column" width="100%" alignItems="center" borderRadius='md' bg='whitesmoke'>
              <Heading size='md'>Proposals</Heading>
              <ul>
                {proposals.map((proposal, index) => (
                  <li key={index}>{proposal}</li>
                ))}
              </ul>
            </Flex>
          </Flex>
        </Flex>
      ) : (
        <Flex p="2rem" justifyContent="center" alignItems="center" width="100%">
          <Text>Please connect your Wallet.</Text>
        </Flex>
      )}
    </Flex>
  )
}

export default Voting
