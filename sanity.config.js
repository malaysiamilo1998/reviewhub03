import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { sanityEssentialConfig } from './sanity-config'
import { schemaTypes } from './sanity/schemas/index'

// import { deskSetting } from './desktopStructure'

const config = defineConfig({
  projectId: sanityEssentialConfig.projectId,
  apiVersion: sanityEssentialConfig.apiVersion,
  dataset: sanityEssentialConfig.dataset,
  apiToken: sanityEssentialConfig.apiToken,
  title: 'Review Hub',
  basePath: '/admin',
  plugins: [deskTool(), visionTool()],
  useCdn: true,
  schema: { types: schemaTypes }
})

export default config
