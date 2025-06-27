import { connectWallet, truncate } from '@/services/blockchain'
import { RootState } from '@/utils/types'
import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { FaUser, FaCopy, FaSignOutAlt, FaVoteYea, FaUserCircle } from 'react-icons/fa'
import { toast } from 'react-toastify'
import ProfileModal from './ProfileModal'

const Navbar = () => {
  const { wallet } = useSelector((states: RootState) => states.globalStates)
  const [animatedText, setAnimatedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
  const [showDropdown, setShowDropdown] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const fullText = 'app'

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const copyWalletAddress = () => {
    navigator.clipboard.writeText(wallet)
    toast.success('Dirección copiada al portapapeles')
    setShowDropdown(false)
  }

  const handleLogout = () => {
    window.location.reload()
    setShowDropdown(false)
  }

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  const openProfileModal = () => {
    setShowProfileModal(true)
    setShowDropdown(false)
  }

  useEffect(() => {
    let timeout: NodeJS.Timeout

    const runAnimation = () => {
      if (!isDeleting) {
        // Typing phase
        if (animatedText.length < fullText.length) {
          timeout = setTimeout(() => {
            setAnimatedText(fullText.slice(0, animatedText.length + 1))
          }, 200) // 200ms per letter when typing
        } else {
          // Finished typing, wait then start deleting
          timeout = setTimeout(() => {
            setIsDeleting(true)
          }, 3000) // Wait 3 seconds before deleting
        }
      } else {
        // Deleting phase
        if (animatedText.length > 0) {
          timeout = setTimeout(() => {
            setAnimatedText(animatedText.slice(0, -1))
          }, 100) // 100ms per letter when deleting (faster)
        } else {
          // Finished deleting, wait then start typing again
          timeout = setTimeout(() => {
            setIsDeleting(false)
          }, 2000) // Wait 2 seconds before typing again
        }
      }
    }

    // Start the animation after initial delay
    const initialDelay = setTimeout(() => {
      runAnimation()
    }, animatedText === '' && !isDeleting ? 1000 : 0)

    // Run animation
    if (animatedText !== '' || isDeleting) {
      runAnimation()
    }

    return () => {
      clearTimeout(timeout)
      clearTimeout(initialDelay)
    }
  }, [animatedText, isDeleting])

  return (
    <nav
      className="h-[80px] flex justify-between items-center border border-gray-400 
      px-5 rounded-full"
    >
      <Link href="/" className="text-[20px] sm:text-[24px] font-bold">
        <span className="text-white">HND</span>
        <span className="text-white">
          {animatedText}
          {(animatedText.length < fullText.length || isDeleting) && (
            <span className="animate-pulse text-blue-300">|</span>
          )}
        </span>
      </Link>
      {wallet ? (
        <div className="relative" ref={dropdownRef}>
          <button
            className="h-[48px] w-[48px] rounded-full text-lg
            transition-all duration-300 bg-white text-black hover:bg-gray-100
            flex items-center justify-center"
            onClick={toggleDropdown}
          >
            <FaUser />
          </button>
          
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-72 bg-white bg-opacity-95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 z-50">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <FaUserCircle className="text-white text-lg" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Mi Cuenta</p>
                    <p className="text-xs text-gray-600">Usuario conectado</p>
                  </div>
                </div>
              </div>
              
              <div className="p-2">
                <div className="px-3 py-2 mb-2">
                  <p className="text-xs text-gray-500 mb-1">Dirección de Wallet:</p>
                  <div className="flex items-center justify-between bg-gray-100 rounded-lg p-2">
                    <span className="text-sm text-gray-800 font-mono">
                      {truncate({ text: wallet, startChars: 6, endChars: 6, maxLength: 15 })}
                    </span>
                    <button
                      onClick={copyWalletAddress}
                      className="ml-2 p-1 hover:bg-gray-200 rounded transition-colors"
                      title="Copiar dirección"
                    >
                      <FaCopy className="text-gray-600 text-sm" />
                    </button>
                  </div>
                </div>
                
                <button 
                  onClick={openProfileModal}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FaUser className="text-gray-500" />
                  <span>Perfil</span>
                </button>
                
                <Link href="/resultados" className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <FaVoteYea className="text-gray-500" />
                  <span>Mis Votos</span>
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <FaSignOutAlt className="text-red-500" />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <button
          className="h-[48px] w-[130px] 
          sm:w-[148px] px-3 rounded-full text-sm font-bold
          transition-all duration-300 bg-white text-black hover:bg-gray-100"
          onClick={connectWallet}
        >
          Iniciar Sesión
        </button>
      )}
      
      <ProfileModal 
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        walletAddress={wallet}
      />
    </nav>
  )
}

export default Navbar
