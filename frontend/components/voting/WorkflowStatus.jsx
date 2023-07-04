"use client"
import { useState, useEffect } from 'react'
import {
  Button,
  Flex,
  Spacer,
  Stack,
  Step,
  StepIcon,
  StepIndicator,
  StepSeparator,
  StepStatus,
  Stepper,
  Text,
} from '@chakra-ui/react'

import { prepareWriteContract, writeContract, readContract } from '@wagmi/core'

import {
  votingAddress,
  votingAbi,
  adminBtnColor,
  voterBtnColor
} from "@/components/voting/utils"

import Registrator from "@/components/voting/workflowstatus/Registrator"
import Proposal from "@/components/voting/workflowstatus/Proposal"
import Vote from "@/components/voting/workflowstatus/Vote"
import TallyVote from "@/components/voting/workflowstatus/TallyVote"

const WorkflowStatus = ( { isOwner, isVoter, getVoterEvents, getProposalEvents } ) => {
  
  const steps = [
    { title: 'Voter Registration', funcName: 'startProposalsRegistering'},
    { title: 'Proposal Registration', funcName: 'endProposalsRegistering'},
    { title: 'Start Voting Session', funcName: 'startVotingSession'},
    { title: 'Voting session', funcName: 'endVotingSession'},
    { title: 'Tally Votes', funcName: 'tallyVotes'},
    { title: 'Winning Proposal', funcName: null},
  ]

  const [workflowStatusId, setworkflowStatusId] = useState(0)

  useEffect(() => {
    updateWorkflowStatus()
  }, [])

  const updateWorkflowStatus = async () => {
    const workflowStatus = await getWorkflowStatus()
    setworkflowStatusId(workflowStatus)
  }

  const getWorkflowStatus = async() => {
    try {
      const data = await readContract({
        address: votingAddress,
        abi: votingAbi,
        functionName: "workflowStatus"
      });
      return data;
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleOnClick = async () => {
    try {
      const { request } = await prepareWriteContract({
        address: votingAddress,
        abi: votingAbi,
        functionName: steps[workflowStatusId].funcName,
      });
      const { hash } = await writeContract(request)
      updateWorkflowStatus()
      return hash;
    } catch (err) {
      console.log(err.message)
    }
  }

  const adminBtn = () => {
    if (isOwner && workflowStatusId < 5)
      return (
        <Button onClick={() => handleOnClick()} colorScheme={adminBtnColor}>
          Next Step
        </Button>
      )
    else
      return null
  }

  return (
    <Stack>
      <Stepper size='sm' index={workflowStatusId} gap='0'>
        {steps.map((step, index) => (
          <Step key={index} gap='0'>
            <StepIndicator>
              <StepStatus complete={<StepIcon />} />
            </StepIndicator>
            <StepSeparator _horizontal={{ ml: '0' }} />
          </Step>
        ))}
      </Stepper>
      <Flex>
        <Text>
          Step {workflowStatusId + 1}: {steps[workflowStatusId].title} 
        </Text>
        <Spacer />
        {adminBtn()}
      </Flex>
      <Flex p="2rem" width="100%" justifyContent="center" alignItems="center">
        <Registrator
          workflowStatusId={workflowStatusId}
          isOwner={isOwner}
          getVoterEvents={getVoterEvents}
          btnColor={adminBtnColor}
        />
        <Proposal
          workflowStatusId={workflowStatusId}
          isVoter={isVoter}
          getProposalEvents={getProposalEvents}
          btnColor={voterBtnColor}
        />
        <Vote
          workflowStatusId={workflowStatusId}
          isVoter={isVoter}
          btnColor={voterBtnColor}
        />
        <TallyVote
          workflowStatusId={workflowStatusId}
          isVoter={isVoter}
        />
      </Flex>
    </Stack>
  )
}

export default WorkflowStatus
