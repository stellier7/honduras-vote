import { globalActions } from '@/store/globalSlices'
import { RootState } from '@/utils/types'
import { useRouter } from 'next/router'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const Banner = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { setCreateModal } = globalActions
  const { wallet } = useSelector((states: RootState) => states.globalStates)

  const onPressCreate = () => {
    if (wallet === '') return toast.warning('¡Conecta tu billetera primero!')
    dispatch(setCreateModal('scale-100'))
  }

  const onPressVote = () => {
    router.push('/elecciones')
  }

  const onPressResults = () => {
    router.push('/resultados')
  }

  return (
    <main className="mx-auto text-center space-y-8 px-4">
      <h1 className="text-3xl sm:text-[45px] font-[600px] text-center leading-tight">
        Transparencia Electoral para Honduras
      </h1>
      <p className="text-sm sm:text-[16px] font-[500px] text-center max-w-2xl mx-auto">
        Luchamos contra el fraude electoral con tecnología blockchain avanzada. 
        Cada voto es transparente, verificable e inmutable.
      </p>

      {/* Contenedor de botones optimizado para móviles 🇭🇳 */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
        <button
          className="text-black h-[45px] w-[148px] rounded-full transition-all duration-300
          border border-gray-400 bg-white hover:bg-opacity-20 hover:text-white
          font-medium shadow-lg hover:shadow-xl transform hover:scale-105
          focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          onClick={onPressVote}
        >
          🗳️ Votar
        </button>
        
        <button
          className="text-white h-[45px] w-[148px] rounded-full transition-all duration-300
          border border-white bg-transparent hover:bg-white hover:text-black
          font-medium shadow-lg hover:shadow-xl transform hover:scale-105
          focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          onClick={onPressResults}
        >
          📊 Resultados
        </button>
        
        <button
          className="text-white h-[45px] w-[160px] rounded-full transition-all duration-300
          border border-white bg-transparent hover:bg-white hover:text-black
          font-medium shadow-lg hover:shadow-xl transform hover:scale-105
          focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          onClick={onPressCreate}
        >
          ➕ Crear Votación
        </button>
      </div>

      {/* Mensaje de confianza para Honduras */}
      <div className="mt-8 text-xs sm:text-sm text-white/80 italic">
        🇭🇳 "Por una Honduras transparente y democrática"
      </div>
    </main>
  )
}

export default Banner
