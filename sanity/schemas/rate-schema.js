export const ratekey = {
  name: 'rateKey',
  title: 'Rating Criteria',
  type: 'document',
  fields: [
    {
      name: 'criteria',
      title: 'Criteria',
      type: 'string'
    },
    {
      name: 'priority',
      title: 'Priotiry',
      type: 'number'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt',
          type: 'string'
        }
      ]
    },
    {
      name: 'internalref',
      title: 'Internal Reference',
      type: 'string'
    }
  ]
}

export const usercomment = {
  name: 'usercomment',
  title: 'User Comment',
  type: 'document',
  fields: [
    {
      name: 'user',
      title: 'User',
      type: 'reference',
      to: [{ type: 'user' }]
    },
    {
      name: 'company',
      title: 'Company',
      type: 'reference',
      to: [{ type: 'company' }]
    },
    {
      name: 'comment',
      title: 'Comment',
      type: 'string'
    },
    {
      name: 'overallrating',
      title: 'Overall Rating',
      type: 'number'
    }
  ],
  preview: {
    select: {
      author: 'user.username',
      subtitle: 'company.name',
      overallrating: 'overallrating',
      comment: 'comment'
    },
    prepare: ({ author, subtitle, overallrating, comment }) => {
      return {
        title: `${author}/${overallrating}/${subtitle}/`,
        subtitle: `${comment}`
      }
    }
  }
}

export const usercompanyrate = {
  name: 'userrating',
  title: 'User Rating',
  type: 'document',
  fields: [
    // {
    //   name: 'comment',
    //   title: 'Comment',
    //   type: 'string'
    // },
    {
      name: 'user',
      title: 'User',
      type: 'reference',
      to: [{ type: 'user' }]
    },

    {
      name: 'company',
      title: 'Company',
      type: 'reference',
      to: [{ type: 'company' }]
    },
    {
      name: 'ratecriteria',
      title: 'Rate Criteria',
      type: 'reference',
      to: [{ type: 'rateKey' }],
      options: {
        unique: true
      }
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number'
    }
  ],
  preview: {
    select: {
      author: 'user.username',
      subtitle: 'company.name',
      subtitle2: 'ratecriteria.criteria',
      rating: 'rating'
    },
    prepare: ({ author, subtitle, subtitle2, rating }) => {
      // const authors = [author0, author1, author2].filter(Boolean)
      // const subtitle = authors.length > 0 ? `by ${authors.join(', ')}` : ''
      // const hasMoreAuthors = Boolean(author3)
      return {
        title: `${rating}/${subtitle}/${subtitle2}`,
        subtitle: `by ${author}`
      }
    }
  },
  unique: [{ fields: ['user', 'company', ' ratecriteria'] }]
}

// export const usercompanyratecriteria = {
//   name: 'userratingpivot',
//   title: 'Rating Records',
//   type: 'document',
//   fields: [
//     {
//       name: 'rating1',
//       title: 'Rate 1',
//       type: 'reference',
//       to: [{type: 'rateKey'}],
//       options: {
//         unique: true
//       }
//     },
//     {
//       name: 'rating2',
//       title: 'Rate 2',
//       type: 'reference',
//       to: [{type: 'rateKey'}],
//       options: {
//         unique: true
//       }
//     },
//     {
//       name: 'rating3',
//       title: 'Rate 3',
//       type: 'reference',
//       to: [{type: 'rateKey'}],
//       options: {
//         unique: true
//       }
//     },
//     {
//       name: 'rating4',
//       title: 'Rate 4',
//       type: 'reference',
//       to: [{type: 'rateKey'}],
//       options: {
//         unique: true
//       }
//     },
//     {
//       name: 'rating5',
//       title: 'Rate 5',
//       type: 'reference',
//       to: [{type: 'rateKey'}],
//       options: {
//         unique: true
//       }
//     },
//     {
//       name: 'rating6',
//       title: 'Rate 6',
//       type: 'reference',
//       to: [{type: 'rateKey'}],
//       options: {
//         unique: true
//       }
//     },
//     {
//       name: 'userrating',
//       title: 'User Comment',
//       type: 'reference',
//       to: [{type: 'userrating'}]
//     },

//     {
//       name: 'rating',
//       title: 'Rating',
//       type: 'number'
//     }
//   ],
//   unique: [{ fields: ['field1', 'field2'] }],

// }
