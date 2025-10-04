'use client'

import { useState } from 'react'
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
  TrendingUp
} from 'lucide-react'

export default function AdminPage() {
  const [isCreating, setIsCreating] = useState(false)
  const [isCreated, setIsCreated] = useState(false)
  const [formData, setFormData] = useState({
    question: '',
    optionA: '',
    optionB: '',
    endDate: '',
    endTime: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleCreateContest = async () => {
    setIsCreating(true)
    
    // Simulate contract interaction
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    setIsCreating(false)
    setIsCreated(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsCreated(false)
      setFormData({
        question: '',
        optionA: '',
        optionB: '',
        endDate: '',
        endTime: ''
      })
    }, 3000)
  }

  const isFormValid = formData.question && formData.optionA && formData.optionB && formData.endDate && formData.endTime

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
                  {isCreated ? (
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
                        Your contest has been deployed to the blockchain and is now live.
                      </p>
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                        <p className="text-sm font-mono text-gray-600 dark:text-gray-400">
                          Contract Address: 0x1234...5678
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <>
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

                      {/* End Time */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Contest End Time *
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="relative">
                            <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input
                              type="date"
                              value={formData.endDate}
                              onChange={(e) => handleInputChange('endDate', e.target.value)}
                              min={new Date().toISOString().split('T')[0]}
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                              disabled={isCreating}
                            />
                          </div>
                          <input
                            type="time"
                            value={formData.endTime}
                            onChange={(e) => handleInputChange('endTime', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            disabled={isCreating}
                          />
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          When should staking end and results be revealed?
                        </p>
                      </div>

                      {/* Submit Button */}
                      <Button
                        onClick={handleCreateContest}
                        disabled={!isFormValid || isCreating}
                        className="w-full"
                        size="lg"
                        variant="gradient"
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
                        This will deploy a new smart contract on Base Sepolia
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
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Total Contests:</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Active Contests:</span>
                    <span className="font-semibold text-green-600">3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Total Volume:</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">$127K</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Participants:</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">247</span>
                  </div>
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