'use client'

import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { sepolia } from 'wagmi/chains'

export const config = getDefaultConfig({
  appName: 'Momentum',
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID', // Replace with your actual project ID
  chains: [sepolia],
  ssr: true,
})

// Contract Addresses (Sepolia Testnet) - Updated to match deployed contracts
export const MOCK_USDC_ADDRESS = "0xAd5C7d6B80bAC82e03088d3BeB755EE6d0aCb7Fa" as const
export const CONTEST_FACTORY_ADDRESS = "0x04f77A36a5F865e8185cf9835Ab72fbab794514b" as const
export const ADMIN_ADDRESS = "0x998f10ad961348D9Fa66B1c0391503f8b29b4FA8" as const

// Network Configuration
export const SEPOLIA_CHAIN_ID = 11155111
export const CONTEST_DURATION = 86400 // 24 hours
export const MINIMUM_STAKE = 1000000 // $1 in USDC (6 decimals)
export const PLATFORM_FEE_PERCENT = 2