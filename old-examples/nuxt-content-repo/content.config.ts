import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    docs: defineCollection({
      type: 'page',
      source: {
        repository: 'https://github.com/enibrn/dendron-dummy',
        include: 'notes/*.md'
      }
    })
  }
})