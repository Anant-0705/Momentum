'use client'

import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { sepolia } from 'wagmi/chains'
import { createConfig, http } from 'wagmi'

// Environment variables with fallbacks
const sepoliaRpcUrl = process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL || 'https://eth-sepolia.g.alchemy.com/v2/LeGSIpWgv5T9ZQGB96w_M'
const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_WALLETCONNECT_PROJECT_ID'

export const config = getDefaultConfig({
  appName: 'Momentum',
  projectId: walletConnectProjectId,
  chains: [sepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
})

// Alternative config using createConfig for more control
export const wagmiConfig = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(sepoliaRpcUrl),
  },
})

// Contract addresses from environment
export const mockUSDCAddress = process.env.NEXT_PUBLIC_MOCK_USDC_ADDRESS as `0x${string}` || '0xAd5C7d6B80bAC82e03088d3BeB755EE6d0aCb7Fa'
export const contestFactoryAddress = process.env.NEXT_PUBLIC_CONTEST_FACTORY_ADDRESS as `0x${string}` || '0x04f77A36a5F865e8185cf9835Ab72fbab794514b'
export const adminAddress = process.env.NEXT_PUBLIC_ADMIN_ADDRESS as `0x${string}` || '0x6096797bA97e5bAEAE72FC472734ecc3AC88C67e'