// Type declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>
      on: (event: string, handler: (data: any) => void) => void
      removeListener: (event: string, handler: (data: any) => void) => void
    }
  }
}

export interface NetworkConfig {
  chainId: number
  name: string
  rpcUrl: string
  blockExplorer: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  contractAddress: string
}

export const NETWORKS: Record<string, NetworkConfig> = {
  // Local Hardhat Network
  hardhat: {
    chainId: 31337,
    name: 'Hardhat Local',
    rpcUrl: 'http://127.0.0.1:8545',
    blockExplorer: 'http://localhost:8545',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    contractAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  },
  
  // Base Mainnet
  base: {
    chainId: 8453,
    name: 'Base',
    rpcUrl: 'https://mainnet.base.org',
    blockExplorer: 'https://basescan.org',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    contractAddress: process.env.NEXT_PUBLIC_BASE_CONTRACT_ADDRESS || '',
  },
  
  // Base Sepolia Testnet
  baseSepolia: {
    chainId: 84532,
    name: 'Base Sepolia',
    rpcUrl: 'https://sepolia.base.org',
    blockExplorer: 'https://sepolia.basescan.org',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    contractAddress: process.env.NEXT_PUBLIC_BASE_SEPOLIA_CONTRACT_ADDRESS || '',
  },

  // Ethereum Mainnet
  ethereum: {
    chainId: 1,
    name: 'Ethereum',
    rpcUrl: `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_PROJECT_ID}`,
    blockExplorer: 'https://etherscan.io',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    contractAddress: process.env.NEXT_PUBLIC_ETH_CONTRACT_ADDRESS || '',
  },

  // Sepolia Testnet
  sepolia: {
    chainId: 11155111,
    name: 'Sepolia',
    rpcUrl: `https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_PROJECT_ID}`,
    blockExplorer: 'https://sepolia.etherscan.io',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    contractAddress: process.env.NEXT_PUBLIC_SEPOLIA_CONTRACT_ADDRESS || '',
  },
}

// Default to hardhat for development, can be overridden with environment variable
export const DEFAULT_NETWORK = process.env.NEXT_PUBLIC_DEFAULT_NETWORK || 'hardhat'

export function getNetworkConfig(networkName?: string): NetworkConfig {
  const network = networkName || DEFAULT_NETWORK
  const config = NETWORKS[network]
  
  if (!config) {
    console.warn(`Network ${network} not found, falling back to hardhat`)
    return NETWORKS.hardhat
  }
  
  return config
}

// Helper function to add network to MetaMask
export async function addNetworkToWallet(networkName: string) {
  const config = getNetworkConfig(networkName)
  
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed')
  }

  try {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [{
        chainId: `0x${config.chainId.toString(16)}`,
        chainName: config.name,
        nativeCurrency: config.nativeCurrency,
        rpcUrls: [config.rpcUrl],
        blockExplorerUrls: [config.blockExplorer],
      }],
    })
  } catch (error) {
    console.error('Failed to add network to wallet:', error)
    throw error
  }
}

// Helper function to switch network in MetaMask
export async function switchToNetwork(networkName: string) {
  const config = getNetworkConfig(networkName)
  
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed')
  }

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${config.chainId.toString(16)}` }],
    })
  } catch (error: any) {
    // If network doesn't exist in wallet, add it first
    if (error.code === 4902) {
      await addNetworkToWallet(networkName)
    } else {
      console.error('Failed to switch network:', error)
      throw error
    }
  }
} 