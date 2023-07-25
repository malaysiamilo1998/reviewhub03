export const user = {
  name: 'user',
  type: 'document',
  fields: [
    {
      name: 'username',
      type: 'string'
    },
    {
      name: 'name',
      type: 'string'
    },
    {
      name: 'email',
      type: 'string'
    },
    {
      name: 'phone',
      type: 'string'
    },
    {
      name: 'avatar',
      type: 'image',
      options: {
        hotspot: true
      }
    }
  ]
}
