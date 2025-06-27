import { contestPoll } from '@/services/blockchain'
import { globalActions } from '@/store/globalSlices'
import { PollStruct, RootState } from '@/utils/types'
import { getAvailableCandidates, getCandidateImage } from '@/utils/candidateImages'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const ContestPoll: React.FC<{ poll: PollStruct }> = ({ poll }) => {
  const dispatch = useDispatch()
  const { setContestModal } = globalActions
  const { wallet, contestModal } = useSelector((states: RootState) => states.globalStates)

  const [contestant, setContestant] = useState({
    name: '',
    image: '',
  })

  const availableCandidates = getAvailableCandidates()

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (name === 'name') {
      setContestant((prevState) => ({
        ...prevState,
        [name]: value,
        image: getCandidateImage(value),
      }))
    } else {
      setContestant((prevState) => ({
        ...prevState,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!contestant.name || !contestant.image) return
    if (wallet === '') return toast.warning('¡Conecta tu billetera primero!')

    await toast.promise(
      new Promise<void>((resolve, reject) => {
        contestPoll(poll.id, contestant.name, contestant.image)
          .then((tx) => {
            closeModal()
            console.log(tx)
            resolve(tx)
          })
          .catch((error) => reject(error))
      }),
      {
        pending: 'Procesando transacción...',
        success: 'Candidatura registrada exitosamente 👌',
        error: 'Error al registrar candidatura 🤯',
      }
    )
  }

  const closeModal = () => {
    dispatch(setContestModal('scale-0'))
    setContestant({
      name: '',
      image: '',
    })
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center
    bg-black bg-opacity-50 transform z-50 transition-transform duration-300 ${contestModal}`}
    >
      <div className="bg-white bg-opacity-10 backdrop-blur-sm text-white shadow-lg shadow-[#1B5CFE] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold">Registrarse como Candidato</p>
            <button onClick={closeModal} className="border-0 bg-transparent focus:outline-none">
              <FaTimes />
            </button>
          </div>

          <form
            onClick={handleSubmit}
            className="flex flex-col justify-center items-start rounded-xl mt-5 mb-5"
          >
            <div className="py-4 w-full border border-gray-400 bg-white bg-opacity-20 rounded-full flex items-center px-4 mb-3 mt-2">
              <select
                className="bg-transparent outline-none w-full text-white text-sm"
                name="name"
                value={contestant.name}
                onChange={handleChange}
                required
              >
                <option value="" className="bg-gray-800 text-gray-400">Seleccionar Candidato</option>
                {availableCandidates.map((candidate) => (
                  <option key={candidate.name} value={candidate.name} className="bg-gray-800 text-white">
                    {candidate.name}
                  </option>
                ))}
              </select>
            </div>

            {contestant.name && (
              <div className="w-full flex justify-center mb-3">
                <img
                  src={contestant.image}
                  alt={contestant.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-[#1B5CFE]"
                />
              </div>
            )}

                          <button
              className="h-[48px] w-full block mt-2 px-3 rounded-full text-sm font-bold
                transition-all duration-300 bg-[#1B5CFE] hover:bg-blue-500"
            >
              Registrar Candidatura
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContestPoll
