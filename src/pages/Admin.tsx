import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus, Edit3, Trash2, Save, X, Eye, ChevronDown, ChevronUp,
  Bold, Italic, List, Heading1, Heading2, Quote, Link as LinkIcon,
  AlignLeft, AlignCenter, Tag, Calendar, FileText,
} from 'lucide-react'
import { Story } from '../types'
import { stories as initialStories, getAllTags } from '../data/stories'

interface EditorState {
  mode: 'list' | 'edit' | 'preview'
  editingStory: Story | null
  isNewStory: boolean
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export default function Admin() {
  const [storiesList, setStoriesList] = useState<Story[]>([...initialStories])
  const [editor, setEditor] = useState<EditorState>({
    mode: 'list',
    editingStory: null,
    isNewStory: false,
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const allTags = getAllTags()

  const filteredStories = storiesList.filter(
    s =>
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const handleNewStory = () => {
    const newStory: Story = {
      id: generateId(),
      slug: '',
      title: '',
      description: '',
      content: [''],
      tags: [],
    }
    setEditor({ mode: 'edit', editingStory: newStory, isNewStory: true })
  }

  const handleEditStory = (story: Story) => {
    setEditor({ mode: 'edit', editingStory: { ...story, content: [...story.content] }, isNewStory: false })
  }

  const handleDeleteStory = (id: string) => {
    if (window.confirm('Are you sure you want to delete this story?')) {
      setStoriesList(prev => prev.filter(s => s.id !== id))
    }
  }

  const handleSave = () => {
    if (!editor.editingStory) return
    const story = editor.editingStory

    if (!story.title.trim()) {
      alert('Please enter a title.')
      return
    }

    const finalStory = {
      ...story,
      slug: story.slug || slugify(story.title),
    }

    if (editor.isNewStory) {
      setStoriesList(prev => [finalStory, ...prev])
    } else {
      setStoriesList(prev => prev.map(s => (s.id === finalStory.id ? finalStory : s)))
    }

    setEditor({ mode: 'list', editingStory: null, isNewStory: false })
  }

  const handleCancel = () => {
    setEditor({ mode: 'list', editingStory: null, isNewStory: false })
  }

  const updateField = <K extends keyof Story>(field: K, value: Story[K]) => {
    if (!editor.editingStory) return
    setEditor(prev => ({
      ...prev,
      editingStory: prev.editingStory ? { ...prev.editingStory, [field]: value } : null,
    }))
  }

  const updateContentBlock = (index: number, value: string) => {
    if (!editor.editingStory) return
    const newContent = [...editor.editingStory.content]
    newContent[index] = value
    updateField('content', newContent)
  }

  const addContentBlock = () => {
    if (!editor.editingStory) return
    updateField('content', [...editor.editingStory.content, ''])
  }

  const removeContentBlock = (index: number) => {
    if (!editor.editingStory) return
    if (editor.editingStory.content.length <= 1) return
    const newContent = editor.editingStory.content.filter((_, i) => i !== index)
    updateField('content', newContent)
  }

  const moveContentBlock = (index: number, direction: 'up' | 'down') => {
    if (!editor.editingStory) return
    const newContent = [...editor.editingStory.content]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= newContent.length) return
    ;[newContent[index], newContent[targetIndex]] = [newContent[targetIndex], newContent[index]]
    updateField('content', newContent)
  }

  const toggleTag = (tag: string) => {
    if (!editor.editingStory) return
    const currentTags = editor.editingStory.tags
    if (currentTags.includes(tag)) {
      updateField('tags', currentTags.filter(t => t !== tag))
    } else {
      updateField('tags', [...currentTags, tag])
    }
  }

  const addCustomTag = (tagInput: string) => {
    const tag = tagInput.trim()
    if (!tag || !editor.editingStory) return
    if (!editor.editingStory.tags.includes(tag)) {
      updateField('tags', [...editor.editingStory.tags, tag])
    }
  }

  const insertFormatting = (textareaId: string, format: string) => {
    const textarea = document.getElementById(textareaId) as HTMLTextAreaElement
    if (!textarea) return
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selected = textarea.value.substring(start, end)

    let replacement = ''
    switch (format) {
      case 'bold': replacement = `**${selected || 'bold text'}**`; break
      case 'italic': replacement = `*${selected || 'italic text'}*`; break
      case 'h1': replacement = `# ${selected || 'Heading'}`; break
      case 'h2': replacement = `## ${selected || 'Subheading'}`; break
      case 'quote': replacement = `> ${selected || 'Quote text'}`; break
      case 'link': replacement = `[${selected || 'link text'}](url)`; break
      case 'list': replacement = `- ${selected || 'List item'}`; break
      default: replacement = selected
    }

    const newValue = textarea.value.substring(0, start) + replacement + textarea.value.substring(end)

    const blockIndex = parseInt(textareaId.replace('content-block-', ''))
    if (!isNaN(blockIndex)) {
      updateContentBlock(blockIndex, newValue)
    }
  }

  // Render list view
  if (editor.mode === 'list') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-primary-dark text-white py-6">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-heading font-bold">Story Admin</h1>
                <p className="text-white/70 text-sm mt-1">Manage story blog posts</p>
              </div>
              <button
                onClick={handleNewStory}
                className="inline-flex items-center bg-white text-primary font-medium px-4 py-2 rounded hover:bg-warm transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Story
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search stories by title or tag..."
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="text-sm text-text-light mb-4">
            {filteredStories.length} {filteredStories.length === 1 ? 'story' : 'stories'}
          </div>

          <div className="space-y-3">
            {filteredStories.map(story => (
              <div
                key={story.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden"
              >
                <div className="p-4 flex items-start justify-between gap-4">
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() => setExpandedId(expandedId === story.id ? null : story.id)}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-gray-900">{story.title}</h3>
                      {expandedId === story.id ? (
                        <ChevronUp className="w-4 h-4 text-text-light" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-text-light" />
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {story.tags.map(tag => (
                        <span key={tag} className="text-xs px-2 py-0.5 bg-warm text-primary rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleEditStory(story)}
                      className="p-2 text-text-light hover:text-primary hover:bg-gray-50 rounded transition-colors"
                      aria-label="Edit story"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteStory(story.id)}
                      className="p-2 text-text-light hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      aria-label="Delete story"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedId === story.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 border-t border-gray-100 pt-3">
                        <p className="text-sm text-text-light mb-2">
                          <span className="font-medium text-gray-700">Slug:</span> /stories/{story.slug}
                        </p>
                        {story.date && (
                          <p className="text-sm text-text-light mb-2">
                            <span className="font-medium text-gray-700">Date:</span> {story.date}
                          </p>
                        )}
                        <p className="text-sm text-text-light">{story.description}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Render edit / preview view
  const story = editor.editingStory!

  if (editor.mode === 'preview') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-primary-dark text-white py-4 sticky top-[73px] z-40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
            <h2 className="font-medium">Preview: {story.title || 'Untitled'}</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setEditor(prev => ({ ...prev, mode: 'edit' }))}
                className="inline-flex items-center text-sm bg-white/20 text-white px-3 py-1.5 rounded hover:bg-white/30 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5 mr-1.5" />
                Edit
              </button>
              <button
                onClick={handleSave}
                className="inline-flex items-center text-sm bg-white text-primary px-3 py-1.5 rounded hover:bg-warm transition-colors"
              >
                <Save className="w-3.5 h-3.5 mr-1.5" />
                Save
              </button>
            </div>
          </div>
        </div>

        <div className="bg-primary py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {story.tags.map(tag => (
                <span key={tag} className="text-xs font-medium px-2 py-1 bg-white/20 text-white rounded">{tag}</span>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-white">{story.title || 'Untitled Story'}</h1>
            {story.subtitle && <p className="mt-3 text-lg text-white/80">{story.subtitle}</p>}
            {story.date && <p className="mt-4 text-sm text-white/60">{story.date}</p>}
          </div>
        </div>

        <article className="py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            {story.content.map((paragraph, index) => (
              <p key={index} className="text-base md:text-lg leading-relaxed text-text mb-6">
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </div>
    )
  }

  // Edit mode
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary-dark text-white py-4 sticky top-[73px] z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <h2 className="font-medium">
            {editor.isNewStory ? 'New Story' : `Editing: ${story.title || 'Untitled'}`}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="inline-flex items-center text-sm bg-white/20 text-white px-3 py-1.5 rounded hover:bg-white/30 transition-colors"
            >
              <X className="w-3.5 h-3.5 mr-1.5" />
              Cancel
            </button>
            <button
              onClick={() => setEditor(prev => ({ ...prev, mode: 'preview' }))}
              className="inline-flex items-center text-sm bg-white/20 text-white px-3 py-1.5 rounded hover:bg-white/30 transition-colors"
            >
              <Eye className="w-3.5 h-3.5 mr-1.5" />
              Preview
            </button>
            <button
              onClick={handleSave}
              className="inline-flex items-center text-sm bg-white text-primary px-3 py-1.5 rounded hover:bg-warm transition-colors"
            >
              <Save className="w-3.5 h-3.5 mr-1.5" />
              Save
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="space-y-6">
          {/* Title */}
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4" />
              Title
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-200 rounded text-lg font-heading focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              placeholder="Story title..."
              value={story.title}
              onChange={e => updateField('title', e.target.value)}
            />
          </div>

          {/* Subtitle & Slug */}
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle (optional)</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  placeholder="Optional subtitle..."
                  value={story.subtitle || ''}
                  onChange={e => updateField('subtitle', e.target.value || undefined)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
                <div className="flex items-center">
                  <span className="text-sm text-text-light mr-1">/stories/</span>
                  <input
                    type="text"
                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    placeholder={slugify(story.title) || 'auto-generated'}
                    value={story.slug}
                    onChange={e => updateField('slug', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Date */}
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4" />
              Date (optional)
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 border border-gray-200 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              placeholder="e.g. August 2025"
              value={story.date || ''}
              onChange={e => updateField('date', e.target.value || undefined)}
            />
          </div>

          {/* Description */}
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <AlignLeft className="w-4 h-4" />
              Description
            </label>
            <textarea
              className="w-full px-4 py-3 border border-gray-200 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-y"
              rows={3}
              placeholder="Brief description shown in story cards..."
              value={story.description}
              onChange={e => updateField('description', e.target.value)}
            />
          </div>

          {/* Tags */}
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
              <Tag className="w-4 h-4" />
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`text-sm px-3 py-1 rounded transition-colors ${
                    story.tags.includes(tag)
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-text-light hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-200 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                placeholder="Add custom tag..."
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    addCustomTag((e.target as HTMLInputElement).value)
                    ;(e.target as HTMLInputElement).value = ''
                  }
                }}
              />
            </div>
          </div>

          {/* Content Blocks */}
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
              <AlignCenter className="w-4 h-4" />
              Content
            </label>
            <div className="space-y-4">
              {story.content.map((block, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-3 py-2 flex items-center justify-between border-b border-gray-200">
                    <span className="text-xs font-medium text-text-light">
                      Paragraph {index + 1}
                    </span>
                    <div className="flex items-center gap-1">
                      {/* Formatting toolbar */}
                      <button
                        onClick={() => insertFormatting(`content-block-${index}`, 'bold')}
                        className="p-1 text-text-light hover:text-primary rounded"
                        title="Bold"
                      >
                        <Bold className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => insertFormatting(`content-block-${index}`, 'italic')}
                        className="p-1 text-text-light hover:text-primary rounded"
                        title="Italic"
                      >
                        <Italic className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => insertFormatting(`content-block-${index}`, 'h1')}
                        className="p-1 text-text-light hover:text-primary rounded"
                        title="Heading"
                      >
                        <Heading1 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => insertFormatting(`content-block-${index}`, 'h2')}
                        className="p-1 text-text-light hover:text-primary rounded"
                        title="Subheading"
                      >
                        <Heading2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => insertFormatting(`content-block-${index}`, 'quote')}
                        className="p-1 text-text-light hover:text-primary rounded"
                        title="Quote"
                      >
                        <Quote className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => insertFormatting(`content-block-${index}`, 'list')}
                        className="p-1 text-text-light hover:text-primary rounded"
                        title="List"
                      >
                        <List className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => insertFormatting(`content-block-${index}`, 'link')}
                        className="p-1 text-text-light hover:text-primary rounded"
                        title="Link"
                      >
                        <LinkIcon className="w-3.5 h-3.5" />
                      </button>
                      <div className="w-px h-4 bg-gray-300 mx-1" />
                      <button
                        onClick={() => moveContentBlock(index, 'up')}
                        disabled={index === 0}
                        className="p-1 text-text-light hover:text-primary rounded disabled:opacity-30"
                        title="Move up"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => moveContentBlock(index, 'down')}
                        disabled={index === story.content.length - 1}
                        className="p-1 text-text-light hover:text-primary rounded disabled:opacity-30"
                        title="Move down"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => removeContentBlock(index)}
                        disabled={story.content.length <= 1}
                        className="p-1 text-text-light hover:text-red-600 rounded disabled:opacity-30"
                        title="Remove block"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <textarea
                    id={`content-block-${index}`}
                    className="w-full px-4 py-3 border-0 focus:ring-0 outline-none resize-y min-h-[100px]"
                    placeholder="Write paragraph content..."
                    value={block}
                    onChange={e => updateContentBlock(index, e.target.value)}
                  />
                </div>
              ))}
            </div>
            <button
              onClick={addContentBlock}
              className="mt-3 inline-flex items-center text-sm text-primary hover:text-primary-dark font-medium"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add paragraph
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
