'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CountdownTimer } from '@/components/CountdownTimer'
import { StakeModal } from '@/components/StakeModal'
import { getContestByAddress, Contest } from '@/lib/mockData'
import { formatUSDC, abbreviateAddress } from '@/lib/utils'
import { 
  TrendingUp, 
  Users, 
  Lock, 
  Trophy, 
  DollarSign, 
  Clock, 
  Eye,
  MessageCircle,
  Gift,
  ArrowLeft
} from 'lucide-react'
import Link from 'next/link'

export default function ContestDetailPage() {
  const params = useParams()
  const address = params.address as string
  const [contest, setContest] = useState<Contest | null>(null)
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | null>(null)
  const [isStakeModalOpen, setIsStakeModalOpen] = useState(false)
  const [hasClaimed, setHasClaimed] = useState(false)

  useEffect(() => {
    if (address) {
      const foundContest = getContestByAddress(address)
      setContest(foundContest || null)
    }
  }, [address])

  const handleStakeClick = (option: 'A' | 'B') => {
    setSelectedOption(option)
    setIsStakeModalOpen(true)
  }

  const handleClaim = () => {
    // Trigger confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
    setHasClaimed(true)
  }

  if (!contest) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Contest Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The contest you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  const totalStaked = (contest.totalStakedOnA || 0) + (contest.totalStakedOnB || 0)
  const isLive = contest.status === 'live'
  const isRevealed = contest.status === 'revealed'
  const canClaim = isRevealed && ((contest.winnerIsA && contest.userStakeA) || (!contest.winnerIsA && contest.userStakeB))

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Contests
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Contest Card */}
          <div className="lg:col-span-2 space-y-6">
            {/* Question Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-2 shadow-lg">
                <CardHeader className="text-center pb-6">
                  <div className="flex justify-center items-center space-x-4 mb-4">
                    <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                      isLive 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : isRevealed 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                    }`}>
                      {isLive ? '🔴 Live Contest' : isRevealed ? '✅ Revealed' : '⏸ Ended'}
                    </div>
                    
                    {isLive && (
                      <CountdownTimer endTime={contest.endTime} />
                    )}
                  </div>
                  
                  <CardTitle className="text-2xl md:text-3xl text-center text-gray-900 dark:text-gray-100 mb-4">
                    {contest.question}
                  </CardTitle>
                  
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Contest Address: {abbreviateAddress(contest.address)}
                  </div>
                </CardHeader>
              </Card>
            </motion.div>

            {/* Options Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Option A */}
              <Card className={`border-2 transition-all duration-300 hover:shadow-lg ${
                isRevealed && contest.winnerIsA 
                  ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700 shadow-green-200/50' 
                  : 'hover:border-blue-300 dark:hover:border-blue-600'
              }`}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg text-blue-700 dark:text-blue-300">
                      Option A
                    </CardTitle>
                    {isRevealed && contest.winnerIsA && (
                      <Trophy className="h-6 w-6 text-green-600" />
                    )}
                  </div>
                  <p className="text-gray-900 dark:text-gray-100 font-medium">
                    {contest.optionA}
                  </p>
                </CardHeader>
                
                <CardContent>
                  {isLive ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-center text-gray-500 dark:text-gray-400">
                        <Lock className="h-4 w-4 mr-2" />
                        <span>Stakes Hidden</span>
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        onClick={() => handleStakeClick('A')}
                      >
                        <DollarSign className="h-4 w-4 mr-2" />
                        Stake on A
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                          {formatUSDC(contest.totalStakedOnA || 0)}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Total Staked
                        </div>
                      </div>
                      
                      {contest.userStakeA && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                          <div className="text-sm font-medium text-blue-800 dark:text-blue-200">
                            Your Stake: {formatUSDC(contest.userStakeA)}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Option B */}
              <Card className={`border-2 transition-all duration-300 hover:shadow-lg ${
                isRevealed && !contest.winnerIsA 
                  ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700 shadow-green-200/50' 
                  : 'hover:border-purple-300 dark:hover:border-purple-600'
              }`}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg text-purple-700 dark:text-purple-300">
                      Option B
                    </CardTitle>
                    {isRevealed && !contest.winnerIsA && (
                      <Trophy className="h-6 w-6 text-green-600" />
                    )}
                  </div>
                  <p className="text-gray-900 dark:text-gray-100 font-medium">
                    {contest.optionB}
                  </p>
                </CardHeader>
                
                <CardContent>
                  {isLive ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-center text-gray-500 dark:text-gray-400">
                        <Lock className="h-4 w-4 mr-2" />
                        <span>Stakes Hidden</span>
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full border-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                        onClick={() => handleStakeClick('B')}
                      >
                        <DollarSign className="h-4 w-4 mr-2" />
                        Stake on B
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                          {formatUSDC(contest.totalStakedOnB || 0)}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Total Staked
                        </div>
                      </div>
                      
                      {contest.userStakeB && (
                        <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                          <div className="text-sm font-medium text-purple-800 dark:text-purple-200">
                            Your Stake: {formatUSDC(contest.userStakeB)}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Results Section */}
            {isRevealed && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="border-2 border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-700">
                  <CardHeader>
                    <CardTitle className="flex items-center text-green-800 dark:text-green-200">
                      <Trophy className="h-6 w-6 mr-2" />
                      Contest Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                        Winner: Option {contest.winnerIsA ? 'A' : 'B'}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        {contest.winnerIsA ? contest.optionA : contest.optionB}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {((contest.totalStakedOnA || 0) / totalStaked * 100).toFixed(1)}%
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Option A</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {((contest.totalStakedOnB || 0) / totalStaked * 100).toFixed(1)}%
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Option B</div>
                      </div>
                    </div>

                    {canClaim && !hasClaimed && (
                      <Button 
                        onClick={handleClaim}
                        variant="stake" 
                        className="w-full"
                        size="lg"
                      >
                        <Gift className="h-5 w-5 mr-2" />
                        Claim Your Winnings
                      </Button>
                    )}

                    {hasClaimed && (
                      <div className="text-center py-4 text-green-600 dark:text-green-400 font-medium">
                        🎉 Congratulations! Winnings claimed successfully!
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contest Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Contest Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Total Staked:</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {isLive ? 'Hidden' : formatUSDC(totalStaked)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Participants:</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {isLive ? '?' : '47'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Status:</span>
                    <span className={`font-semibold ${
                      isLive ? 'text-green-600' : isRevealed ? 'text-blue-600' : 'text-gray-600'
                    }`}>
                      {isLive ? 'Live' : isRevealed ? 'Revealed' : 'Ended'}
                    </span>
                  </div>
                  {isLive && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Ends In:</span>
                      <CountdownTimer endTime={contest.endTime} className="text-sm" />
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Chat Box */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Discussion
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-sm">
                      Chat feature coming soon!
                    </p>
                    <p className="text-xs mt-2">
                      Join our Discord for now to discuss this contest.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* How It Works */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Eye className="h-5 w-5 mr-2" />
                    How It Works
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-start space-x-3">
                    <Clock className="h-4 w-4 mt-0.5 text-violet-500" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">Stake</div>
                      <div>Choose your side and stake USDC</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Lock className="h-4 w-4 mt-0.5 text-violet-500" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">Wait</div>
                      <div>Stakes are hidden until contest ends</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Trophy className="h-4 w-4 mt-0.5 text-violet-500" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">Win</div>
                      <div>Winners share the losing side's pot</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stake Modal */}
      <StakeModal
        isOpen={isStakeModalOpen}
        onClose={() => setIsStakeModalOpen(false)}
        option={selectedOption || 'A'}
        optionLabel={selectedOption === 'A' ? contest.optionA : contest.optionB}
        isOptionA={selectedOption === 'A'}
      />
    </div>
  )
}