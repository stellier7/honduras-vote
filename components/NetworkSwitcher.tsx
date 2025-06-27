import React, { useState, useEffect } from 'react'
import { NETWORKS, getNetworkConfig, switchToNetwork } from '@/config/networks'

interface NetworkSwitcherProps {
  className?: string
}

const NetworkSwitcher: React.FC<NetworkSwitcherProps> = ({ className = '' }) => {
  const [currentNetwork, setCurrentNetwork] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Get current network from MetaMask
    const getCurrentNetwork = async () => {
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        try {
          const chainId = await (window as any).ethereum.request({ method: 'eth_chainId' })
          const chainIdDecimal = parseInt(chainId, 16)
          
          // Find network by chainId
          const networkEntry = Object.entries(NETWORKS).find(
            ([, config]) => config.chainId === chainIdDecimal
          )
          
          if (networkEntry) {
            setCurrentNetwork(networkEntry[0])
          } else {
            setCurrentNetwork('unknown')
          }
        } catch (error) {
          console.error('Failed to get current network:', error)
        }
      }
    }

    getCurrentNetwork()

    // Listen for network changes
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      const handleChainChanged = (chainId: string) => {
        const chainIdDecimal = parseInt(chainId, 16)
        const networkEntry = Object.entries(NETWORKS).find(
          ([, config]) => config.chainId === chainIdDecimal
        )
        
        if (networkEntry) {
          setCurrentNetwork(networkEntry[0])
        } else {
          setCurrentNetwork('unknown')
        }
      }

      ;(window as any).ethereum.on('chainChanged', handleChainChanged)
      
      return () => {
        ;(window as any).ethereum?.removeListener('chainChanged', handleChainChanged)
      }
    }
  }, [])

  const handleNetworkSwitch = async (networkName: string) => {
    setIsLoading(true)
    try {
      await switchToNetwork(networkName)
      setCurrentNetwork(networkName)
    } catch (error) {
      console.error('Failed to switch network:', error)
      // You might want to show a toast notification here
    } finally {
      setIsLoading(false)
    }
  }

  const networkOptions = [
    { key: 'hardhat', label: '🔧 Hardhat Local', description: 'Development' },
    { key: 'base', label: '🔵 Base', description: 'Mainnet' },
    { key: 'baseSepolia', label: '🧪 Base Sepolia', description: 'Testnet' },
    { key: 'ethereum', label: '🔷 Ethereum', description: 'Mainnet' },
    { key: 'sepolia', label: '🧪 Sepolia', description: 'Testnet' },
  ]

  const currentConfig = getNetworkConfig(currentNetwork)

  return (
    <div className={`relative ${className}`}>
      {/* Current Network Display */}
      <div className="mb-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
          Current Network
        </div>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="font-semibold">{currentConfig.name}</span>
          {currentNetwork === 'unknown' && (
            <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">
              Unsupported
            </span>
          )}
        </div>
      </div>

      {/* Network Options */}
      <div className="space-y-2">
        <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
          Switch Network
        </div>
        
        {networkOptions.map(({ key, label, description }) => {
          const isActive = currentNetwork === key
          const network = NETWORKS[key]
          
          return (
            <button
              key={key}
              onClick={() => handleNetworkSwitch(key)}
              disabled={isLoading || isActive}
              className={`w-full p-3 text-left rounded-lg border transition-all ${
                isActive
                  ? 'bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-100'
                  : 'bg-white border-gray-200 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600'
              } ${
                isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{label}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {description} • Chain ID: {network.chainId}
                  </div>
                </div>
                {isActive && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Honduras Vote Context */}
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="text-sm font-medium text-blue-900 dark:text-blue-100">
          🇭🇳 Para Honduras
        </div>
        <div className="text-xs text-blue-700 dark:text-blue-300 mt-1">
          Recommended: Use <strong>Base</strong> for lower fees and fast transactions for the Honduras voting system.
        </div>
      </div>

      {isLoading && (
        <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 flex items-center justify-center rounded-lg">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        </div>
      )}
    </div>
  )
}

export default NetworkSwitcher 