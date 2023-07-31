export const contacttype = {
  name: 'contacttype',
  title: 'Communication channel',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Channel',
      type: 'string'
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
    }
  ]
}

export const contact = {
  name: 'contact',
  title: 'Contact',
  type: 'document',
  fields: [
    {
      name: 'type',
      title: 'Type',
      type: 'reference',
      to: [{ type: 'contacttype' }]
    },
    {
      name: 'value',
      title: 'Value',
      type: 'string'
    }
  ]
}
