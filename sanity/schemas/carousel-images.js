export const carouselbannerimage = {
  name: 'carouselbannerimage',
  title: 'Carousel slide images',
  type: 'document',
  hidden: true,
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
      name: 'hottopic',
      title: 'Hot Topic',
      type: 'reference',
      to: [{ type: 'thread' }]
    }
  ]
}
