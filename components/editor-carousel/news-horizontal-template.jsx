import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/utils/sanity'

export const NewsHorizontalTemplate = item => {
  return (
    <div className='flex justify-start items-center relative ' key={item._key}>
      {item.ads == true ? (
        <div className='absolute top-0 right-0 z-10  bg-opacity-40 bg-pink-500 p-2 text-white font-extrabold'>
          [sponsor]
        </div>
      ) : (
        <></>
      )}
      <div>
        <div className='flex flex-col items-center justify-start'>
          {
            <img
              src={
                item.image == null ? (
                  <></>
                ) : (
                  urlFor(item.image).width(628).height(372).url()
                )
              }
              width={628}
              height={372}
              alt='news photo'
              className=''
            />
          }

          <div>
            <p className='text-lg text-white px-3 absolute bottom-0 left-0 bg-opacity-40 bg-black p-3 h-15 '>
              {item.newstitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export const NewsVerticalTemplate = item => {
  return (
    <div key={item._key}>
      <div>
        <div className='relative'>
          <Image
            src={urlFor(item.image).width(326).height(170).url()}
            width={326}
            height={170}
            alt='new image'
          />
          <p className='absolute bottom-0 left-0 bg-opacity-40 bg-black p-3 h-15  '>
            <Link
              href={`/editor-recommend/${item._key}`}
              className='text-white'
            >
              {item.newstitle}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
