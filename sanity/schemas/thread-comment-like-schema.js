export const threadcomment = {
  name: 'threadcomment',
  title: 'Thread Comment',
  type: 'document',
  fields: [
    {
      name: 'user',
      title: 'User',
      type: 'reference',
      to: [{ type: 'user' }]
    },
    {
      name: 'thread',
      title: 'Thread',
      type: 'reference',
      to: [{ type: 'thread' }]
    },
    {
      name: 'comment',
      title: 'Comment',
      type: 'string'
    }
  ],
  preview: {
    select: {
      author: 'user.username',
      subtitle: 'thread.title'
    },
    prepare: ({ author, subtitle }) => {
      return {
        title: `${author}`,
        subtitle: `comment on thread => ${subtitle}`
      }
    }
  }
}

export const userthreadlike = {
  name: 'userthreadlike',
  title: 'User Thread Like',
  type: 'document',
  fields: [
    {
      name: 'thread',
      title: 'Thread',
      type: 'reference',
      to: [{ type: 'thread' }]
    },

    {
      name: 'user',
      title: 'User',
      type: 'reference',
      to: [{ type: 'user' }]
    }
  ],
  preview: {
    select: {
      author: 'user.username',
      subtitle: 'thread.title'
    },
    prepare: ({ author, subtitle }) => {
      return {
        title: `like ${subtitle}`,
        subtitle: `by ${author}`
      }
    }
  }
}
