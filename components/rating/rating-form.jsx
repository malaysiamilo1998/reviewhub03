'use client'
import { client } from '@/utils/sanity'
import { useSession } from 'next-auth/react'
import { RateFormHeart } from './rate-form-heart'
import { useRef, useState, useEffect } from 'react'

import { VscChromeClose } from 'react-icons/vsc'

import { createComment } from '@/utils/rating-comment'

import QuillEditor from '@/components/editor/quil'

const getRatingCriteria = async () => {
  const rateKeys = await client.fetch(`*[_type=="rateKey"]{
    _id, 
    criteria, 
    internalref
  }`)

  return rateKeys
}

const RatingForm = ({ company, value, hideHandler }) => {
  const [rateKeys, setRateKeys] = useState([])
  const { data: session } = useSession()
  const quillRef = useRef()
  useEffect(() => {
    ;(async () => {
      const rateCriteria = await getRatingCriteria()
      setRateKeys(rateCriteria)
    })()
  }, [])
  const submitRatingForm = async company => {
    await createComment(
      cs,
      bns,
      wth,
      vog,
      wd,
      dps,
      comment,
      // quillRef,
      rateKeys,
      company,
      session
    )
  }
  const cs = useRef()
  const csHandler = val => {
    cs.current.value = val
  }
  const bns = useRef()
  const bnsHandler = val => {
    bns.current.value = val
  }
  const wth = useRef()
  const wthHandler = val => {
    wth.current.value = val
  }
  const vog = useRef()
  const vogHandler = val => {
    vog.current.value = val
  }
  const wd = useRef()
  const wdHandler = val => {
    wd.current.value = val
  }
  const dps = useRef()
  const dpsHandler = val => {
    dps.current.value = val
  }
  const comment = useRef()
  const makeTextAreaFocu = () => {
    // comment.current.value = ''
  }

  return (
    <>
      <div className='bg-gradient-to-r from-rose-100 to-teal-100 rounded-lg border-2 shadow-2xl'>
        <div className='flex justify-end items-center'>
          <button
            className='p-1 text-lg rounded-lg'
            onClick={() => {
              hideHandler([false])
            }}
          >
            <VscChromeClose />
          </button>
        </div>
        {session?.user ? (
          <>
            <div className=' p-5 flex justify-center'>
              <form noValidate className='w-full'>
                <input type='hidden' ref={cs} />
                <input type='hidden' ref={bns} />
                <input type='hidden' ref={wth} />
                <input type='hidden' ref={vog} />
                <input type='hidden' ref={wd} />
                <input type='hidden' ref={dps} />

                <div className=''>
                  <RateFormHeart
                    label={`Customer Service`}
                    handler={csHandler}
                  />
                  <RateFormHeart label={`Bonuses`} handler={bnsHandler} />
                  <RateFormHeart label={`Withdraw`} handler={wthHandler} />
                  <RateFormHeart
                    label={`Variery of game`}
                    handler={vogHandler}
                  />
                  <RateFormHeart label={`Website Design`} handler={wdHandler} />
                  <RateFormHeart label={`Deposit`} handler={dpsHandler} />
                </div>

                <div className='flex justify-end'>
                  <div className=''>
                    {/* <QuillEditor quillRef={quillRef} /> */}
                    <textarea
                      className='shadow appearance-none border rounded w-full py-2 px-3 my-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      type='text'
                      name='rating_comment'
                      onClick={() => {
                        makeTextAreaFocu()
                      }}
                      ref={comment}
                      placeHolder='Please leave your comment here'
                    >
                      Generally good!
                    </textarea>
                    <button
                      className='bg-transparent hover:bg-pink-500 text-pink-700 font-semibold hover:text-white py-1 px-1 border border-pink-500 hover:border-transparent rounded'
                      onClick={() => {
                        hideHandler([false])
                      }}
                    >
                      Close
                    </button>
                    <button
                      className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-1 border border-blue-500 hover:border-transparent rounded mx-3'
                      onClick={e => {
                        e.preventDefault()
                        submitRatingForm(company)
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </>
        ) : (
          <div className='w-full h-full text-sm p-5 m-5 font-extrabold flex justify-center items-center'>
            please Login
          </div>
        )}
      </div>
    </>
  )
}

export default RatingForm
