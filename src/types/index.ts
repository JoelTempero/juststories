export interface Story {
  id: string
  slug: string
  title: string
  subtitle?: string
  description: string
  content: string[]
  date?: string
  tags: string[]
  image?: string
  resources?: Resource[]
}

export interface Resource {
  title: string
  url?: string
  description?: string
}

export interface PageContent {
  title: string
  subtitle?: string
  content: string[]
  sections?: ContentSection[]
}

export interface ContentSection {
  heading: string
  content: string[]
}

export interface NavItem {
  label: string
  path: string
}
