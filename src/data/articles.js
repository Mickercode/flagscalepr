// Content lives in articles.json so the /admin dashboard can read and rewrite it
// safely. This module keeps the import surface the pages already use.
import data from './articles.json'

export const categories = data.categories
export const editorialThemes = data.editorialThemes
export const articles = data.articles
