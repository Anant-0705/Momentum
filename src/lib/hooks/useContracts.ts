/**
 * Custom React hooks for Momentum contract interactions
 * Provides easy-to-use interfaces for ContestFactory and Contest operations
 */

'use client'

import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'
import { useState, useCallback } from 'react'
import { 
  CONTEST_FACTORY_ABI, 
  CONTEST_ABI, 
  MOCK_USDC_ABI,
  formatUSDC,
  parseUSDC,
  type ContestInfo,
  type UserStakes,
  type FactoryStats
} from '../contracts'
import { 
  CONTEST_FACTORY_ADDRESS, 
  MOCK_USDC_ADDRESS,
  ADMIN_ADDRESS 
} from '../wagmi'

// ===== CONTEST FACTORY HOOKS =====

/**
 * Hook to get all contests from ContestFactory
 */
export function useAllContests() {
  const { data: contests, isLoading, error, refetch } = useReadContract({
    address: CONTEST_FACTORY_ADDRESS,
    abi: CONTEST_FACTORY_ABI,
    functionName: 'getAllContests',
  })

  return {
    contests: contests as readonly `0x${string}`[] | undefined,
    isLoading,
    error,
    refetch
  }
}

/**
 * Hook to get active contests only
 */
export function useActiveContests() {
  const { data: contests, isLoading, error, refetch } = useReadContract({
    address: CONTEST_FACTORY_ADDRESS,
    abi: CONTEST_FACTORY_ABI,
    functionName: 'getActiveContests',
  })

  return {
    contests: contests as readonly `0x${string}`[] | undefined,
    isLoading,
    error,
    refetch
  }
}

/**
 * Hook to get resolved contests only
 */
export function useResolvedContests() {
  const { data: contests, isLoading, error, refetch } = useReadContract({
    address: CONTEST_FACTORY_ADDRESS,
    abi: CONTEST_FACTORY_ABI,
    functionName: 'getResolvedContests',
  })

  return {
    contests: contests as readonly `0x${string}`[] | undefined,
    isLoading,
    error,
    refetch
  }
}

/**
 * Hook to get factory statistics
 */
export function useFactoryStats() {
  const { data, isLoading, error, refetch } = useReadContract({
    address: CONTEST_FACTORY_ADDRESS,
    abi: CONTEST_FACTORY_ABI,
    functionName: 'getFactoryStats',
  })

  const stats = data as readonly [bigint, bigint, bigint, bigint, bigint] | undefined

  return {
    stats: stats ? {
      totalContests: stats[0],
      activeContests: stats[1], 
      resolvedContests: stats[2],
      totalFeesCollected: stats[3],
      currentBalance: stats[4]
    } as FactoryStats : undefined,
    isLoading,
    error,
    refetch
  }
}

/**
 * Hook to create a new contest
 */
export function useCreateContest() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const createContest = useCallback((question: string, optionA: string, optionB: string) => {
    writeContract({
      address: CONTEST_FACTORY_ADDRESS,
      abi: CONTEST_FACTORY_ABI,
      functionName: 'createContest',
      args: [question, optionA, optionB],
    })
  }, [writeContract])

  return {
    createContest,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error
  }
}

// ===== INDIVIDUAL CONTEST HOOKS =====

/**
 * Hook to get basic contest information
 */
export function useContestInfo(contestAddress: `0x${string}` | undefined) {
  const { data, isLoading, error, refetch } = useReadContract({
    address: contestAddress,
    abi: CONTEST_ABI,
    functionName: 'getContestInfo',
    query: { enabled: !!contestAddress }
  })

  const contestInfo = data as readonly [string, string, string, bigint, boolean, number, bigint, bigint] | undefined

  return {
    contestInfo: contestInfo ? {
      question: contestInfo[0],
      optionA: contestInfo[1],
      optionB: contestInfo[2],
      endTime: contestInfo[3],
      isResolved: contestInfo[4],
      winningOption: contestInfo[5],
      totalOptionAStake: contestInfo[6],
      totalOptionBStake: contestInfo[7]
    } as ContestInfo : undefined,
    isLoading,
    error,
    refetch
  }
}

/**
 * Hook to get question text for a contest
 */
export function useContestQuestion(contestAddress: `0x${string}` | undefined) {
  const { data: question, isLoading, error } = useReadContract({
    address: contestAddress,
    abi: CONTEST_ABI,
    functionName: 'question',
    query: { enabled: !!contestAddress }
  })

  return { question: question as string | undefined, isLoading, error }
}

/**
 * Hook to get option A text
 */
export function useContestOptionA(contestAddress: `0x${string}` | undefined) {
  const { data: optionA, isLoading, error } = useReadContract({
    address: contestAddress,
    abi: CONTEST_ABI,
    functionName: 'optionA',
    query: { enabled: !!contestAddress }
  })

  return { optionA: optionA as string | undefined, isLoading, error }
}

/**
 * Hook to get option B text
 */
export function useContestOptionB(contestAddress: `0x${string}` | undefined) {
  const { data: optionB, isLoading, error } = useReadContract({
    address: contestAddress,
    abi: CONTEST_ABI,
    functionName: 'optionB',
    query: { enabled: !!contestAddress }
  })

  return { optionB: optionB as string | undefined, isLoading, error }
}

/**
 * Hook to get contest end time
 */
export function useContestEndTime(contestAddress: `0x${string}` | undefined) {
  const { data: endTime, isLoading, error } = useReadContract({
    address: contestAddress,
    abi: CONTEST_ABI,
    functionName: 'endTime',
    query: { enabled: !!contestAddress }
  })

  return { endTime: endTime as bigint | undefined, isLoading, error }
}

/**
 * Hook to check if contest is resolved
 */
export function useContestIsResolved(contestAddress: `0x${string}` | undefined) {
  const { data: isResolved, isLoading, error } = useReadContract({
    address: contestAddress,
    abi: CONTEST_ABI,
    functionName: 'isResolved',
    query: { enabled: !!contestAddress }
  })

  return { isResolved: isResolved as boolean | undefined, isLoading, error }
}

/**
 * Hook to get total stakes for both options
 */
export function useContestStakes(contestAddress: `0x${string}` | undefined) {
  const { data: totalOptionAStake, isLoading: loadingA } = useReadContract({
    address: contestAddress,
    abi: CONTEST_ABI,
    functionName: 'totalOptionAStake',
    query: { enabled: !!contestAddress }
  })

  const { data: totalOptionBStake, isLoading: loadingB } = useReadContract({
    address: contestAddress,
    abi: CONTEST_ABI,
    functionName: 'totalOptionBStake',
    query: { enabled: !!contestAddress }
  })

  return {
    totalOptionAStake: totalOptionAStake as bigint | undefined,
    totalOptionBStake: totalOptionBStake as bigint | undefined,
    isLoading: loadingA || loadingB
  }
}

/**
 * Hook to get user's stakes in a contest
 */
export function useUserStakes(contestAddress: `0x${string}` | undefined, userAddress: `0x${string}` | undefined) {
  const { data, isLoading, error, refetch } = useReadContract({
    address: contestAddress,
    abi: CONTEST_ABI,
    functionName: 'getUserStake',
    args: userAddress ? [userAddress] : undefined,
    query: { enabled: !!contestAddress && !!userAddress }
  })

  const userStakes = data as readonly [bigint, bigint, boolean] | undefined

  return {
    userStakes: userStakes ? {
      optionAStake: userStakes[0],
      optionBStake: userStakes[1],
      hasClaimed: userStakes[2]
    } as UserStakes : undefined,
    isLoading,
    error,
    refetch
  }
}

/**
 * Hook to get user's potential reward
 */
export function useUserPotentialReward(contestAddress: `0x${string}` | undefined, userAddress: `0x${string}` | undefined) {
  const { data: reward, isLoading, error } = useReadContract({
    address: contestAddress,
    abi: CONTEST_ABI,
    functionName: 'getUserPotentialReward',
    args: userAddress ? [userAddress] : undefined,
    query: { enabled: !!contestAddress && !!userAddress }
  })

  return { reward: reward as bigint | undefined, isLoading, error }
}

/**
 * Hook to stake on a contest
 */
export function useStakeOnContest(contestAddress: `0x${string}` | undefined) {
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const stake = useCallback((option: 0 | 1, amount: string) => {
    if (!contestAddress) return
    
    const amountWei = parseUSDC(amount)
    writeContract({
      address: contestAddress,
      abi: CONTEST_ABI,
      functionName: 'stake',
      args: [option, amountWei],
    })
  }, [writeContract, contestAddress])

  return {
    stake,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error
  }
}

/**
 * Hook to claim rewards from a contest
 */
export function useClaimReward(contestAddress: `0x${string}` | undefined) {
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const claimReward = useCallback(() => {
    if (!contestAddress) return
    
    writeContract({
      address: contestAddress,
      abi: CONTEST_ABI,
      functionName: 'claimReward',
    })
  }, [writeContract, contestAddress])

  return {
    claimReward,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error
  }
}

/**
 * Hook to resolve a contest (admin only)
 */
export function useResolveContest(contestAddress: `0x${string}` | undefined) {
  const { address } = useAccount()
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const resolve = useCallback((winningOption: 0 | 1) => {
    if (!contestAddress || address !== ADMIN_ADDRESS) return
    
    writeContract({
      address: contestAddress,
      abi: CONTEST_ABI,
      functionName: 'resolve',
      args: [winningOption],
    })
  }, [writeContract, contestAddress, address])

  const isAdmin = address === ADMIN_ADDRESS

  return {
    resolve,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    isAdmin,
    error
  }
}

// ===== USDC TOKEN HOOKS =====

/**
 * Hook to get USDC balance for a user
 */
export function useUSDCBalance(userAddress: `0x${string}` | undefined) {
  const { data: balance, isLoading, error, refetch } = useReadContract({
    address: MOCK_USDC_ADDRESS,
    abi: MOCK_USDC_ABI,
    functionName: 'balanceOf',
    args: userAddress ? [userAddress] : undefined,
    query: { enabled: !!userAddress }
  })

  return {
    balance: balance as bigint | undefined,
    balanceFormatted: balance ? formatUSDC(balance) : '0.00',
    isLoading,
    error,
    refetch
  }
}

/**
 * Hook to get USDC allowance
 */
export function useUSDCAllowance(userAddress: `0x${string}` | undefined, spenderAddress: `0x${string}` | undefined) {
  const { data: allowance, isLoading, error, refetch } = useReadContract({
    address: MOCK_USDC_ADDRESS,
    abi: MOCK_USDC_ABI,
    functionName: 'allowance',
    args: userAddress && spenderAddress ? [userAddress, spenderAddress] : undefined,
    query: { enabled: !!userAddress && !!spenderAddress }
  })

  return {
    allowance: allowance as bigint | undefined,
    allowanceFormatted: allowance ? formatUSDC(allowance) : '0.00',
    isLoading,
    error,
    refetch
  }
}

/**
 * Hook to approve USDC spending
 */
export function useApproveUSDC() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const approve = useCallback((spenderAddress: `0x${string}`, amount: string) => {
    const amountWei = parseUSDC(amount)
    writeContract({
      address: MOCK_USDC_ADDRESS,
      abi: MOCK_USDC_ABI,
      functionName: 'approve',
      args: [spenderAddress, amountWei],
    })
  }, [writeContract])

  return {
    approve,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error
  }
}

/**
 * Hook to get USDC from faucet
 */
export function useUSDCFaucet() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const getFaucet = useCallback((amount: string) => {
    const amountWei = parseUSDC(amount)
    writeContract({
      address: MOCK_USDC_ADDRESS,
      abi: MOCK_USDC_ABI,
      functionName: 'faucet',
      args: [amountWei],
    })
  }, [writeContract])

  return {
    getFaucet,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error
  }
}

// ===== UTILITY HOOKS =====

/**
 * Check if user is admin
 */
export function useIsAdmin() {
  const { address } = useAccount()
  return address === ADMIN_ADDRESS
}