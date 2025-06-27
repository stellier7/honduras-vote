/* eslint-disable @next/next/no-img-element */
import { formatDate, truncate } from '@/services/blockchain'
import { PollStruct } from '@/utils/types'
import { getCandidateImage } from '@/utils/candidateImages'
import { useRouter } from 'next/router'
import React from 'react'

const Polls: React.FC<{ polls: PollStruct[] }> = ({ polls }) => {
  return (
    <div>
      <div className="grid grid-cols-1 xl:grid-cols-2 pb-7 gap-[62px] sm:w-2/3 xl:w-5/6 mx-auto">
        {polls.map((poll, i) => (
          <Poll key={i} poll={poll} />
        ))}
      </div>
    </div>
  )
}
const Poll: React.FC<{ poll: PollStruct }> = ({ poll }) => {
  const navigate = useRouter()
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mx-auto w-full">
      <div
        className="h-[392px] gap-[10px] md:w-[580px] md:h-[280px]
            grid grid-cols-1 md:flex justify-start w-full"
      >
        <div className="w-full flex flex-col space-y-2 items-center md:w-[217px]">
          {['/images/NASRY_ASFURA.jpg', '/images/RIXI_MONCADA.jpg']
            .slice(0, 2)
            .map((candidateImage, i) => (
              <img
                key={i}
                src={candidateImage}
                alt={poll.title}
                className="w-[90px] h-[135px] rounded-[20px] object-cover"
              />
            ))}
        </div>

        <div
          className="w-full h-[257px] gap-[14px] rounded-[24px] space-y-5
                md:w-[352px] md:h-[280px] bg-white bg-opacity-10 backdrop-blur-sm px-[15px] py-[18px] md:px-[22px]
                shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          <h1 className="text-[18px] font-[600px] capitalize">
            {truncate({ text: poll.title, startChars: 30, endChars: 0, maxLength: 33 })}
          </h1>
          <p className="text-[14px] font-[400px]">
            {truncate({ text: poll.description, startChars: 104, endChars: 0, maxLength: 107 })}
          </p>

          <div className="flex justify-between items-center gap-[8px]">
            <div
              className="h-[26px] bg-white bg-opacity-20 backdrop-blur-sm rounded-full py-[4px] px-[12px]
                text-[12px] font-[400px]"
            >
              {formatDate(poll.startsAt)}
            </div>

            <div className="h-[32px] w-[119px] gap-[5px] flex items-center">
              <div className="h-[32px] w-[32px] rounded-full bg-white bg-opacity-20 backdrop-blur-sm" />
              <p className="text-[12px] font-[400px]">
                {truncate({ text: poll.director, startChars: 4, endChars: 4, maxLength: 11 })}
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate.push('/polls/' + poll.id)}
            className="h-[44px] w-full rounded-full transition-all duration-300 bg-[#1B5CFE] hover:bg-blue-500"
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  )
}

export default Polls
