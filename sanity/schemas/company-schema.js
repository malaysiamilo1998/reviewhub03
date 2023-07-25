const company = {
  name: 'company',
  title: 'Company',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' }
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
      name: 'banner',
      title: 'Banner',
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
      name: 'url',
      title: 'URL',
      type: 'url'
    },
    {
      name: 'games',
      title: 'Games',
      type: 'array',
      of: [{ type: 'companyGame' }]
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'url',
      media: 'image'
    }
  }
}

export default company
