import { useState, useEffect } from 'react'
import { client, urlFor } from '@/utils/sanity'
import Link from 'next/link'
import Image from 'next/image'
// import { GoCommentDiscussion } from 'react-icons/go'
import { FaCommentsDollar } from 'react-icons/fa6'
import SubTopic from './subtopic'

export const getTopics = async () => {
  const topics =
    await client.fetch(`*[_type=="topic" && parentTopic._ref == null ]{
     _id, 
     _createdAt, 
     title, 

     "subtopics": *[
      _type == "topic" &&
      references(^._id)
    ]{
      _id, 
     _createdAt, 
     title, 
     "slug": slug.current, 
     "image": image.asset->url, 
     "imgAlt": image.asset->alt, 
    }, 
     
     "slug": slug.current, 
     "image": image.asset->url, 
     "imgAlt": image.asset->alt, 
    }`)
  return topics
}

const Topic = () => {
  const [topics, setTopics] = useState([])

  useEffect(() => {
    ;(async () => {
      const topics = await getTopics()
      setTopics(topics)
    })()
  }, [])
  // const topics = await getTopics();
  return (
    <div className='mr-1 border-2 border-inherit rounded-lg flex-1'>
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
            <span className='pl-1'>{topic.title}</span>
          </div>
          {topic.subtopics ? (
            <div className='grid grid-cols-3 gap-1'>
              {topic.subtopics.map(subtopic => (
                <SubTopic {...subtopic} />
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
