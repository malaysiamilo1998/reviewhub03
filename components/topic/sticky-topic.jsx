import { useParams } from 'next/navigation'
const StickyTopic = ({ currentLevelTopics }) => {
  const params = useParams()
  if (params.slug != undefined && params.slug.length > 0) {
    return (
      <div className='flex justify-start'>
        {currentLevelTopics.length > 0 ? (
          <>
            {currentLevelTopics[0].subtopics.map(tpic => {
              return (
                <div
                  key={tpic._id}
                  className='text-sm border-2 rounded-lg  hover:bg-gray-500 hover:text-white cursor-pointer'
                >
                  {tpic.title}
                </div>
              )
            })}
          </>
        ) : (
          <></>
        )}
      </div>
    )
  } else {
    return (
      <div className='flex gap-3'>
        {currentLevelTopics.length > 0 ? (
          <>
            {currentLevelTopics.map(tpic => {
              return (
                <div
                  key={tpic._id}
                  className='text-sm border-2 rounded-lg p-3 hover:bg-gray-500 hover:text-white cursor-pointer'
                >
                  {tpic.title}
                </div>
              )
            })}
          </>
        ) : (
          <></>
        )}
      </div>
    )
  }
}

export default StickyTopic
