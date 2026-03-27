import Ajv from 'ajv'
import addFormats from 'ajv-formats'

export default defineNuxtPlugin(() => {
  // Assicuriamo che AJV sia disponibile per JSONForms
  if (import.meta.client) {
    const ajv = new Ajv({ allErrors: true })
    addFormats(ajv)
  }
})
