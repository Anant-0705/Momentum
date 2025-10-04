'use client'

import { motion } from 'framer-motion'
import { ContestCard } from '@/components/ContestCard'
import { TrendingUp, Trophy, ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useActiveContests, useResolvedContests } from '@/lib/hooks/useContracts'

export default function ContestsPage() {
  const { 
    activeContests, 
    isLoading: loadingActive, 
    error: activeError 
  } = useActiveContests()
  
  const { 
    resolvedContests, 
    isLoading: loadingResolved, 
    error: resolvedError 
  } = useResolvedContests()

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Button variant="ghost" asChild className="text-white/80 hover:text-white">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            All Contests
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Discover live contests and explore the history of crowd predictions
          </p>
        </motion.div>

        {/* Live Contests Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <div className="flex items-center mb-6">
              <TrendingUp className="h-8 w-8 text-green-400 mr-3" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Live Contests
              </h2>
            </div>
            <p className="text-lg text-white/70 max-w-2xl">
              Jump into the action! Stakes are hidden until these contests end to keep things fair.
            </p>
          </motion.div>

          {loadingActive ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-violet-400" />
              <span className="ml-3 text-white/70">Loading live contests...</span>
            </div>
          ) : activeError ? (
            <div className="text-center py-12">
              <div className="text-red-400 text-lg mb-4">Failed to load live contests</div>
              <p className="text-white/60 text-sm">{activeError.message}</p>
            </div>
          ) : activeContests && activeContests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeContests.map((contestAddress, index) => (
                <motion.div
                  key={contestAddress}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                >
                  <ContestCard contestAddress={contestAddress} index={index} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-white/60 text-lg">
                No live contests at the moment. Check back soon!
              </div>
              <Button asChild className="mt-6 bg-gradient-to-r from-violet-600 to-purple-600">
                <Link href="/admin">
                  Create First Contest
                </Link>
              </Button>
            </motion.div>
          )}
        </section>

        {/* History Section */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex items-center mb-6">
              <Trophy className="h-8 w-8 text-blue-400 mr-3" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Contest History
              </h2>
            </div>
            <p className="text-lg text-white/70 max-w-2xl">
              See how the crowd voted and claim your winnings from past contests.
            </p>
          </motion.div>

          {loadingResolved ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-violet-400" />
              <span className="ml-3 text-white/70">Loading contest history...</span>
            </div>
          ) : resolvedError ? (
            <div className="text-center py-12">
              <div className="text-red-400 text-lg mb-4">Failed to load contest history</div>
              <p className="text-white/60 text-sm">{resolvedError.message}</p>
            </div>
          ) : resolvedContests && resolvedContests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resolvedContests.map((contestAddress, index) => (
                <motion.div
                  key={contestAddress}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                >
                  <ContestCard contestAddress={contestAddress} index={index} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-white/60 text-lg">
                No contest history yet. Be the first to participate!
              </div>
            </motion.div>
          )}
        </section>
      </div>
    </div>
  )
}