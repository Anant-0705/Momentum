/**
 * Contract ABIs and Configuration for Momentum Platform
 * Exported from deployed Sepolia contracts
 */

// MockUSDC ABI - Essential functions for frontend
export const MOCK_USDC_ABI = [
  {
    "inputs": [],
    "name": "name",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [{"internalType": "uint8", "name": "", "type": "uint8"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "spender", "type": "address"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "approve",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "owner", "type": "address"},
      {"internalType": "address", "name": "spender", "type": "address"}
    ],
    "name": "allowance",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "amount", "type": "uint256"}],
    "name": "faucet",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const

// ContestFactory ABI - Complete interface
export const CONTEST_FACTORY_ABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "_question", "type": "string"},
      {"internalType": "string", "name": "_optionA", "type": "string"},
      {"internalType": "string", "name": "_optionB", "type": "string"}
    ],
    "name": "createContest",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllContests",
    "outputs": [{"internalType": "address[]", "name": "", "type": "address[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getActiveContests",
    "outputs": [{"internalType": "address[]", "name": "", "type": "address[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getResolvedContests",
    "outputs": [{"internalType": "address[]", "name": "", "type": "address[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getFactoryStats",
    "outputs": [
      {"internalType": "uint256", "name": "totalContests", "type": "uint256"},
      {"internalType": "uint256", "name": "activeContests", "type": "uint256"},
      {"internalType": "uint256", "name": "resolvedContests", "type": "uint256"},
      {"internalType": "uint256", "name": "totalFeesCollected", "type": "uint256"},
      {"internalType": "uint256", "name": "currentBalance", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const

// Contest (Individual Contest) ABI - Complete interface
export const CONTEST_ABI = [
  {
    "inputs": [],
    "name": "question",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "optionA",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "optionB",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "endTime",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "isResolved",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "winningOption",
    "outputs": [{"internalType": "uint8", "name": "", "type": "uint8"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalOptionAStake",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalOptionBStake",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalStake",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint8", "name": "_option", "type": "uint8"},
      {"internalType": "uint256", "name": "_amount", "type": "uint256"}
    ],
    "name": "stake",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint8", "name": "_winningOption", "type": "uint8"}],
    "name": "resolve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "claimReward",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
    "name": "getUserStake",
    "outputs": [
      {"internalType": "uint256", "name": "optionAStake", "type": "uint256"},
      {"internalType": "uint256", "name": "optionBStake", "type": "uint256"},
      {"internalType": "bool", "name": "hasClaimed", "type": "bool"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
    "name": "getUserPotentialReward",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getContestInfo",
    "outputs": [
      {"internalType": "string", "name": "", "type": "string"},
      {"internalType": "string", "name": "", "type": "string"},
      {"internalType": "string", "name": "", "type": "string"},
      {"internalType": "uint256", "name": "", "type": "uint256"},
      {"internalType": "bool", "name": "", "type": "bool"},
      {"internalType": "uint8", "name": "", "type": "uint8"},
      {"internalType": "uint256", "name": "", "type": "uint256"},
      {"internalType": "uint256", "name": "", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const

/**
 * Contract Addresses - Sepolia Testnet
 */
export const CONTRACT_ADDRESSES = {
  MOCK_USDC: "0xAd5C7d6B80bAC82e03088d3BeB755EE6d0aCb7Fa" as const,
  CONTEST_FACTORY: "0x04f77A36a5F865e8185cf9835Ab72fbab794514b" as const
} as const

/**
 * Utility Functions
 */

// Format USDC amounts (6 decimals)
export const formatUSDC = (amount: bigint): string => {
  const decimals = BigInt(6)
  const divisor = BigInt(10) ** decimals
  const whole = amount / divisor
  const fraction = amount % divisor
  return `${whole}.${fraction.toString().padStart(Number(decimals), '0').replace(/0+$/, '').slice(0, 2) || '0'}`
}

// Parse USDC amounts from user input
export const parseUSDC = (amount: string): bigint => {
  const decimals = BigInt(6)
  const [whole = '0', fraction = '0'] = amount.split('.')
  const paddedFraction = fraction.padEnd(Number(decimals), '0').slice(0, Number(decimals))
  return BigInt(whole) * (BigInt(10) ** decimals) + BigInt(paddedFraction)
}

// Format timestamp to readable date
export const formatTimestamp = (timestamp: bigint): string => {
  return new Date(Number(timestamp) * 1000).toLocaleString()
}

// Check if contest is still active
export const isContestActive = (endTime: bigint): boolean => {
  return Date.now() < Number(endTime) * 1000
}

// Calculate time remaining
export const getTimeRemaining = (endTime: bigint): string => {
  const now = Date.now()
  const end = Number(endTime) * 1000
  const diff = end - now
  
  if (diff <= 0) return "Ended"
  
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  
  if (hours > 0) {
    return `${hours}h ${minutes}m remaining`
  }
  return `${minutes}m remaining`
}

// Alias for backwards compatibility
export const formatTimeRemaining = getTimeRemaining

// Validate Ethereum address
export const isValidAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}

// Type definitions for TypeScript
export type ContestInfo = {
  question: string
  optionA: string
  optionB: string
  endTime: bigint
  isResolved: boolean
  winningOption: number
  totalOptionAStake: bigint
  totalOptionBStake: bigint
}

export type UserStakes = {
  optionAStake: bigint
  optionBStake: bigint
  hasClaimed: boolean
}

export type FactoryStats = {
  totalContests: bigint
  activeContests: bigint
  resolvedContests: bigint
  totalFeesCollected: bigint
  currentBalance: bigint
}