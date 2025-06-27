import React from 'react'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { getContestants, getPolls } from '@/services/blockchain'
import { globalActions } from '@/store/globalSlices'
import { ContestantStruct, PollStruct, RootState } from '@/utils/types'
import { getCandidateImage } from '@/utils/candidateImages'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface PollWithContestants {
  poll: PollStruct
  contestants: ContestantStruct[]
}

export default function Resultados({ pollsData }: { pollsData: PollWithContestants[] }) {
  const dispatch = useDispatch()
  const { setPolls } = globalActions

  useEffect(() => {
    const polls = pollsData.map(item => item.poll)
    dispatch(setPolls(polls))
  }, [dispatch, setPolls, pollsData])

  return (
    <>
      <Head>
        <title>Resultados en Vivo - Honduras 2025</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen relative backdrop-blur">
        <div
          className="absolute inset-0 before:absolute before:inset-0
        before:w-full before:h-full before:bg-[url('/assets/images/bg.jpeg')]
        before:blur-sm before:z-[-1] before:bg-no-repeat before:bg-cover"
        />

        <section className="relative px-5 py-10 space-y-16 text-white sm:p-10">
          <Navbar />
          
          {/* Results Header */}
          <div className="flex flex-col items-center justify-center text-center space-y-6 w-full">
            <h1 className="text-[48px] font-[600px] leading-none">
              Resultados en Vivo
            </h1>
            <p className="text-[18px] font-[500px] max-w-3xl">
              Transparencia total: Observa los resultados en tiempo real de las elecciones de Honduras 2025
            </p>
          </div>

          {/* Results Grid */}
          <div className="space-y-12">
            {pollsData.map((item, index) => (
              <ResultCard key={index} poll={item.poll} contestants={item.contestants} />
            ))}
          </div>

          <Footer />
        </section>
      </div>
    </>
  )
}

const ResultCard: React.FC<{ poll: PollStruct; contestants: ContestantStruct[] }> = ({
  poll,
  contestants,
}) => {
  const totalVotes = poll.votes
  
  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 max-w-4xl mx-auto shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
      <div className="text-center mb-6">
        <h2 className="text-[32px] font-[600px] mb-2">{poll.title}</h2>
        <p className="text-[16px] opacity-80 mb-4">{poll.description}</p>
        <div className="flex justify-center items-center gap-4 mb-6">
          <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm">
            Total de votos: {totalVotes}
          </span>
          <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm">
            Candidatos: {poll.contestants}
          </span>
        </div>
      </div>

      {contestants.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contestants
            .sort((a, b) => b.votes - a.votes)
            .map((contestant, i) => {
              const percentage = totalVotes > 0 ? ((contestant.votes / totalVotes) * 100).toFixed(1) : '0'
              const isWinning = i === 0 && contestant.votes > 0
              
              return (
                <div
                  key={contestant.id}
                  className={`bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 ${
                    isWinning ? 'ring-2 ring-yellow-400' : ''
                  } shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300`}
                >
                  <div className="flex items-center space-x-4">
                    {/* Candidate Image */}
                    <div className="w-16 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        className="w-full h-full object-cover"
                        width={64}
                        height={80}
                        src={getCandidateImage(contestant.name)}
                        alt={contestant.name}
                      />
                    </div>
                    
                    {/* Candidate Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold capitalize truncate">
                          {contestant.name}
                        </h3>
                        {isWinning && contestant.votes > 0 && (
                          <span className="text-yellow-400 text-sm">👑</span>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{contestant.votes} votos</span>
                          <span className="font-semibold">{percentage}%</span>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-500 ${
                              isWinning ? 'bg-yellow-400' : 'bg-blue-500'
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-400">
          <p>No hay candidatos registrados para esta votación</p>
        </div>
      )}
    </div>
  )
}

export const getServerSideProps = async () => {
  try {
    const polls: PollStruct[] = await getPolls()
    
    const pollsWithContestants = await Promise.all(
      polls.map(async (poll) => {
        const contestants = await getContestants(poll.id)
        return {
          poll,
          contestants,
        }
      })
    )

    return {
      props: { 
        pollsData: JSON.parse(JSON.stringify(pollsWithContestants))
      },
    }
  } catch (error) {
    console.error('Error fetching results data:', error)
    return {
      props: { 
        pollsData: []
      },
    }
  }
} 