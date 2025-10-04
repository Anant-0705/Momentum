'use client'

import { useActiveContests, useFactoryStats } from '@/lib/hooks'
import { CONTEST_FACTORY_ADDRESS } from '../../../contracts/abis/contracts'

export default function DebugPage() {
  const { data: activeContests, isLoading: contestsLoading, error: contestsError } = useActiveContests()
  const { data: factoryStats, isLoading: statsLoading, error: statsError } = useFactoryStats()

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Contract Debug Info</h1>
        
        <div className="grid gap-6">
          {/* Factory Address */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Contract Address</h2>
            <p className="font-mono text-sm break-all">{CONTEST_FACTORY_ADDRESS}</p>
          </div>

          {/* Factory Stats */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Factory Stats</h2>
            {statsLoading && <p>Loading stats...</p>}
            {statsError && <p className="text-red-500">Error: {statsError.message}</p>}
            {factoryStats && (
              <div className="space-y-2">
                <p>Total Contests: {factoryStats.totalContests.toString()}</p>
                <p>Active Contests: {factoryStats.activeContests.toString()}</p>
                <p>Resolved Contests: {factoryStats.resolvedContests.toString()}</p>
                <p>Total Fees Collected: {factoryStats.totalFeesCollected.toString()}</p>
              </div>
            )}
          </div>

          {/* Active Contests */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Active Contests</h2>
            {contestsLoading && <p>Loading contests...</p>}
            {contestsError && <p className="text-red-500">Error: {contestsError.message}</p>}
            {activeContests && (
              <div>
                <p>Contest Count: {Array.isArray(activeContests) ? activeContests.length : 'Not an array'}</p>
                {Array.isArray(activeContests) && activeContests.length > 0 ? (
                  <div className="mt-4 space-y-2">
                    {activeContests.map((address, index) => (
                      <div key={index} className="font-mono text-sm break-all bg-gray-100 dark:bg-gray-700 p-2 rounded">
                        Contest {index + 1}: {address}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 mt-2">No active contests found</p>
                )}
              </div>
            )}
          </div>

          {/* Raw Data */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Raw Contract Data</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Active Contests Raw:</h3>
                <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded mt-1 overflow-auto">
                  {JSON.stringify(activeContests, null, 2)}
                </pre>
              </div>
              <div>
                <h3 className="font-medium">Factory Stats Raw:</h3>
                <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded mt-1 overflow-auto">
                  {JSON.stringify(factoryStats, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}