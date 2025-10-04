now its show'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CheckCircle, XCircle, Key, Eye, EyeOff } from 'lucide-react'

export default function KeyVerificationPage() {
  const [showPrivateKey, setShowPrivateKey] = useState(false)
  const [privateKey, setPrivateKey] = useState('0xa265ed2a3693cda65caa468bb5d93c4699346b9e35a49e91514a03d881629acb')
  const [derivedAddress, setDerivedAddress] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  
  const expectedAddress = '0x6096797bA97e5bAEAE72FC472734ecc3AC88C67e'
  
  const verifyKey = async () => {
    setIsVerifying(true)
    try {
      // Use ethers.js if available in the browser
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        // Try to use ethers if it's loaded
        const script = document.createElement('script')
        script.src = 'https://cdn.ethers.io/lib/ethers-5.6.8.umd.min.js'
        script.onload = () => {
          const ethers = (window as any).ethers
          if (ethers) {
            try {
              const wallet = new ethers.Wallet(privateKey)
              setDerivedAddress(wallet.address)
            } catch (error) {
              console.error('Error deriving address:', error)
              setDerivedAddress('Error: Invalid private key')
            }
          }
        }
        document.head.appendChild(script)
      }
    } catch (error) {
      console.error('Verification error:', error)
      setDerivedAddress('Error: Could not verify')
    }
    setIsVerifying(false)
  }
  
  const addressesMatch = derivedAddress.toLowerCase() === expectedAddress.toLowerCase() && derivedAddress !== ''
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">
            Private Key Verification
          </h1>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Verify Private Key to Address Mapping
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="privateKey">Private Key</Label>
                <div className="relative">
                  <Input
                    id="privateKey"
                    type={showPrivateKey ? "text" : "password"}
                    value={privateKey}
                    onChange={(e) => setPrivateKey(e.target.value)}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPrivateKey(!showPrivateKey)}
                  >
                    {showPrivateKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              <div>
                <Label>Expected Address</Label>
                <Input
                  value={expectedAddress}
                  readOnly
                  className="bg-gray-50 dark:bg-gray-800"
                />
              </div>
              
              <Button onClick={verifyKey} disabled={isVerifying || !privateKey}>
                {isVerifying ? 'Verifying...' : 'Verify Address'}
              </Button>
              
              {derivedAddress && (
                <div className="space-y-2">
                  <Label>Derived Address</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      value={derivedAddress}
                      readOnly
                      className={`${addressesMatch ? 'bg-green-50 dark:bg-green-950 border-green-300 dark:border-green-700' : 'bg-red-50 dark:bg-red-950 border-red-300 dark:border-red-700'}`}
                    />
                    {addressesMatch ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  
                  <div className={`p-3 rounded-lg ${addressesMatch ? 'bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800'}`}>
                    <p className={`font-medium ${addressesMatch ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>
                      {addressesMatch ? '✅ MATCH! This private key corresponds to the admin address.' : '❌ NO MATCH! This private key does not match the expected address.'}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Manual Verification Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="font-medium">Method 1: MetaMask Import</h4>
                  <ol className="list-decimal list-inside space-y-1 ml-4 text-gray-600 dark:text-gray-300">
                    <li>Open MetaMask</li>
                    <li>Click account circle → "Import Account"</li>
                    <li>Select "Private Key"</li>
                    <li>Paste: <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded break-all">{privateKey}</code></li>
                    <li>Check if resulting address matches: <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">{expectedAddress}</code></li>
                  </ol>
                </div>
                
                <div>
                  <h4 className="font-medium">Method 2: Online Tool</h4>
                  <p className="text-gray-600 dark:text-gray-300 ml-4">
                    Use: <a href="https://toolkit.abdk.consulting/ethereum#key-to-address" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">toolkit.abdk.consulting/ethereum#key-to-address</a>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {addressesMatch && (
            <div className="mt-6 text-center">
              <a 
                href="/wallet-check" 
                className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Proceed to Wallet Setup →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}