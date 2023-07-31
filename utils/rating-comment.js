import { client } from '@/sanity.config'
import { sanityEssentialConfig } from '@/sanity-config'

import axios from 'axios'

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
  const csMeta = rateKeys.filter(rKey => rKey.internalref == 'cs')
  const bnsMeta = rateKeys.filter(rKey => rKey.internalref == 'bns')
  const wthMeta = rateKeys.filter(rKey => rKey.internalref == 'wth')
  const vogMeta = rateKeys.filter(rKey => rKey.internalref == 'vog')
  const wdMeta = rateKeys.filter(rKey => rKey.internalref == 'wd')
  const dpsMeta = rateKeys.filter(rKey => rKey.internalref == 'dps')

  const projectId = sanityEssentialConfig.projectId
  const dataset = sanityEssentialConfig.dataset
  const tokenWithWriteAccess = sanityEssentialConfig.apiToken

  const Mutations = [
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
        comment: comment.current.value
          ? comment.current.value
          : 'Generally good!',
        rating: parseFloat(cs.current.value)
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
        comment: comment.current.value
          ? comment.current.value
          : 'Generally good!',
        rating: parseFloat(bns.current.value)
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
        comment: comment.current.value
          ? comment.current.value
          : 'Generally good!',
        rating: parseFloat(wth.current.value)
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
        comment: comment.current.value
          ? comment.current.value
          : 'Generally good!',
        rating: parseFloat(vog.current.value)
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
        comment: comment.current.value
          ? comment.current.value
          : 'Generally good!',
        rating: parseFloat(wd.current.value)
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
        comment: comment.current.value
          ? comment.current.value
          : 'Generally good!',
        rating: parseFloat(dps.current.value)
      }
    }
  ]

  // console.log('mutation')
  // console.log(Mutations)

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
