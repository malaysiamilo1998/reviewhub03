'use client'
import { useState, useEffect } from 'react'
import { getThreadById } from '@/utils/create-post'
import { useParams } from 'next/navigation'

const ThreadList = () => {
  const params = useParams()
  const [thread, setThread] = useState()
  const threadRef = params.slug ? params.slug[0] : ''

  useEffect(() => {
    ;(async () => {
      const threadlist = await getThreadById(threadRef)
      setThread(threadlist)
    })()
  }, [])

  return (
    <>
      {thread !== undefined && thread !== null && thread.length > 0 ? (
        <div className='flex justify-start'>
          <div>{thread[0].title}</div>
          <div></div>
        </div>
      ) : (
        <div>Somthing Wrong !</div>
      )}
    </>
  )
}

export default ThreadList
