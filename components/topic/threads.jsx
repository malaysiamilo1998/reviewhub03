import { useState, useEffect } from 'react'
import { getThreads } from '@/utils/create-post'
import Image from 'next/image'
import { urlFor } from '@/utils/sanity'
import Link from 'next/link'
import { FaClipboardUser } from 'react-icons/fa6'
import { MdDateRange } from 'react-icons/md'
const Threads = ({ routeUri }) => {
  const [threads, setThreads] = useState([])
  if (routeUri?.length > 0) {
    useEffect(() => {
      ;(async () => {
        const dataThreads = await getThreads(routeUri[routeUri.length - 1])
        // console.log('data threads')
        // console.log(dataThreads)
        setThreads(dataThreads)
      })()
    }, [])

    return (
      <div className='flex flex-col justify-start gap-3 items-start '>
        {threads.length > 0 ? (
          <>
            {threads.map(thread => {
              return (
                <div
                  className='flex justify-start gap-3 text-black shadow-sm bg-slate-50 w-full'
                  key={thread._id}
                >
                  <div>
                    <Image
                      src={
                        thread.author_avatar
                          ? urlFor(thread.author_avatar)
                              .width(35)
                              .height(35)
                              .url()
                          : '/assets/images/default_review_avatar.png'
                      }
                      width='35'
                      height='35'
                      alt="member's avatar"
                    />
                  </div>
                  <div className='text-base flex flex-col gap-3'>
                    <div>{thread.title}</div>
                    <hr />
                    <div className='flex justify-start items-center'>
                      <Link
                        href={`/profile/${thread.author_id}`}
                        className='flex justify-start items-center gap-3 m-3 text-sm'
                      >
                        <FaClipboardUser />
                        {thread.author}
                      </Link>

                      <div className='flex justify-start gap-3 items-center text-sm'>
                        <MdDateRange />
                        <span>{thread._createdAt}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </>
        ) : (
          <>No discussion for this topic!</>
        )}
      </div>
    )
  } else {
    return <>No discussion for this topic!</>
  }
}

export default Threads
