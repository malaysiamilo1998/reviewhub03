export const newssection = {
  name: 'newssection',
  title: 'Section',
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
      title: 'Layout',
      name: 'layout',
      type: 'string',
      initialValue: 'layout-1',
      options: {
        list: [
          { title: 'Layout 1', value: 'layout-1' },
          { title: 'Layout 2', value: 'layout-2' }
        ]
      }
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
      name: 'lglayout',
      title: 'with 628 x 372 image',
      type: 'array',
      of: [{ type: 'news' }]
    },
    {
      name: 'medlayout',
      title: 'with 306 x 256 image',
      type: 'array',
      of: [{ type: 'news' }]
    },
    {
      name: 'smlayout',
      title: 'with 104 x 84 image',
      type: 'array',
      of: [{ type: 'news' }]
    },
    {
      name: 'preference',
      type: 'number',
      default: 999
    },

    {
      name: 'createdAt',
      type: 'datetime'
    },
    {
      name: 'updatedAt',
      type: 'datetime'
    }
  ]
}

export const newssectioncategory = {
  name: 'newssectioncategory',
  title: 'News Category',
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
      name: 'preference',
      type: 'number',
      default: 999
    }
  ]
}

export const news = {
  name: 'news',
  title: 'News',
  type: 'document',
  fields: [
    {
      name: 'newstitle',
      title: 'Title',
      type: 'string'
    },
    {
      title: 'is this Ads?',
      name: 'ads',
      type: 'boolean'
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
      title: 'Date Time',
      name: 'launchAt',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        timeStep: 15,
        calendarTodayLabel: 'Today'
      }
    }
  ]
}
