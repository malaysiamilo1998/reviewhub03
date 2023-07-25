import Link from 'next/link'

const SubTopic = ({ _id, title, slug, image }) => {
  return (
    <div key={_id} className=''>
      <span className='pl-1 text-sm'>{title}</span>
    </div>
  )
}

export default SubTopic
