import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schemaTypes } from '@/sanity/schemas/index'
// import { deskSetting } from './desktopStructure'

const config = defineConfig({
  projectId: 'hy20vg32',
  dataset: 'reviewhub',
  title: 'Review Hub',
  apiVersion: '2023-07-24',
  basePath: '/admin',
  plugins: [deskTool()],
  useCdn: true,
  schema: { types: schemaTypes }
})

export default config
