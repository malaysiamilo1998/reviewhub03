import { useState, useEffect } from 'react'
import { client, urlFor } from '@/utils/sanity'
import Link from 'next/link'
import Image from 'next/image'
// import { GoCommentDiscussion } from 'react-icons/go'
import { FaCommentsDollar } from 'react-icons/fa6'
import SubTopic from './subtopic'
import { getTopics } from '@/utils/create-post'
import { useParams } from 'next/navigation'

const Topic = () => {
  const [topics, setTopics] = useState([])

  const params = useParams()

  const currentSlug =
    params.slug !== undefined && params.slug.length > 0
      ? params.slug[params.slug.length - 1]
      : ''
  console.log('current slug==>' + currentSlug)

  useEffect(() => {
    ;(async () => {
      const topics = await getTopics(currentSlug)
      setTopics(topics)
    })()
  }, [])
  // const topics = await getTopics();
  return (
    <div className='mr-1 border-2 border-inherit rounded-lg'>
      <div className='flex justify-start items-center'>
        <span className='p-2 text-lg font-medium'>Topics</span>
        <FaCommentsDollar />
      </div>

      {topics.map(topic => (
        <div key={topic._id} className='m-3'>
          <div className='hover:font-medium p-2 flex justify-start  border-t-2 border-solid'>
            <Image
              className=''
              src={urlFor(topic.image)
                .width(80)
                .height(80)
                .fit('crop')
                .crop('entropy')
                .url()}
              alt={topic.imgAlt}
              width={20}
              height={20}
            />
            <span className='pl-1'>
              <Link className='text-sm' href={`/discussion/${topic.slug}`}>
                {topic.title}
              </Link>
            </span>
          </div>
          {topic.subtopics ? (
            <div className='grid grid-cols-3 gap-1'>
              {topic.subtopics.map(subtopic => (
                <SubTopic
                  key={subtopic._id}
                  {...subtopic}
                  parentSlug={topic.title}
                />
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      ))}
    </div>
  )
}

export default Topic
