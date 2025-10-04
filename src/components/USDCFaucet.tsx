'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useUSDCFaucet, useUSDCBalance } from '@/lib/hooks/useContracts'
import { useAccount } from 'wagmi'
import { Loader2, Coins, Check, AlertCircle } from 'lucide-react'
import { formatUSDC } from '@/lib/contracts'

export function USDCFaucet() {
  const { address } = useAccount()
  const { balance, balanceFormatted, refetch } = useUSDCBalance(address)
  const { getFaucet, isPending, isConfirming, isSuccess, error } = useUSDCFaucet()
  const [amount, setAmount] = useState('1000')

  const isLoading = isPending || isConfirming

  const handleGetTokens = async () => {
    try {
      getFaucet(amount)
      // Refetch balance after success
      setTimeout(() => {
        refetch()
      }, 2000)
    } catch (err) {
      console.error('Faucet failed:', err)
    }
  }

  if (!address) {
    return null
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Coins className="h-5 w-5 mr-2 text-yellow-500" />
          USDC Faucet (Testnet)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">Your Balance:</span>
          <span className="font-semibold text-lg">${balanceFormatted} USDC</span>
        </div>
        
        <div className="flex space-x-2">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount (USDC)"
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            disabled={isLoading}
            min="1"
            max="10000"
          />
          <Button
            onClick={handleGetTokens}
            disabled={isLoading || !amount || parseFloat(amount) < 1 || parseFloat(amount) > 10000}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : isSuccess ? (
              <Check className="h-4 w-4" />
            ) : (
              'Get USDC'
            )}
          </Button>
        </div>

        {error && (
          <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm">
            <AlertCircle className="h-4 w-4" />
            <span>{error.message}</span>
          </div>
        )}

        {isSuccess && (
          <div className="text-green-600 dark:text-green-400 text-sm">
            ✅ Successfully received {amount} USDC!
          </div>
        )}

        <div className="text-xs text-gray-500 dark:text-gray-400">
          Free testnet USDC for testing. Max 10,000 per request.
        </div>
      </CardContent>
    </Card>
  )
}