import Link from 'next/link'

const SubTopic = ({ _id, title, slug, image, parentSlug }) => {
  return (
    <div className=''>
      <span className='pl-1 text-sm'>
        <Link className='text-sm' href={`/discussion/${parentSlug}/${slug}`}>
          {title}
        </Link>
      </span>
    </div>
  )
}

export default SubTopic
