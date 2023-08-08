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
      name: 'rank',
      type: 'reference',
      to: [{ type: 'avatar' }],
      initialValue: () => ({
        _ref: 'ec4bedb5-9f56-4449-80a4-af93ad633bab' // Replace 'someAuthorId' with the actual _id you want as the default reference
      })
    },
    {
      name: 'provider',
      title: 'Provider',
      type: 'string'
    }
  ]
}
