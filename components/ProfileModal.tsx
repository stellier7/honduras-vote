import React, { useState, useEffect } from 'react'
import { FaTimes, FaUser, FaIdCard, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'
import { toast } from 'react-toastify'

interface ProfileData {
  firstName: string
  lastName: string
  kycStatus: 'pending' | 'verified' | 'rejected' | 'not_started'
  walletAddress: string
}

interface ProfileModalProps {
  isOpen: boolean
  onClose: () => void
  walletAddress: string
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, walletAddress }) => {
  const [profile, setProfile] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    kycStatus: 'not_started',
    walletAddress: walletAddress
  })
  const [isEditing, setIsEditing] = useState(false)
  const [tempProfile, setTempProfile] = useState<ProfileData>(profile)

  useEffect(() => {
    if (walletAddress) {
      const savedProfile = localStorage.getItem(`profile_${walletAddress}`)
      if (savedProfile) {
        const parsedProfile = JSON.parse(savedProfile)
        setProfile(parsedProfile)
        setTempProfile(parsedProfile)
      } else {
        const defaultProfile = {
          firstName: '',
          lastName: '',
          kycStatus: 'not_started' as const,
          walletAddress: walletAddress
        }
        setProfile(defaultProfile)
        setTempProfile(defaultProfile)
      }
    }
  }, [walletAddress])

  const saveProfile = () => {
    if (!tempProfile.firstName.trim() || !tempProfile.lastName.trim()) {
      toast.error('Por favor completa nombre y apellido')
      return
    }

    setProfile(tempProfile)
    localStorage.setItem(`profile_${walletAddress}`, JSON.stringify(tempProfile))
    setIsEditing(false)
    toast.success('Perfil actualizado exitosamente')
  }

  const cancelEdit = () => {
    setTempProfile(profile)
    setIsEditing(false)
  }

  const startKYC = () => {
    if (!profile.firstName.trim() || !profile.lastName.trim()) {
      toast.warning('Completa tu nombre y apellido antes de iniciar KYC')
      return
    }

    const updatedProfile = { ...profile, kycStatus: 'pending' as const }
    setProfile(updatedProfile)
    setTempProfile(updatedProfile)
    localStorage.setItem(`profile_${walletAddress}`, JSON.stringify(updatedProfile))
    
    toast.info('Proceso KYC iniciado. Verificando documentos...')
    
    setTimeout(() => {
      const verifiedProfile = { ...updatedProfile, kycStatus: 'verified' as const }
      setProfile(verifiedProfile)
      setTempProfile(verifiedProfile)
      localStorage.setItem(`profile_${walletAddress}`, JSON.stringify(verifiedProfile))
      toast.success('¡KYC completado exitosamente!')
    }, 3000)
  }

  const getKYCStatusDisplay = () => {
    switch (profile.kycStatus) {
      case 'verified':
        return {
          text: 'Verificado',
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          icon: <FaCheckCircle className="text-green-600" />
        }
      case 'pending':
        return {
          text: 'En Proceso',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100',
          icon: <FaExclamationCircle className="text-yellow-600" />
        }
      case 'rejected':
        return {
          text: 'Rechazado',
          color: 'text-red-600',
          bgColor: 'bg-red-100',
          icon: <FaExclamationCircle className="text-red-600" />
        }
      default:
        return {
          text: 'No Iniciado',
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
          icon: <FaIdCard className="text-gray-600" />
        }
    }
  }

  if (!isOpen) return null

  const kycStatus = getKYCStatusDisplay()

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <FaUser className="text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Mi Perfil</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FaTimes className="text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">Información Personal</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={tempProfile.firstName}
                    onChange={(e) => setTempProfile({ ...tempProfile, firstName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ingresa tu nombre"
                  />
                ) : (
                  <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-800">
                    {profile.firstName || 'No especificado'}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Apellido
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={tempProfile.lastName}
                    onChange={(e) => setTempProfile({ ...tempProfile, lastName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ingresa tu apellido"
                  />
                ) : (
                  <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-800">
                    {profile.lastName || 'No especificado'}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 flex space-x-3">
              {isEditing ? (
                <>
                  <button
                    onClick={saveProfile}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Editar Información
                </button>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">Estado de Verificación (KYC)</h3>
            
            <div className={`p-4 rounded-lg ${kycStatus.bgColor} flex items-center justify-between`}>
              <div className="flex items-center space-x-3">
                {kycStatus.icon}
                <div>
                  <p className={`font-medium ${kycStatus.color}`}>
                    {kycStatus.text}
                  </p>
                  <p className="text-sm text-gray-600">
                    {profile.kycStatus === 'verified' && 'Tu identidad ha sido verificada'}
                    {profile.kycStatus === 'pending' && 'Verificación en proceso...'}
                    {profile.kycStatus === 'rejected' && 'Verificación rechazada. Contacta soporte.'}
                    {profile.kycStatus === 'not_started' && 'Verifica tu identidad para mayor seguridad'}
                  </p>
                </div>
              </div>
            </div>

            {profile.kycStatus === 'not_started' && (
              <button
                onClick={startKYC}
                className="mt-4 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                Iniciar Verificación KYC
              </button>
            )}
            
            {profile.kycStatus === 'rejected' && (
              <button
                onClick={startKYC}
                className="mt-4 w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium"
              >
                Reintentar Verificación
              </button>
            )}
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Dirección de Wallet</h3>
            <div className="px-3 py-2 bg-gray-50 rounded-lg font-mono text-sm text-gray-800 break-all">
              {walletAddress}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileModal
