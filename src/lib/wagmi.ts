'use client'

import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { baseSepolia } from 'wagmi/chains'

export const config = getDefaultConfig({
  appName: 'Momentum',
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID', // Replace with your actual project ID
  chains: [baseSepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
})

export const mockUSDCAddress = '0x036CbD53842c5426634e7929541eC2318f3dCF7e' // Mock USDC on Base Sepolia