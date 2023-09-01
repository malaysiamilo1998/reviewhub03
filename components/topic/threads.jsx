import { useState, useEffect } from 'react'
import { getThreads, toPlainText } from '@/utils/create-post'
import Image from 'next/image'
import { urlFor } from '@/utils/sanity'
import Link from 'next/link'
import { FaClipboardUser } from 'react-icons/fa6'
import { MdDateRange } from 'react-icons/md'
import config from '@/sanity.config'
import { PortableText } from '@portabletext/react'
import { useNextSanityImage } from 'next-sanity-image'

const Threads = ({ routeUri, renderCount }) => {
  const [threads, setThreads] = useState([])
  useEffect(() => {
    console.log(`rerun threads ${routeUri} : ${renderCount}`)
    ;(async () => {
      const dataThreads = await getThreads(
        routeUri !== undefined && routeUri !== null && routeUri.length > 0
          ? routeUri[routeUri.length - 1]
          : ''
      )
      console.log('data threads')
      console.log(dataThreads)
      setThreads(dataThreads)
    })()
  }, [renderCount])

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
                <div className='m-3'>
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
                <div className=' flex flex-col gap-3'>
                  <div className='text-md'>
                    <Link href={`/thread/${thread._id}`}>{thread.title}</Link>
                  </div>
                  <div className='text-base'>{thread.desc}</div>
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
}

export default Threads
