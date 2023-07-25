export const tag = {
  name: 'tag',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string'
    },
    {
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      }
    }
  ]
}

export const taggable = {
  name: 'taggable',
  type: 'document',
  fields: [
    {
      name: 'tag',
      type: 'reference',
      to: [{type: 'tag'}]
    },
    {
      name: 'taggable',
      type: 'reference',
      to: [{type: 'topic'}, {type: 'thread'}, {type: 'post'}]
    }
  ]
}
