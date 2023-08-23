import { sanityEssentialConfig } from '@/sanity-config'

import axios from 'axios'
import { createClient } from 'next-sanity'

const projectId = sanityEssentialConfig.projectId
const dataset = sanityEssentialConfig.dataset
const tokenWithWriteAccess = sanityEssentialConfig.apiToken

const client = createClient(sanityEssentialConfig)

export const calOverAllRating = async company => {
  if (company == undefined) return false

  console.log('before overallRatingForCompany=>' + company)
  const overallRatingForCompany = await ratingStatsByCompany(company)

  if (overallRatingForCompany[0]) {
    let overallRatingSum = 0

    let overallVOGRatingSum = 0
    let overallBNSRatingSum = 0
    let overallCSRatingSum = 0
    let overallDPSRatingSum = 0
    let overallWDRatingSum = 0
    let overallWTHRatingSum = 0

    overallRatingForCompany[0].vog_sum.map(rate => {
      overallVOGRatingSum += rate.rating
      // overallRatingSum += rate.rating
    })
    overallRatingForCompany[0].bns_sum.map(rate => {
      overallBNSRatingSum += rate.rating
      // overallRatingSum += rate.rating
    })
    overallRatingForCompany[0].cs_sum.map(rate => {
      overallCSRatingSum += rate.rating
      // overallRatingSum += rate.rating
    })
    overallRatingForCompany[0].dps_sum.map(rate => {
      overallDPSRatingSum += rate.rating
      // overallRatingSum += rate.rating
    })
    overallRatingForCompany[0].wd_sum.map(rate => {
      overallWDRatingSum += rate.rating
      // overallRatingSum += rate.rating
    })
    overallRatingForCompany[0].wth_sum.map(rate => {
      overallWTHRatingSum += rate.rating
      // overallRatingSum += rate.rating
    })

    overallRatingForCompany[0].comment_sum.map(rate => {
      overallRatingSum += rate.overallrating
    })

    const overallRatingAVG =
      overallRatingSum / overallRatingForCompany[0].comment_count

    const overallVOGRatingAVG =
      overallVOGRatingSum / overallRatingForCompany[0].vog_count
    const overallBNSRatingAVG =
      overallBNSRatingSum / overallRatingForCompany[0].bns_count
    const overallCSRatingAVG =
      overallCSRatingSum / overallRatingForCompany[0].cs_count
    const overallDPSRatingAVG =
      overallDPSRatingSum / overallRatingForCompany[0].dps_count
    const overallWDRatingAVG =
      overallWDRatingSum / overallRatingForCompany[0].wd_count
    const overallWTHRatingAVG =
      overallWTHRatingSum / overallRatingForCompany[0].wth_count

    return [
      overallRatingAVG, //0
      overallVOGRatingAVG, //1
      overallBNSRatingAVG, //2
      overallCSRatingAVG, //3
      overallDPSRatingAVG, //4
      overallWDRatingAVG, //5
      overallWTHRatingAVG, //6
      overallRatingForCompany[0].comment_count, //7
      overallRatingForCompany[0].start5_comment_count, //8
      overallRatingForCompany[0].start4_comment_count, //9
      overallRatingForCompany[0].start3_comment_count, //10
      overallRatingForCompany[0].start2_comment_count, //11
      overallRatingForCompany[0].start1_comment_count, //12

      overallRatingForCompany[0].start5_comment_count +
        overallRatingForCompany[0].start4_comment_count +
        overallRatingForCompany[0].start3_comment_count +
        overallRatingForCompany[0].start2_comment_count +
        overallRatingForCompany[0].start1_comment_count // 13
    ]
  } else {
    return []
  }
}

export const companyComments = async companyRef => {
  const comments =
    await client.fetch(`*[_type=="usercomment" && references('${companyRef}')]{
    _id, 
    "username": user->username, 
    comment, 
    overallrating, 
    "avatar": user->avatar.asset->url 
    
  }`)

  const commentDertails = await companyCommentsDetails(companyRef)

  return [comments, commentDertails]
}

export const companyCommentsDetails = async companyRef => {
  const comments =
    await client.fetch(`*[_type=="usercomment" && references('${companyRef}')] | order(_createdAt desc)[0..9]{
      _id, 
      _createdAt, 
      "username": user->username, 
      "company_name": company->name, 
      "company_id": company->_id, 
      comment, 
      overallrating, 
      "avatar": user->avatar.asset->url, 
      "default_avatar": user->rank->image.asset->url, 
      "details": *[_type=="userrating" && company->_id == ^.company->_id && user->_id == ^.user->_id]{
        _id, 
        rating, 
          "rate_type": ratecriteria->criteria
        
      }
      
    }`)

  return comments
}

export const ratingStatsByCompany = async company => {
  console.log('after ratingStatsByCompany=>' + company)
  if (company != undefined) {
    const companyOverallRating =
      await client.fetch(`*[_type=="company" && _id == '${company}']
    { 
    "dps_sum" : *[_type=='userrating' && references(^._id) && ratecriteria->internalref == 'dps']{rating}, 
    "dps_count" : count(*[_type=='userrating' && references(^._id) && ratecriteria->internalref == 'dps']), 
    "wd_sum" : *[_type=='userrating' && references(^._id) && ratecriteria->internalref == 'wd']{rating},
    "wd_count" : count(*[_type=='userrating' && references(^._id) && ratecriteria->internalref == 'wd']),
    "vog_sum" : *[_type=='userrating' && references(^._id) && ratecriteria->internalref == 'vog']{rating},
    "vog_count" : count(*[_type=='userrating' && references(^._id) && ratecriteria->internalref == 'vog']),
    "wth_sum" : *[_type=='userrating' && references(^._id) && ratecriteria->internalref == 'wth']{rating},
    "wth_count" : count(*[_type=='userrating' && references(^._id) && ratecriteria->internalref == 'wth']),
    "bns_sum" : *[_type=='userrating' && references(^._id) && ratecriteria->internalref == 'bns']{rating},
    "bns_count" : count(*[_type=='userrating' && references(^._id) && ratecriteria->internalref == 'bns']),
    "cs_sum" : *[_type=='userrating' && references(^._id) && ratecriteria->internalref == 'cs']{rating}, 
    "cs_count" : count(*[_type=='userrating' && references(^._id) && ratecriteria->internalref == 'cs']), 
    "comment_sum": *[_type=='usercomment' && references(^._id)]{overallrating}, 
    "comment_count": count(*[_type=='usercomment' && references(^._id)]), 
    "start5_comment_count": count(*[_type=='usercomment' && references(^._id) && overallrating > 4.5]), 
    "start4_comment_count": count(*[_type=='usercomment' && references(^._id) && overallrating >= 3.5 && overallrating < 4.5 ]), 
    "start3_comment_count": count(*[_type=='usercomment' && references(^._id) && overallrating >= 2.5 && overallrating < 3.5]), 
    "start2_comment_count": count(*[_type=='usercomment' && references(^._id) && overallrating >= 1.5 && overallrating < 2.5]), 
    "start1_comment_count": count(*[_type=='usercomment' && references(^._id) && overallrating >= 0.5 && overallrating < 1.5]), 
    }
    `)
    console.log(`=>ratingStatsByCompany=>${company}`)
    return companyOverallRating
  } else {
    const companyOverallRating = []
    return companyOverallRating
  }
}

export const deleteCommentByUserCompany = async (user, company) => {
  const mutations = [
    {
      delete: {
        query: `*[_type == 'usercomment' && references('${user}') && references('${company}')]`
      }
    },
    {
      delete: {
        query: `*[_type == 'userrating' && references('${user}') && references('${company}')]`
      }
    }
  ]
  const result = await axios.post(
    `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}?returnIds=true`,
    { mutations: mutations },
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${tokenWithWriteAccess}`
      }
    }
  )

  return result
}

export const replyComment = async (session, thread, comment) => {
  const Mutations = [
    {
      create: {
        _type: 'threadcomment',
        comment: comment,
        user: {
          _ref: session.user.id,
          _type: 'reference'
        },
        thread: {
          _ref: thread,
          _type: 'reference'
        }
      }
    }
  ]

  const createReplyResponse = await axios.post(
    `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}?returnIds=true`,
    { mutations: Mutations },
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${tokenWithWriteAccess}`
      }
    }
  )
}

export const createComment = async (
  cs,
  bns,
  wth,
  vog,
  wd,
  dps,
  comment,
  rateKeys,
  company,
  session
) => {
  const deleteResult = await deleteCommentByUserCompany(
    session.user.id,
    company
  )
  console.log(deleteResult)
  const csMeta = rateKeys.filter(rKey => rKey.internalref == 'cs')
  const bnsMeta = rateKeys.filter(rKey => rKey.internalref == 'bns')
  const wthMeta = rateKeys.filter(rKey => rKey.internalref == 'wth')
  const vogMeta = rateKeys.filter(rKey => rKey.internalref == 'vog')
  const wdMeta = rateKeys.filter(rKey => rKey.internalref == 'wd')
  const dpsMeta = rateKeys.filter(rKey => rKey.internalref == 'dps')

  const overallrating = parseFloat(
    (parseFloat(cs.current.value ? cs.current.value : 5) +
      parseFloat(bns.current.value ? bns.current.value : 5) +
      parseFloat(wth.current.value ? wth.current.value : 5) +
      parseFloat(vog.current.value ? vog.current.value : 5) +
      parseFloat(wd.current.value ? wd.current.value : 5) +
      parseFloat(dps.current.value ? dps.current.value : 5)) /
      6
  )

  console.log('overall rating: ' + overallrating)

  const Mutations = [
    {
      create: {
        _type: 'usercomment',
        user: {
          _ref: session.user.id,
          _type: 'reference'
        },
        company: {
          _ref: company,
          _type: 'reference'
        },
        comment: comment.current.value
          ? comment.current.value
          : 'Generally good!',
        overallrating: overallrating
      }
    },
    {
      create: {
        _type: 'userrating',
        user: {
          _ref: session.user.id,
          _type: 'reference'
        },
        company: {
          _ref: company,
          _type: 'reference'
        },
        ratecriteria: {
          _ref: csMeta[0]._id,
          _type: 'reference'
        },

        rating: parseFloat(cs.current.value ? cs.current.value : 5)
      }
    },
    {
      create: {
        _type: 'userrating',
        user: {
          _ref: session.user.id,
          _type: 'reference'
        },
        company: {
          _ref: company,
          _type: 'reference'
        },
        ratecriteria: {
          _ref: bnsMeta[0]._id,
          _type: 'reference'
        },

        rating: parseFloat(bns.current.value ? bns.current.value : 5)
      }
    },
    {
      create: {
        _type: 'userrating',
        user: {
          _ref: session.user.id,
          _type: 'reference'
        },
        company: {
          _ref: company,
          _type: 'reference'
        },
        ratecriteria: {
          _ref: wthMeta[0]._id,
          _type: 'reference'
        },

        rating: parseFloat(wth.current.value ? wth.current.value : 5)
      }
    },
    {
      create: {
        _type: 'userrating',
        user: {
          _ref: session.user.id,
          _type: 'reference'
        },
        company: {
          _ref: company,
          _type: 'reference'
        },
        ratecriteria: {
          _ref: vogMeta[0]._id,
          _type: 'reference'
        },

        rating: parseFloat(vog.current.value ? vog.current.value : 5)
      }
    },
    {
      create: {
        _type: 'userrating',
        user: {
          _ref: session.user.id,
          _type: 'reference'
        },
        company: {
          _ref: company,
          _type: 'reference'
        },
        ratecriteria: {
          _ref: wdMeta[0]._id,
          _type: 'reference'
        },

        rating: parseFloat(wd.current.value ? wd.current.value : 5)
      }
    },
    {
      create: {
        _type: 'userrating',
        user: {
          _ref: session.user.id,
          _type: 'reference'
        },
        company: {
          _ref: company,
          _type: 'reference'
        },
        ratecriteria: {
          _ref: dpsMeta[0]._id,
          _type: 'reference'
        },

        rating: parseFloat(dps.current.value ? dps.current.value : 5)
      }
    }
  ]

  const createRatingResponse = await axios.post(
    `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}?returnIds=true`,
    { mutations: Mutations },
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${tokenWithWriteAccess}`
      }
    }
  )
}
