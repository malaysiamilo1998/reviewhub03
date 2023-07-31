import Image from 'next/image'
import Link from 'next/link'
import { VscLink } from 'react-icons/vsc'
import { PortableText } from '@portabletext/react'
import MinimizeRating from '@/components/rating/minimize_rating'
import { Box } from '@mui/material'
import { useNextSanityImage } from 'next-sanity-image'
import config from '@/sanity.config'

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

const CompanyDetails = ({ company }) => {
  console.log(company)
  return (
    <>
      <div className='flex justify-start relative'>
        <div className='flex justify-start '>
          {company.logo ? (
            <div className='hidden sm:block'>
              <Image
                // className='object-cover'
                src={company.logo}
                width={150}
                height={150}
              />
            </div>
          ) : (
            <></>
          )}
          {company.contact ? (
            <div className=' '>
              {company.contact.map(con => {
                return (
                  <div key={company.contact}>
                    <div className='flex justify-start p-3 items-center border-2 rounded-lg m-1'>
                      <Image src={con.channel_logo} width={30} height={30} />
                      <span className='pl-1 text-sm'>{con.value}</span>
                    </div>
                  </div>
                )
              })}{' '}
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className='hidden sm:flex'>
          <MinimizeRating overall={{ mark: 4.5 }} company={company._id} />
        </div>

        {company.backupurls ? (
          <div className='pl-2'>
            {/* <span className='text-sm font-extrabold'>Backup Urls</span> */}
            {company.backupurls.map(url => {
              return (
                <div className='flex justify-start items-center p-3 border-2 rounded-lg m-1'>
                  <Link href={url} className='font-extralight pl-1 text-sm'>
                    Backup Url
                  </Link>
                  <VscLink size='' />
                  <Box width={20} height={30}></Box>
                </div>
              )
            })}
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className='p-5 shawdow-lg border-2 rounded-3xl'>
        <PortableText
          value={company.desc}
          components={myPortableTextComponents}
        />
      </div>
    </>
  )
}
export default CompanyDetails
