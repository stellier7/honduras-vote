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
    <main className="mx-auto text-center space-y-8">
      <h1 className="text-[45px] font-[600px] text-center leading-none">Transparencia Electoral para Honduras</h1>
      <p className="text-[16px] font-[500px] text-center">
        Luchamos contra el fraude electoral con tecnología blockchain avanzada. 
        Cada voto es transparente, verificable e inmutable.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          className="text-black h-[45px] w-[148px] rounded-full transition-all duration-300
          border border-gray-400 bg-white hover:bg-opacity-20 hover:text-white"
          onClick={onPressVote}
        >
          Votar
        </button>
        
        <button
          className="text-white h-[45px] w-[148px] rounded-full transition-all duration-300
          border border-white bg-transparent hover:bg-white hover:text-black"
          onClick={onPressResults}
        >
          Resultados
        </button>
        
        <button
          className="text-white h-[45px] w-[160px] rounded-full transition-all duration-300
          border border-white bg-transparent hover:bg-white hover:text-black"
          onClick={onPressCreate}
        >
          Crear Votación
        </button>
      </div>
    </main>
  )
}

export default Banner
