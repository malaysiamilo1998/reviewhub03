export const topic = {
  name: 'topic',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string'
    },
    {
      name: 'description',
      type: 'text'
    },
    {
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      }
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
      name: 'preference',
      type: 'number',
      default: 999
    },
    {
      name: 'parentTopic',
      type: 'reference',
      to: [{ type: 'topic' }]
    },
    {
      name: 'createdAt',
      type: 'datetime'
    },
    {
      name: 'updatedAt',
      type: 'datetime'
    },
    {
      name: 'tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'taggable' }] }]
    }
  ],
  orderings: [
    {
      title: 'Preference Sorting',
      name: 'Preference',
      by: [
        { field: 'preference', direction: 'asc' },
        { field: 'preference', direction: 'desc' }
      ]
    }
    // Add more ordering options as needed
  ]
}

export const thread = {
  name: 'thread',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string'
    },
    {
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'author',
      type: 'reference',
      to: [{ type: 'user' }]
    },
    {
      name: 'topic',
      type: 'reference',
      to: [{ type: 'topic' }]
    },
    {
      title: 'Description',
      name: 'desc',
      type: 'string'
    },
    {
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image'
        }
      ]
    },
    {
      name: 'viewCount',
      type: 'number',
      default: 0
    },
    {
      name: 'createdAt',
      type: 'datetime'
    },
    {
      name: 'updatedAt',
      type: 'datetime'
    },
    {
      name: 'tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'taggable' }] }]
    }
  ]
}
export const post = {
  name: 'post',
  type: 'document',
  fields: [
    {
      name: 'author',
      type: 'reference',
      to: [{ type: 'user' }]
    },
    {
      name: 'thread',
      type: 'reference',
      to: [{ type: 'thread' }]
    },
    {
      name: 'likes',
      type: 'number',
      default: 0
    },
    {
      name: 'createdAt',
      type: 'datetime'
    },
    {
      name: 'tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'taggable' }] }]
    },

    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block'
        },
        {
          type: 'image'
        }
      ]
    }
  ]
}
