/**
 * Momentum Contracts Configuration
 * Updated deployment on Sepolia Testnet with all new functions
 */

// Contract Addresses (Sepolia Testnet)
export const MOCK_USDC_ADDRESS = "0xAd5C7d6B80bAC82e03088d3BeB755EE6d0aCb7Fa" as const;
export const CONTEST_FACTORY_ADDRESS = "0x04f77A36a5F865e8185cf9835Ab72fbab794514b" as const;
export const ADMIN_ADDRESS = "0x6096797bA97e5bAEAE72FC472734ecc3AC88C67e" as const;

// Network Configuration
export const SEPOLIA_CHAIN_ID = 11155111;
export const SEPOLIA_RPC_URL = "https://eth-sepolia.g.alchemy.com/v2/LeGSIpWgv5T9ZQGB96w_M";

// Contract Configuration
export const CONTEST_DURATION = 86400; // 24 hours
export const MINIMUM_STAKE = 1000000; // $1 in USDC (6 decimals)
export const PLATFORM_FEE_PERCENT = 2; // 2% platform fee
export const FAUCET_AMOUNT = 10000000000; // 10,000 USDC (6 decimals)

// MockUSDC ABI - Essential functions for frontend
export const MOCK_USDC_ABI = [
  "function name() external view returns (string)",
  "function symbol() external view returns (string)",
  "function decimals() external view returns (uint8)",
  "function totalSupply() external view returns (uint256)",
  "function balanceOf(address account) external view returns (uint256)",
  "function transfer(address to, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function transferFrom(address from, address to, uint256 amount) external returns (bool)",
  "function faucet() external",
  "function mint(address to, uint256 amount) external",
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)"
] as const;

// ContestFactory ABI - INCLUDING ALL NEW FUNCTIONS
export const CONTEST_FACTORY_ABI = [
  // Core factory functions
  "function createContest(string memory _question, string memory _optionA, string memory _optionB) external returns (address)",
  "function getAllContests() external view returns (address[])",
  "function getContestCount() external view returns (uint256)",
  "function getContest(uint256 index) external view returns (address)",
  "function isValidContest(address contest) external view returns (bool)",
  
  // NEW FUNCTIONS - Essential for production
  "function getActiveContests() external view returns (address[])",
  "function getResolvedContests() external view returns (address[])",
  "function getContestBatch(uint256 startIndex, uint256 count) external view returns (address[])",
  "function withdrawPlatformFees() external",
  "function withdrawFees(address to) external",
  "function getPlatformFeeBalance() external view returns (uint256)",
  "function getFactoryStats() external view returns (uint256 totalContests, uint256 activeContests, uint256 resolvedContests, uint256 totalFeesCollected)",
  "function transferFactoryOwnership(address newOwner) external",
  
  // View functions
  "function owner() external view returns (address)",
  "function stakingToken() external view returns (address)",
  "function CONTEST_DURATION() external view returns (uint256)",
  
  // Events
  "event ContestCreated(address indexed contestAddress, string question, string optionA, string optionB, uint256 endTime, address indexed creator)",
  "event PlatformFeesWithdrawn(address indexed owner, uint256 amount)",
  "event FeesWithdrawn(address indexed to, uint256 amount)",
  "event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)"
] as const;

// Contest ABI - Complete interface for individual contests
export const CONTEST_ABI = [
  // Core contest functions
  "function stake(bool _forA, uint256 _amount) external",
  "function resolve() external",
  "function claim() external",
  "function calculateWinnings(address user) external view returns (uint256)",
  
  // Contest information
  "function question() external view returns (string)",
  "function optionA_text() external view returns (string)",
  "function optionB_text() external view returns (string)",
  "function endTime() external view returns (uint256)",
  "function isResolved() external view returns (bool)",
  "function winnerIsA() external view returns (bool)",
  "function platformFeeRecipient() external view returns (address)",
  
  // Staking data
  "function totalStakedOnA() external view returns (uint256)",
  "function totalStakedOnB() external view returns (uint256)",
  "function stakesA(address user) external view returns (uint256)",
  "function stakesB(address user) external view returns (uint256)",
  "function hasClaimed(address user) external view returns (bool)",
  
  // Advanced view functions
  "function getTotalPool() external view returns (uint256)",
  "function getUserStakes(address user) external view returns (uint256 onA, uint256 onB, uint256 total)",
  "function getContestInfo() external view returns (bool _isActive, bool _isResolved, uint256 _totalPool, uint256 _timeRemaining)",
  "function isWinner(address user) external view returns (bool)",
  "function getWinningOption() external view returns (bool isA, string memory optionText, uint256 totalStaked)",
  "function getPlatformFee() external view returns (uint256)",
  
  // Constants
  "function MINIMUM_STAKE() external view returns (uint256)",
  "function PLATFORM_FEE_PERCENT() external view returns (uint256)",
  "function stakingToken() external view returns (address)",
  
  // Events
  "event Staked(address indexed user, bool forA, uint256 amount, uint256 timestamp)",
  "event ContestResolved(bool winnerIsA, uint256 totalA, uint256 totalB, uint256 platformFee, uint256 timestamp)",
  "event WinningsClaimed(address indexed user, uint256 amount, uint256 timestamp)"
] as const;

// Type definitions for TypeScript
export type ContestInfo = {
  isActive: boolean;
  isResolved: boolean;
  totalPool: bigint;
  timeRemaining: bigint;
};

export type UserStakes = {
  onA: bigint;
  onB: bigint;
  total: bigint;
};

export type FactoryStats = {
  totalContests: bigint;
  activeContests: bigint;
  resolvedContests: bigint;
  totalFeesCollected: bigint;
};

export type WinningOption = {
  isA: boolean;
  optionText: string;
  totalStaked: bigint;
};

// Helper functions for frontend
export const formatUSDC = (amount: bigint): string => {
  return (Number(amount) / 1e6).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const parseUSDC = (amount: string): bigint => {
  return BigInt(Math.floor(parseFloat(amount) * 1e6));
};

export const formatTimeRemaining = (seconds: bigint): string => {
  const totalSeconds = Number(seconds);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  
  if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  } else {
    return `${secs}s`;
  }
};

// Sample contest creation parameters
export const SAMPLE_CONTESTS = [
  {
    question: "Will ETH reach $4000 by end of week?",
    optionA: "Yes, ETH will hit $4000+",
    optionB: "No, ETH stays below $4000"
  },
  {
    question: "Will Bitcoin break $70k this month?",
    optionA: "Yes, BTC breaks $70k",
    optionB: "No, BTC stays below $70k"
  },
  {
    question: "Will the next Fed meeting cut rates?",
    optionA: "Yes, rates will be cut",
    optionB: "No, rates stay same/increase"
  }
] as const;

export default {
  MOCK_USDC_ADDRESS,
  CONTEST_FACTORY_ADDRESS,
  ADMIN_ADDRESS,
  SEPOLIA_CHAIN_ID,
  SEPOLIA_RPC_URL,
  MOCK_USDC_ABI,
  CONTEST_FACTORY_ABI,
  CONTEST_ABI,
  formatUSDC,
  parseUSDC,
  formatTimeRemaining,
  SAMPLE_CONTESTS,
};