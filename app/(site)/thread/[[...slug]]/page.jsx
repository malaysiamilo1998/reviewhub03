'use client'

import { LuRefreshCcw } from 'react-icons/lu'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import ReactLoading from 'react-loading'
import { getThreadById, getPostsByThreadId } from '@/utils/create-post'
import { useParams } from 'next/navigation'
import config from '@/sanity.config'
import { PortableText } from '@portabletext/react'
import { useNextSanityImage } from 'next-sanity-image'
import { urlFor } from '@/utils/sanity'

import Link from 'next/link'
import { useForm, useController } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import ErrorMsg from '@/components/error/error-message'
import { useSession } from 'next-auth/react'
import { replyComment } from '@/utils/rating-comment'

const myPortableTextComponents = {
  types: {
    image: ({ value }) => {
      return <SanityImage {...value} />
    }
  }
}

const SanityImage = ({ asset }) => {
  const imageProps = useNextSanityImage(config, asset)

  if (!imageProps) return null

  return (
    <Image
      className='border-1 rounded-lg mt-10'
      {...imageProps}
      layout='responsive'
      sizes='(max-width: 800px) 100vw, 800px'
    />
  )
}

const ThreadList = () => {
  const params = useParams()
  const [thread, setThread] = useState()
  const [posts, setPosts] = useState([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showDelForm, setDelForm] = useState(false)
  const [showCreateLoading, setShowCreateLoading] = useState(false)
  const [showCreateLoadingDel, setShowCreateLoadingDel] = useState(false)
  const [updateIncrementor, setUpdateIncrementor] = useState(0)
  const { data: session } = useSession()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch
    // control
  } = useForm()

  const {
    register: registerDel,
    formState: { errors: errorsDel },
    reset: resetDel,
    setValue: setValueDel,
    handleSubmit: handleSubmitDel
  } = useForm()

  const threadRef = params.slug ? params.slug[0] : ''

  const newReply = async (data, event) => {
    event.preventDefault()

    setShowCreateLoading(true)
    await replyComment(session, threadRef, data.comment)
    setShowCreateLoading(false)
    setUpdateIncrementor(updateIncrementor + 1)
    setShowCreateForm(false)
    reset()
  }

  useEffect(() => {
    ;(async () => {
      const threadlist = await getThreadById(threadRef)
      setThread(threadlist)
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      // console.log('retrieve posts')
      const postlist = await getPostsByThreadId(threadRef)
      setPosts(postlist)
    })()
  }, [updateIncrementor])

  return (
    <div className=''>
      {showCreateForm ? (
        <div className='z-10 lg:w-2/3 xl:w-4/5 w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg m-5 p-5 shadow-2xl'>
          <div className='flex justify-end items-center m-3 '>
            <button
              className='p-1 flex justify-end items-center rounded-lg border-2'
              onClick={() => {
                setShowCreateForm(false)
              }}
            >
              <AiOutlineCloseCircle />
            </button>
          </div>
          <form onSubmit={handleSubmit(newReply)}>
            <div className=''>
              <p className='py-3 '>Show your idea with us!</p>
              <textarea
                placeholder='Reply your comment here'
                className='w-full h-72 border-2 p-2'
                {...register('comment', {
                  required: 'Content is compulsory',
                  pattern: {
                    value:
                      /^[a-zA-Z0-9$()%.,;:!?()\[\]{}\u4e00-\u9fa5\u3040-\u309F\u30A0-\u30FF \t]+$/i,
                    message:
                      'Invalid content, only A-Z, a-z, 0-9, and punctuations white space are acceptable'
                  }
                })}
              ></textarea>
              <ErrorMessage
                errors={errors}
                name='comment'
                render={({ message }) => <ErrorMsg msg={message} />}
              />
            </div>

            <div className='flex justify-start items-center'>
              <button
                type='submit'
                className='gap-3 outline outline-offset-2 outline-1  px-2 py-1 mx-1 rounded-lg hover:bg-rose-100 text-sm '
              >
                Reply
              </button>
              {showCreateLoading ? (
                <ReactLoading type='cubes' color='black' className='' />
              ) : (
                <></>
              )}
            </div>
          </form>
        </div>
      ) : (
        <></>
      )}
      {thread !== undefined && thread !== null && thread.length > 0 ? (
        <div className='flex flex-col justify-start items-start w-full'>
          <div className='flex justify-start gap-3'>
            {/* <Image src={} /> */}
            <div className='text-blue-700 text-lg p-2 m-2'>
              {thread[0].title}
            </div>
          </div>

          <div className='border-2 p-2 m-2 shadow-lg'>
            <PortableText
              value={thread[0].content}
              components={myPortableTextComponents}
            />
          </div>
          {session?.user ? (
            <div className=' flex  justify-start gap-5 p-2 m-2'>
              <Image
                src='/assets/images/heart-gray.svg'
                alt='heart'
                width={24}
                height={24}
                className='cursor-pointer object-contain'
              />

              <button
                onClick={e => {
                  setShowCreateForm(true)
                }}
              >
                <Image
                  src='/assets/images/reply.svg'
                  alt='reply'
                  width={24}
                  height={24}
                  className='cursor-pointer object-contain'
                />
              </button>
            </div>
          ) : (
            <>
              <Link className='border-2 shadow-lg p-1' href='/api/auth/signin'>
                Login in to comment
              </Link>
            </>
          )}

          <div className='w-full '>
            {posts !== undefined && posts !== null && posts.length > 0 ? (
              <>
                <div className='flex justify-end items-center p-3'>
                  <button
                    className='flex justify-end items-center'
                    onClick={e => {
                      setUpdateIncrementor(updateIncrementor + 1)
                    }}
                  >
                    <LuRefreshCcw />
                  </button>
                </div>
                {posts.map(p => {
                  return (
                    <div
                      key={p._id}
                      className='flex flex-col justify-start items-start shadow-lg border-2 w-full p-3 gap-3'
                    >
                      <div className='flex justify-start gap-5 '>
                        <div className='flex flex-col justify-start items-start border-2 shadow-lg p-2'>
                          <div>
                            <Image
                              width='35'
                              height='35'
                              alt='profile image'
                              src={
                                p.author_avatar !== undefined &&
                                p.author_avatar !== null
                                  ? urlFor(p.author_avatar)
                                      .width(35)
                                      .height(35)
                                      .url()
                                  : '/assets/images/default_review_avatar.png'
                              }
                            />
                          </div>
                          <span>{`${p.author}`}</span>
                        </div>
                        <div>{p.comment}</div>
                      </div>
                      <hr />
                      <div className='flex justify-start items-center gap-5 '>
                        {p.author_id == session?.user.id ? (
                          <>
                            <Image
                              src='/assets/images/edit.svg'
                              alt='edit comment'
                              width={24}
                              height={24}
                            />
                            <button
                              onClick={e => {
                                setDelReply(`${p._id}`)
                              }}
                            >
                              <Image
                                src='/assets/images/delete.svg'
                                alt='delete comment'
                                width={24}
                                height={24}
                              />
                            </button>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  )
                })}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <div>Somthing Wrong !</div>
      )}
    </div>
  )
}

export default ThreadList
