'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatUSDC, formatTimeRemaining } from '@/lib/contracts'
import { useContestInfo } from '@/lib/hooks/useContracts'
import { TrendingUp, Users, Eye, Loader2, AlertCircle } from 'lucide-react'

interface ContestCardProps {
  contestAddress: string
  index?: number
}

export function ContestCard({ contestAddress, index = 0 }: ContestCardProps) {
  const {
    contestInfo,
    question,
    optionA,
    optionB,
    totalStakedOnA,
    totalStakedOnB,
    winnerIsA,
    isLoading,
    error
  } = useContestInfo(contestAddress)

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className="h-64"
      >
        <Card className="h-full flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <Loader2 className="h-6 w-6 animate-spin text-violet-500" />
            <span className="text-gray-600 dark:text-gray-400">Loading contest...</span>
          </div>
        </Card>
      </motion.div>
    )
  }

  if (error || !contestInfo || !question) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className="h-64"
      >
        <Card className="h-full flex items-center justify-center border-red-200 dark:border-red-800">
          <div className="text-center p-6">
            <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-3" />
            <p className="text-red-600 dark:text-red-400 text-sm">
              Failed to load contest
            </p>
            <p className="text-gray-500 text-xs mt-1">
              {error?.message || 'Unknown error'}
            </p>
          </div>
        </Card>
      </motion.div>
    )
  }

  const totalStaked = (totalStakedOnA || BigInt(0)) + (totalStakedOnB || BigInt(0))
  const isLive = contestInfo.isActive
  const isRevealed = contestInfo.isResolved

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-violet-200 dark:hover:border-violet-800 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start mb-3">
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              isLive 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                : isRevealed 
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
            }`}>
              {isLive ? '🔴 Live' : isRevealed ? '✅ Revealed' : '⏸ Ended'}
            </div>
            {isLive && contestInfo.timeRemaining > BigInt(0) && (
              <div className="text-xs bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200 px-2 py-1 rounded">
                {formatTimeRemaining(contestInfo.timeRemaining)}
              </div>
            )}
          </div>
          <CardTitle className="text-lg leading-tight text-gray-900 dark:text-gray-100 min-h-[3rem]">
            {question}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Options Display */}
          <div className="space-y-3">
            <div className={`p-3 rounded-lg border-2 transition-colors ${
              isRevealed && winnerIsA 
                ? 'border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-900/20'
                : 'border-blue-200 dark:border-blue-800'
            }`}>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  Option A: {optionA}
                </span>
                {isRevealed && winnerIsA && (
                  <span className="text-green-600 text-xs">✅ Winner</span>
                )}
              </div>
              {!isLive && totalStakedOnA !== undefined && (
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  ${formatUSDC(totalStakedOnA)} staked
                </div>
              )}
            </div>
            
            <div className={`p-3 rounded-lg border-2 transition-colors ${
              isRevealed && !winnerIsA 
                ? 'border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-900/20'
                : 'border-purple-200 dark:border-purple-800'
            }`}>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                  Option B: {optionB}
                </span>
                {isRevealed && !winnerIsA && (
                  <span className="text-green-600 text-xs">✅ Winner</span>
                )}
              </div>
              {!isLive && totalStakedOnB !== undefined && (
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  ${formatUSDC(totalStakedOnB)} staked
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <TrendingUp className="h-4 w-4" />
              <span>
                {isLive ? 'Stakes Hidden' : `$${formatUSDC(totalStaked)}`}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{isLive ? '?' : 'Multiple'}</span>
            </div>
          </div>

          {/* Action Button */}
          <Button asChild className="w-full" variant="outline">
            <Link href={`/contest/${contestAddress}`}>
              <Eye className="h-4 w-4 mr-2" />
              {isLive ? 'Stake Now' : isRevealed ? 'View Results' : 'View Contest'}
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}