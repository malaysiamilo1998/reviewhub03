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
      name: 'contact',
      title: 'Contact',
      type: 'array',
      of: [{ type: 'contact' }]
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
      title: 'Description',
      name: 'desc',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image'
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
      title: 'Backup URLs',
      name: 'backupurls',
      type: 'array',
      of: [{ type: 'string' }]
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
