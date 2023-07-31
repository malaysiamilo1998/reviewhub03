export const user = {
  name: 'user',
  type: 'document',
  fields: [
    {
      name: 'username',
      title: 'Username',
      type: 'string'
    },
    {
      name: 'password',
      title: 'Password',
      type: 'string'
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string'
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string'
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string'
    },
    {
      name: 'avatar',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'provider',
      title: 'Provider',
      type: 'string'
    }
  ]
}
