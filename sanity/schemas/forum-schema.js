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
      options: {hotspot: true},
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
      to: [{type: 'topic'}]
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
      of: [{type: 'reference', to: [{type: 'taggable'}]}]
    }
  ],
  orderings: [
    {
      title: 'Preference Sorting',
      name: 'Preference',
      by: [
        {field: 'preference', direction: 'asc'},
        {field: 'preference', direction: 'desc'}
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
      name: 'topic',
      type: 'reference',
      to: [{type: 'topic'}]
    },
    {
      name: 'posts',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'post'}]}]
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
      of: [{type: 'reference', to: [{type: 'taggable'}]}]
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
      to: [{type: 'user'}]
    },
    {
      name: 'thread',
      type: 'reference',
      to: [{type: 'thread'}]
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
      of: [{type: 'reference', to: [{type: 'taggable'}]}]
    },
    {
      name: 'isFirstPost',
      type: 'boolean',
      description: 'Check if the post is first post (Thread Content)',
      title: 'Is First?'
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
          type: 'image',
          fields: [
            {
              type: 'text',
              name: 'alt',
              title: 'Alternative text',
              description: `Some of your visitors cannot see images, 
            be they blind, color-blind, low-sighted; 
            alternative text is of great help for those 
            people that can rely on it to have a good idea of 
            what\'s on your page.`,
              options: {
                isHighlighted: true
              }
            }
          ]
        }
      ]
    }
  ]
}
