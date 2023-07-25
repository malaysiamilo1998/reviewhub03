export const avatar = {
  name: 'avatar',
  title: 'Default Avatar',
  type: 'document',
  fields: [
    {
      name: 'desc',
      title: 'Description',
      type: 'string'
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
      name: 'priority',
      title: 'Priotiry',
      type: 'number'
    }
  ]
}
