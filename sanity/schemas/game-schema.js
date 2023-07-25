export const gametype = {
  name: 'gametype',
  title: 'Game Type',
  type: 'document',
  fields: [
    {
      name: 'gametype',
      title: 'Title',
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
    }
  ],
  preview: {
    select: {
      title: 'gametype',
      media: 'image'
    }
  }
}

export const game = {
  name: 'game',
  title: 'Game',
  type: 'document',
  fields: [
    {
      name: 'gamename',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'gametype',
      title: 'Type',
      type: 'reference',
      to: [{type: 'gametype'}]
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
    }
  ],
  preview: {
    select: {
      title: 'gamename',
      subtitle: 'gametype.gametype',
      media: 'image'
    }
  }
}

// export const game = {
//     [
//         name: 'game',
//         title: 'Game',
//     ]
// }
