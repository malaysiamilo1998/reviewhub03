'use client'
import { createPost } from '@/utils/create-post'
import { useParams } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import ReactQuill from 'react-quill'
import Button from '@mui/material/Button'
import 'react-quill/dist/quill.snow.css'
import { useForm, useController } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import ReactLoading from 'react-loading'
import ImageUploading from 'react-images-uploading'
import { AiOutlineCloseCircle } from 'react-icons/ai'

import { getSingleTopicRef } from '@/utils/create-post'

const TopicAggregator = () => {
  const [content, setContent] = useState()
  const [currentTopicRef, setCurrentTopicRef] = useState()
  const params = useParams()

  // useEffect(() => {
  //   ;(async () => {
  //     if (params.slug != undefined && params.slug.length > 0) {
  //       const slug = params.slug[params.slug.length - 1]
  //       console.log('current slug=>' + slug)
  //       const currentTopicRef = await getSingleTopicRef(slug)
  //       const ref =
  //         currentTopicRef[0] == undefined
  //           ? null
  //           : "'" + currentTopicRef[0]._id + "'"
  //       const singleLevelTopics = await getSigleLevelTopics(ref)
  //       if (singleLevelTopics[0] !== undefined) {
  //         setCurrentTopicRef(singleLevelTopics)
  //       }
  //     }
  //   })()
  // }, [])

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
        <div className='z-10 lg:w-2/3 xl:w-4/5 w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg m-5 p-5'>
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
              <label htmlFor='subject'>Subject</label>
              <input
                id='subject'
                className='w-full border-2 rounded-lg mx-3 p-2'
                {...register('subject', {
                  required: 'Subject is compulsory',
                  pattern: {
                    value: /^[a-zA-Z0-9\s\p{P}]+$/i,
                    message:
                      'Invalid subject, only A-Z, a-z, 0-9, and punctuations white space are acceptable'
                  }
                })}
              />
            </div>

            <div className=''>
              {/* <ReactQuill
                theme='snow'
                value={content}
                className='h-72 box-border '
                ref={contentRef}
                onChange={() => {}}
              /> */}
              <textarea
                className='w-full h-72 border-2'
                {...register('content', {
                  required: 'Content is compulsory',
                  pattern: {
                    value: /^[a-zA-Z0-9\s\p{P}]+$/i,
                    message:
                      'Invalid content, only A-Z, a-z, 0-9, and punctuations white space are acceptable'
                  }
                })}
              ></textarea>
            </div>
            <div>
              <button
                type='submit'
                className='outline outline-offset-2 outline-1  px-2 py-1 mx-1 rounded-lg hover:bg-rose-100 text-sm '
              >
                Create
              </button>
            </div>
            <div>
              <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey='data_url'
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageRemoveAll,
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps
                }) => (
                  // write your building UI
                  <div>
                    <button
                      className='p-10 border-2 rounded-lg m-5'
                      style={isDragging ? { color: 'red' } : undefined}
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      Click or Drop here
                    </button>
                    &nbsp;
                    <button
                      onClick={onImageRemoveAll}
                      className='p-10 border-2 rounded-lg m-5'
                    >
                      Remove all images
                    </button>
                    <div className='flex-col justify-start items-center gap-1  '>
                      {imageList.map((image, index) => (
                        <div key={index} className='image-item'>
                          <img
                            src={image['data_url']}
                            alt=''
                            width='300'
                            className=''
                          />
                          <div className='flex justify-between gap-1 border-2'>
                            <button
                              className='border-2 rounded-lg p-2 m-2'
                              onClick={() => onImageUpdate(index)}
                            >
                              Update
                            </button>
                            <button
                              onClick={() => onImageRemove(index)}
                              className='border-2 rounded-lg p-2 m-2'
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </ImageUploading>
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
