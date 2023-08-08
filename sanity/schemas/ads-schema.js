export const ads = {
  name: 'ads',
  title: 'Ads',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      title: 'URL',
      name: 'url',
      type: 'url'
    },
    {
      title: 'on/off?',
      name: 'onoff',
      type: 'boolean'
    },
    {
      name: 'image',
      title: 'Square Image',
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
      title: 'Place',
      name: 'place',
      type: 'string',
      options: {
        list: [
          { title: "Editor's pick top center", value: 'place-1' },
          { title: "Editor's pick top right", value: 'place-2' },
          { title: "Editor's pick top middle", value: 'place-3' }
        ]
        // layout: 'radio'
      }
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'place'
      //   media: 'image'
    }
  }
}
