import { useState, useEffect } from 'react'
import { client, urlFor } from '@/utils/sanity'
import Link from 'next/link'
import Image from 'next/image'
// import { GoCommentDiscussion } from 'react-icons/go'
import { FaCommentsDollar } from 'react-icons/fa6'

export const getSubTopics = async parentId => {
  console.log('parent slug : ' + parentId)
  const subTopics =
    await client.fetch(`*[_type=="topic" && references("${parentId}")]{
     _id, 
     _createdAt, 
     title, 
     
     "slug": slug.current, 
     "image": image.asset->url, 
     "imgAlt": image.asset->alt, 
    }`)
  return subTopics
}

const SubTopic = ({ parentId }) => {
  const [subTopics, setSubTopics] = useState([])

  useEffect(() => {
    ;(async () => {
      const subTopics = await getSubTopics(parentId)

      setSubTopics(subTopics)
    })()
  }, [])
  // const topics = await getTopics();
  if (subTopics.length)
    return (
      <div className='grid grid-cols-3 gap-1'>
        {subTopics.map(subTopic => (
          <div key={subTopic._id} className=''>
            {/* <Image
              className=''
              src={urlFor(subTopic.image)
                .width(80)
                .height(80)
                .fit('crop')
                .crop('entropy')
                .url()}
              alt={subTopic.imgAlt}
              width={35}
              height={35}
            /> */}
            <span className='pl-1 text-sm'>{subTopic.title}</span>
          </div>
        ))}
      </div>
    )
  else <>no</>
}

export default SubTopic
