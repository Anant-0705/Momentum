'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Plus, 
  Calendar, 
  FileText, 
  CheckCircle, 
  Loader2, 
  Settings,
  Shield,
  Users,
  TrendingUp,
  AlertCircle,
  ExternalLink,
  Wallet
} from 'lucide-react'
import { useAccount, useConnect } from 'wagmi'
import { 
  useCreateContest, 
  useFactoryStats, 
  useIsAdmin,
  useUSDCBalance 
} from '@/lib/hooks/useContracts'
import { formatUSDC } from '@/lib/contracts'
import { ADMIN_ADDRESS } from '@/lib/wagmi'
import { USDCFaucet } from '@/components/USDCFaucet'

export default function AdminPage() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const isAdmin = useIsAdmin()
  const { stats, isLoading: statsLoading, refetch: refetchStats } = useFactoryStats()
  const { balance: adminBalance, balanceFormatted } = useUSDCBalance(address)
  
  const [formData, setFormData] = useState({
    question: '',
    optionA: '',
    optionB: ''
  })

  const {
    createContest,
    isLoading: isCreating,
    isSuccess,
    error: createError,
    hash: txHash
  } = useCreateContest()

  // Reset form on success
  useEffect(() => {
    if (isSuccess) {
      setFormData({
        question: '',
        optionA: '',
        optionB: ''
      })
      // Refetch stats after successful creation
      refetchStats()
    }
  }, [isSuccess, refetchStats])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleCreateContest = async () => {
    if (!isAdmin) {
      alert('Only admin can create contests')
      return
    }

    try {
      await createContest(formData.question, formData.optionA, formData.optionB)
    } catch (error) {
      console.error('Failed to create contest:', error)
    }
  }

  const isFormValid = formData.question.trim() && formData.optionA.trim() && formData.optionB.trim()

  // Show wallet connection requirement
  if (!isConnected) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <Wallet className="h-10 w-10 text-violet-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">
            Connect Your Wallet
          </h1>
          <p className="text-white/80 mb-6">
            Connect your wallet to access the admin panel and create contests.
          </p>
          <Button 
            onClick={() => connect({ connector: connectors[0] })}
            className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
          >
            <Wallet className="h-4 w-4 mr-2" />
            Connect Wallet
          </Button>
        </div>
      </div>
    )
  }

  // Show admin access restriction
  if (!isAdmin) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="p-4 rounded-full bg-red-500/10 border border-red-500/20 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <AlertCircle className="h-10 w-10 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">
            Access Restricted
          </h1>
          <p className="text-white/80 mb-4">
            Only the admin can access this panel and create contests.
          </p>
          <div className="bg-white/5 rounded-lg p-4 text-left">
            <p className="text-sm text-white/60 mb-2">Admin Address:</p>
            <p className="text-xs font-mono text-white/80 break-all">{ADMIN_ADDRESS}</p>
            <p className="text-sm text-white/60 mt-3 mb-2">Your Address:</p>
            <p className="text-xs font-mono text-white/80 break-all">{address}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <Settings className="h-12 w-12 text-violet-400" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contest Admin
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Create new contests and manage the Momentum platform. Shape the future of social prediction markets.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create Contest Form */}
          <div className="lg:col-span-2">
            {/* USDC Faucet */}
            <USDCFaucet />
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="shadow-lg border-2">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Plus className="h-6 w-6 mr-3" />
                    Create New Contest
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {isSuccess ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        Contest Created Successfully!
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Your contest has been deployed to the blockchain and is now live for 24 hours.
                      </p>
                      {txHash && (
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Transaction Hash:</p>
                          <div className="flex items-center justify-center space-x-2">
                            <p className="text-xs font-mono text-gray-600 dark:text-gray-400 break-all">
                              {txHash}
                            </p>
                            <a 
                              href={`https://sepolia.etherscan.io/tx/${txHash}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-violet-600 hover:text-violet-700"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </div>
                        </div>
                      )}
                      <Button
                        onClick={() => window.location.reload()}
                        variant="outline"
                        className="mt-4"
                      >
                        Create Another Contest
                      </Button>
                    </motion.div>
                  ) : (
                    <>
                      {/* Error Display */}
                      {createError && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
                          <div className="flex items-center">
                            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                            <span className="text-red-700 dark:text-red-300 font-medium">Error creating contest</span>
                          </div>
                          <p className="text-red-600 dark:text-red-400 text-sm mt-2">
                            {createError.message || 'Unknown error occurred'}
                          </p>
                        </div>
                      )}

                      {/* Question Input */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Contest Question *
                        </label>
                        <div className="relative">
                          <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <textarea
                            value={formData.question}
                            onChange={(e) => handleInputChange('question', e.target.value)}
                            placeholder="e.g., Will Bitcoin reach $100k before the end of 2024?"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
                            rows={3}
                            disabled={isCreating}
                          />
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Ask a clear, binary question that the crowd can predict
                        </p>
                      </div>

                      {/* Options */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Option A *
                          </label>
                          <input
                            type="text"
                            value={formData.optionA}
                            onChange={(e) => handleInputChange('optionA', e.target.value)}
                            placeholder="e.g., Yes, Bitcoin to $100k"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            disabled={isCreating}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Option B *
                          </label>
                          <input
                            type="text"
                            value={formData.optionB}
                            onChange={(e) => handleInputChange('optionB', e.target.value)}
                            placeholder="e.g., No, stays below $100k"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            disabled={isCreating}
                          />
                        </div>
                      </div>

                      {/* Contest Duration Info */}
                      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                          <span className="text-blue-700 dark:text-blue-300 font-medium">Contest Duration</span>
                        </div>
                        <p className="text-blue-600 dark:text-blue-400 text-sm mt-2">
                          All contests run for exactly 24 hours from creation. Stakes are hidden until the contest ends and resolves.
                        </p>
                      </div>

                      {/* Submit Button */}
                      <Button
                        onClick={handleCreateContest}
                        disabled={!isFormValid || isCreating}
                        className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
                        size="lg"
                      >
                        {isCreating ? (
                          <>
                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                            Creating Contest...
                          </>
                        ) : (
                          <>
                            <Plus className="h-5 w-5 mr-2" />
                            Create Contest
                          </>
                        )}
                      </Button>

                      <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                        This will deploy a new smart contract on Sepolia Testnet
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Admin Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Platform Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {statsLoading ? (
                    <div className="flex items-center justify-center py-4">
                      <Loader2 className="h-6 w-6 animate-spin text-violet-500" />
                    </div>
                  ) : stats ? (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Total Contests:</span>
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                          {stats.totalContests.toString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Active Contests:</span>
                        <span className="font-semibold text-green-600">
                          {stats.activeContests.toString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Resolved Contests:</span>
                        <span className="font-semibold text-blue-600">
                          {stats.resolvedContests.toString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Platform Fees:</span>
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                          ${formatUSDC(stats.currentBalance)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Admin Balance:</span>
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                          ${balanceFormatted} USDC
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                      Failed to load stats
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Admin Guidelines */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Contest Guidelines
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-violet-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">Clear & Binary</div>
                      <div>Questions should have two clear, mutually exclusive outcomes</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-violet-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">Time-bound</div>
                      <div>Set a reasonable deadline for resolution</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-violet-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">Engaging</div>
                      <div>Choose topics that will generate interest and debate</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-violet-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">Fair</div>
                      <div>Avoid insider information or manipulation</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Community Impact */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Community Impact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  <p>
                    Every contest you create helps build the social consensus layer of Web3. 
                    You're enabling the crowd to make predictions and earn rewards together.
                  </p>
                  <div className="bg-violet-50 dark:bg-violet-900/20 p-3 rounded-lg">
                    <p className="text-violet-700 dark:text-violet-300 font-medium text-xs">
                      💡 Tip: The best contests combine current events with genuine uncertainty
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}