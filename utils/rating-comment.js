import { sanityEssentialConfig } from '@/sanity-config'

import axios from 'axios'

const projectId = sanityEssentialConfig.projectId
const dataset = sanityEssentialConfig.dataset
const tokenWithWriteAccess = sanityEssentialConfig.apiToken

export const deleteCommentByUserCompany = async (user, company) => {
  const mutationsComment = [
    {
      delete: {
        query: `*[_type == 'usercomment' && references('${user}') && references('${company}')]`
      }
    }
  ]
  const resultDelComment = await axios.post(
    `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}?returnIds=true`,
    { mutations: mutationsComment },
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${tokenWithWriteAccess}`
      }
    }
  )

  const mutations = [
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

  await axios.post(
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
