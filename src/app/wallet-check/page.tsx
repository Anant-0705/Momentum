'use client'

import { useAccount, useBalance } from 'wagmi'
import { isAdmin } from '@/lib/contract-utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { WalletConnect } from '@/components/WalletConnect'

export default function WalletCheckPage() {
  const { address, isConnected, chain } = useAccount()
  const { data: balance } = useBalance({ address })
  
  const isUserAdmin = isAdmin(address)
  const isCorrectNetwork = chain?.id === 11155111
  const hasBalance = balance && balance.value > BigInt(0)
  
  const expectedAddress = "0x6096797bA97e5bAEAE72FC472734ecc3AC88C67e"
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">
            Admin Wallet Verification
          </h1>
          
          {!isConnected ? (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                  Connect Wallet First
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Please connect your MetaMask wallet with the imported admin private key.
                </p>
                <WalletConnect />
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Connection Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {isConnected ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    Wallet Connection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    <strong>Status:</strong> {isConnected ? 'Connected ✅' : 'Not Connected ❌'}
                  </p>
                  <p className="text-sm">
                    <strong>Address:</strong> <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">{address || 'None'}</code>
                  </p>
                </CardContent>
              </Card>

              {/* Admin Check */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {isUserAdmin ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    Admin Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    <strong>Is Admin:</strong> {isUserAdmin ? 'Yes ✅' : 'No ❌'}
                  </p>
                  <p className="text-sm">
                    <strong>Expected:</strong> <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">{expectedAddress}</code>
                  </p>
                  <p className="text-sm">
                    <strong>Current:</strong> <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">{address || 'None'}</code>
                  </p>
                  {!isUserAdmin && address && (
                    <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                      ⚠️ Wrong address! Please import the admin private key: <code className="text-xs bg-red-100 dark:bg-red-900 px-1 py-0.5 rounded">0xa265ed2a3693cda65caa468bb5d93c4699346b9e35a49e91514a03d881629acb</code>
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Network Check */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {isCorrectNetwork ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    Network Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    <strong>Network:</strong> {chain?.name || 'Unknown'} {isCorrectNetwork ? '✅' : '❌'}
                  </p>
                  <p className="text-sm">
                    <strong>Chain ID:</strong> {chain?.id || 'Unknown'}
                  </p>
                  <p className="text-sm">
                    <strong>Expected:</strong> Sepolia (11155111)
                  </p>
                  {!isCorrectNetwork && (
                    <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                      ⚠️ Please switch to Sepolia testnet in MetaMask
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Balance Check */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {hasBalance ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-yellow-500" />
                    )}
                    ETH Balance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    <strong>Balance:</strong> {balance ? `${Number(balance.formatted).toFixed(6)} ${balance.symbol}` : 'Loading...'} {hasBalance ? '✅' : '⚠️'}
                  </p>
                  {!hasBalance && (
                    <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-2">
                      ⚠️ You need Sepolia ETH for gas fees. Get some from a faucet: <a href="https://sepoliafaucet.com/" target="_blank" rel="noopener noreferrer" className="underline">sepoliafaucet.com</a>
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Overall Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {isUserAdmin && isCorrectNetwork && hasBalance ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    Overall Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isUserAdmin && isCorrectNetwork && hasBalance ? (
                    <div className="text-green-600 dark:text-green-400">
                      <p className="font-medium">🎉 Ready to create contests!</p>
                      <p className="text-sm mt-1">All checks passed. You can now go to the admin panel.</p>
                      <a 
                        href="/admin" 
                        className="inline-block mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                      >
                        Go to Admin Panel
                      </a>
                    </div>
                  ) : (
                    <div className="text-red-600 dark:text-red-400">
                      <p className="font-medium">❌ Setup incomplete</p>
                      <p className="text-sm mt-1">Please fix the issues above before creating contests.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}