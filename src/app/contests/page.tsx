'use client'

import { motion } from 'framer-motion'
import { ContestCard } from '@/components/ContestCard'
import { mockContests, getLiveContests, getEndedContests } from '@/lib/mockData'
import { TrendingUp, Trophy, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function ContestsPage() {
  const liveContests = getLiveContests()
  const endedContests = getEndedContests()

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveContests.map((contest, index) => (
              <motion.div
                key={contest.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              >
                <ContestCard contest={contest} index={index} />
              </motion.div>
            ))}
          </div>

          {liveContests.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-white/60 text-lg">
                No live contests at the moment. Check back soon!
              </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {endedContests.map((contest, index) => (
              <motion.div
                key={contest.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <ContestCard contest={contest} index={index} />
              </motion.div>
            ))}
          </div>

          {endedContests.length === 0 && (
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