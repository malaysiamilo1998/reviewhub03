'use client'
import { client } from '@/utils/sanity'
import { useSession } from 'next-auth/react'
import { RateFormHeart } from './rate-form-heart'
import { useRef, useState, useEffect } from 'react'

import { VscChromeClose } from 'react-icons/vsc'

import { createComment } from '@/utils/rating-comment'
import ReactLoading from 'react-loading'

// import QuillEditor from '@/components/editor/quil'

const getRatingCriteria = async userId => {
  console.log('userID=>' + userId)
  const rateKeys = await client.fetch(`*[_type=="rateKey"]{
    _id, 
    criteria, 
    internalref
  }`)

  const myRate =
    await client.fetch(`*[_type=="usercomment" && references('${userId}')]{
    _id, 
    comment, 
    overallrating, 
    "ratings": *[_type=="userrating" && user->_id == ^.user->_id]{
      _id, 
      rating, 
      "rateKey": ratecriteria->criteria, 
      "rateKeyRef": ratecriteria->internalref
    }
  }`)

  console.log([rateKeys ? rateKeys : [], myRate ? myRate : []])
  return [rateKeys ? rateKeys : [], myRate ? myRate : []]
}

const RatingForm = ({ company, value, hideHandler, overallRatingAVG }) => {
  const [rateKeys, setRateKeys] = useState([])
  const [showForm, setShowForm] = useState(true)
  const [submitLoading, setSubmitLoading] = useState(false)
  const { data: session } = useSession()
  const quillRef = useRef()
  useEffect(() => {
    ;(async () => {
      if (session != undefined) {
        const rateCriteria = await getRatingCriteria(session.user.id)
        if (rateCriteria[1] !== undefined && rateCriteria[1][0] !== undefined) {
          rateCriteria[1][0].ratings.map(rate => {
            if (rate.rateKeyRef == 'cs') cs.current.value = rate.rating
            if (rate.rateKeyRef == 'bns') bns.current.value = rate.rating
            if (rate.rateKeyRef == 'wth') wth.current.value = rate.rating
            if (rate.rateKeyRef == 'vog') vog.current.value = rate.rating
            if (rate.rateKeyRef == 'wd') wd.current.value = rate.rating
            if (rate.rateKeyRef == 'dps') dps.current.value = rate.rating
          })
        }
        setRateKeys(rateCriteria)
      }
    })()
  }, [])
  const submitRatingForm = async company => {
    setSubmitLoading(true)
    await createComment(
      cs,
      bns,
      wth,
      vog,
      wd,
      dps,
      comment,
      // quillRef,
      rateKeys[0],
      company,
      session
    )

    const rateCriteria = await getRatingCriteria(session.user.id)
    console.log('create new comment and refresh rating')
    setRateKeys(rateCriteria)
    setSubmitLoading(false)
    setShowForm(false)
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
    console.log('vog=>' + val)
    vog.current.value = val
  }
  const wd = useRef()
  const wdHandler = val => {
    console.log('wd=>' + val)
    wd.current.value = val
  }
  const dps = useRef()
  const dpsHandler = val => {
    console.log('dps=>' + val)
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
              {showForm ? (
                <form noValidate className='w-full'>
                  <input type='hidden' ref={cs} />
                  <input type='hidden' ref={bns} />
                  <input type='hidden' ref={wth} />
                  <input type='hidden' ref={vog} />
                  <input type='hidden' ref={wd} />
                  <input type='hidden' ref={dps} />
                  {rateKeys[1] !== undefined ? (
                    <div className=''>
                      <RateFormHeart
                        label={`Customer Service`}
                        handler={csHandler}
                        heartCount={
                          rateKeys[1] !== undefined &&
                          rateKeys[1][0] !== undefined
                            ? rateKeys[1][0].ratings.find(
                                rate => rate.rateKeyRef == 'cs'
                              )
                            : 0
                        }
                      />
                      <RateFormHeart
                        label={`Bonuses`}
                        handler={bnsHandler}
                        heartCount={
                          rateKeys[1] !== undefined && rateKeys[1][0]
                            ? rateKeys[1][0].ratings.find(
                                rate => rate.rateKeyRef == 'bns'
                              )
                            : 0
                        }
                      />
                      <RateFormHeart
                        label={`Withdraw`}
                        handler={wthHandler}
                        heartCount={
                          rateKeys[1] !== undefined &&
                          rateKeys[1][0] != undefined
                            ? rateKeys[1][0].ratings.find(
                                rate => rate.rateKeyRef == 'wth'
                              )
                            : 0
                        }
                      />
                      <RateFormHeart
                        label={`Variery of game`}
                        handler={vogHandler}
                        heartCount={
                          rateKeys[1] !== undefined &&
                          rateKeys[1][0] != undefined
                            ? rateKeys[1][0].ratings.find(
                                rate => rate.rateKeyRef == 'vog'
                              )
                            : 0
                        }
                      />
                      <RateFormHeart
                        label={`Website Design`}
                        handler={wdHandler}
                        heartCount={
                          rateKeys[1] !== undefined &&
                          rateKeys[1][0] != undefined
                            ? rateKeys[1][0].ratings.find(
                                rate => rate.rateKeyRef == 'wd'
                              )
                            : 0
                        }
                      />
                      <RateFormHeart
                        label={`Deposit`}
                        handler={dpsHandler}
                        heartCount={
                          rateKeys[1] !== undefined &&
                          rateKeys[1][0] != undefined
                            ? rateKeys[1][0].ratings.find(
                                rate => rate.rateKeyRef == 'dps'
                              )
                            : 0
                        }
                      />
                    </div>
                  ) : (
                    <></>
                  )}

                  <div className='flex justify-end'>
                    <div className=''>
                      {/* <QuillEditor quillRef={quillRef} /> */}
                      {rateKeys[1] !== undefined ? (
                        <textarea
                          className='shadow appearance-none border rounded w-full py-2 px-3 my-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                          type='text'
                          name='rating_comment'
                          onClick={() => {
                            makeTextAreaFocu()
                          }}
                          ref={comment}
                          placeholder='Please leave your comment here'
                        >
                          {rateKeys[1][0] != undefined
                            ? rateKeys[1][0].comment
                            : ''}
                        </textarea>
                      ) : (
                        <></>
                      )}
                      <div className='flex justify-start'>
                        <button
                          className='bg-transparent hover:bg-pink-500 text-pink-700 font-semibold hover:text-white py-1 px-1 border border-pink-500 hover:border-transparent rounded'
                          onClick={() => {
                            hideHandler([false])
                          }}
                        >
                          Close
                        </button>
                        <div className='flex justify-start'>
                          <button
                            className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-1 border border-blue-500 hover:border-transparent rounded mx-3'
                            onClick={e => {
                              e.preventDefault()
                              submitRatingForm(company)
                            }}
                          >
                            Save
                          </button>
                          {submitLoading ? (
                            <ReactLoading
                              width={50}
                              height={25}
                              color={`#000000`}
                            />
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              ) : (
                <p className='text-lg flex-col justify-center items-center'>
                  Thanks for rating us!
                </p>
              )}
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
