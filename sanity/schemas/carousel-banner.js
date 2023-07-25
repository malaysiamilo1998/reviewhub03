export const carousel = {
  name: 'carousel',
  title: 'Carousel slide',
  type: 'document',
  fields: [
    {
      name: 'desc',
      title: 'Description',
      type: 'string'
    },
    {
      name: 'banner',
      title: 'Banner',
      type: 'array',
      of: [{ type: 'carouselbannerimage' }]
    }
  ]
}
