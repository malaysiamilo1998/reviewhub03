'use client'
import { useParams } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
// import ReactQuill from 'react-quill'
import Button from '@mui/material/Button'
import 'react-quill/dist/quill.snow.css'
import { useForm, useController } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
// import ReactLoading from 'react-loading'
// import ImageUploading from 'react-images-uploading'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import StickyTopic from '@/components/topic/sticky-topic'
import ErrorMsg from '@/components/error/error-message'

import { getSingleTopicRef, getTopicsToplevelLight } from '@/utils/create-post'

const TopicAggregator = () => {
  const [content, setContent] = useState()
  const [currentTopicRef, setCurrentTopicRef] = useState([])
  const params = useParams()

  useEffect(() => {
    ;(async () => {
      if (params.slug != undefined && params.slug.length > 0) {
        const slug = params.slug[params.slug.length - 1]

        const currentTopicRef = await getSingleTopicRef(slug)
        if (currentTopicRef.length < 1) {
          /// go to page 404
        }
        const ref =
          currentTopicRef.length > 0 ? "'" + currentTopicRef[0]._id + "'" : null

        //
        const singleLevelTopics = await getTopicsToplevelLight(slug)

        console.log('current slug=>=><<<' + ref)
        console.log(singleLevelTopics)

        if (singleLevelTopics.length > 0) {
          console.log('rerun! Page')
          console.log(singleLevelTopics)
          setCurrentTopicRef(singleLevelTopics)
        }
      } else {
        const singleLevelTopics = await getTopicsToplevelLight('')
        console.log('gettopiclight')
        console.log(singleLevelTopics)
        if (singleLevelTopics !== undefined) {
          setCurrentTopicRef(singleLevelTopics)
        }
      }
    })()
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
    // control
  } = useForm()

  const [images, setImages] = useState([])
  const maxNumber = 69

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex)
    setImages(imageList)
  }

  // const { field } = useController({ name: 'gender', control })
  const [showCreatePostForm, setShowCreatePostForm] = useState(false)
  const contentRef = useRef()

  const createNewPostSubmit = (data, event) => {
    const newContent = contentRef.current.getEditor().getText()
    setContent(newContent)
    event.preventDefault()
    const newPostData = {
      ...data,
      content: newContent
    }
    console.log('newpost==>')
    console.log(newPostData)
  }

  return (
    <div className='h-full w-full'>
      {showCreatePostForm ? (
        // <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-rose-100 via-rose-200 to-rose-200 p-5 rounded-lg'>
        <div className='z-10 lg:w-2/3 xl:w-4/5 w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg m-5 p-5 shadow-2xl'>
          <div className='flex justify-end items-center m-3 '>
            <button
              className='p-1 flex justify-end items-center rounded-lg border-2'
              onClick={() => {
                setShowCreatePostForm(false)
              }}
            >
              <AiOutlineCloseCircle />
            </button>
          </div>
          <form onSubmit={handleSubmit(createNewPostSubmit)}>
            <div className='flex justify-start items-center mb-3'>
              <div>
                <select
                  {...register('topicRef', {
                    required: 'Please select a Topic'
                  })}
                >
                  <option selected value=''>
                    Select a topic
                  </option>
                  {currentTopicRef.length > 0 ? (
                    <>
                      {currentTopicRef.map(topic => (
                        <option key={topic._id} value={topic._id}>
                          {topic.title}
                        </option>
                      ))}
                    </>
                  ) : (
                    <></>
                  )}
                </select>
                <ErrorMessage
                  errors={errors}
                  name='topicRef'
                  render={({ message }) => <ErrorMsg msg={message} />}
                />
              </div>
            </div>
            <div className='flex justify-start items-center mb-3'>
              {/* <label htmlFor='subject'>Subject</label> */}
              <div className='w-full'>
                <input
                  placeholder='Subject'
                  id='subject'
                  className='w-full border-2 rounded-lg p-2'
                  {...register('subject', {
                    required: 'Subject is compulsory',
                    pattern: {
                      value: /^[a-zA-Z0-9\s\p{P}]+$/i,
                      message:
                        'Invalid subject, only A-Z, a-z, 0-9, and punctuations white space are acceptable'
                    }
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name='subject'
                  render={({ message }) => <ErrorMsg msg={message} />}
                />
              </div>
            </div>

            <div className=''>
              <textarea
                placeholder='Content'
                className='w-full h-72 border-2 p-2'
                {...register('content', {
                  required: 'Content is compulsory',
                  pattern: {
                    value:
                      /^[a-zA-Z0-9$()%.,;:!?()\[\]{}\u4e00-\u9fa5\u3040-\u309F\u30A0-\u30FF]+$/i,
                    message:
                      'Invalid content, only A-Z, a-z, 0-9, and punctuations white space are acceptable'
                  }
                })}
              ></textarea>
              <ErrorMessage
                errors={errors}
                name='content'
                render={({ message }) => <ErrorMsg msg={message} />}
              />
            </div>
            <div>
              <button
                type='submit'
                className='outline outline-offset-2 outline-1  px-2 py-1 mx-1 rounded-lg hover:bg-rose-100 text-sm '
              >
                Create
              </button>
            </div>
          </form>
        </div>
      ) : (
        <></>
      )}
      {/* <div className='flex flex-col justify-between w-full'> */}
      <div className='w-full'>
        <div className='flex justify-end my-3'>
          <Button
            variant='outlined'
            size='small'
            color='success'
            onClick={() => {
              setShowCreatePostForm(true)
            }}
          >
            create post
          </Button>
        </div>
        <StickyTopic currentLevelTopics={currentTopicRef} />
        <div className='bg-gradient-to-r text-2xl from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent'>
          Threads
        </div>
        {/* <form>
          <div className='pb-12'>
            <ReactQuill
              theme='snow'
              className='h-72 box-border'
              value={value}
              onChange={setValue}
            />
          </div>
          <div>
            <button className='outline outline-offset-2 outline-1  px-2 py-1 mx-1 rounded-lg hover:bg-rose-100 text-sm '>
              Create
            </button>
          </div>
        </form> */}
      </div>
    </div>
  )
}

export default TopicAggregator
