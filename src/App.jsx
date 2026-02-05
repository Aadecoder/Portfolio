import { useCallback, useMemo, useState, useRef } from 'react'
import { marked } from 'marked'
import Modal from './components/Modal'
import SectionPanel from './components/SectionPanel'
import {
  about,
  blogPosts,
  contact,
  experiences,
  projects,
  promptLabel,
  resumeLink,
  sections,
  skills,
} from './data/content'

const tones = {
  ocean: {
    accent: 'text-sky-400',
    accentSoft: 'text-rose-400',
    border: 'border border-sky-500/30',
    focus: 'focus:ring-2 focus:ring-sky-400/50 focus:ring-offset-0',
    card: 'bg-sky-500/5 hover:bg-sky-500/10',
    caret: 'bg-sky-400',
    input: 'caret-sky-400',
  },
  crimson: {
    accent: 'text-rose-400',
    accentSoft: 'text-sky-400',
    border: 'border border-rose-500/30',
    focus: 'focus:ring-2 focus:ring-rose-400/50 focus:ring-offset-0',
    card: 'bg-rose-500/5 hover:bg-rose-500/10',
    caret: 'bg-rose-400',
    input: 'caret-rose-400',
  },
}

const nextTone = (current) => {
  const keys = Object.keys(tones)
  const idx = keys.indexOf(current)
  return keys[(idx + 1) % keys.length]
}

marked.setOptions({ breaks: true })

const uid = () => `${Date.now().toString(36)}-${Math.random().toString(16).slice(2, 8)}`

function App() {
  const [history, setHistory] = useState([])
  const [activeSection, setActiveSection] = useState('about')
  const [toneKey, setToneKey] = useState('ocean')
  const [isDark, setIsDark] = useState(true)
  const [modal, setModal] = useState(null)
  const [status, setStatus] = useState(['Connected to aditya@portfolio', 'Click cards or type commands below.'])
  const [commandValue, setCommandValue] = useState('')
  const [historyIndex, setHistoryIndex] = useState(null)
  const inputRef = useRef(null)
  const [blogContent, setBlogContent] = useState({})

  const blogLoaders = useMemo(() => import.meta.glob('./blogs/*.md', { query: '?raw', import: 'default' }), [])

  const tone = useMemo(() => tones[toneKey], [toneKey])

  const pushStatus = useCallback((lines) => {
    setStatus((prev) => {
      const next = [...prev, ...lines]
      return next.slice(-6)
    })
  }, [])

  const openBlog = useCallback(
    async (slug) => {
      const post = blogPosts.find((p) => p.slug === slug)
      if (!post) {
        pushStatus([`No blog found for ${slug}`])
        return
      }

      const existing = blogContent[slug]
      let html = existing

      if (!html) {
        const loader = blogLoaders[post.file]
        if (!loader) {
          pushStatus([`Missing file for ${slug}`])
          return
        }
        const raw = await loader()
        html = marked.parse(raw)
        setBlogContent((prev) => ({ ...prev, [slug]: html }))
      }

      setModal({ type: 'blog', item: { ...post, html } })
      pushStatus([`Opened blog: ${post.title}`])
    },
    [blogContent, blogLoaders, pushStatus]
  )

  const renderSection = useCallback((sectionName) => {
    switch (sectionName) {
      case 'about':
        return [
          {
            id: uid(),
            type: 'section',
            title: `${about.name} — ${about.tagline}`,
            lines: about.bio,
          },
        ]
      case 'projects':
        return [
          {
            id: uid(),
            type: 'list',
            title: 'Projects',
            items: projects.map((project) => ({
              label: project.title,
              hint: project.stack.join(', '),
              action: { type: 'project', slug: project.slug },
            })),
          },
        ]
      case 'skills':
        return [
          {
            id: uid(),
            type: 'section',
            title: 'Skills',
            lines: Object.entries(skills).map(([group, list]) => `${group}: ${list.join(', ')}`),
          },
        ]
      case 'experience':
        return [
          {
            id: uid(),
            type: 'section',
            title: 'Experience',
            lines: experiences.map((exp) => `${exp.period} — ${exp.title}: ${exp.summary}`),
          },
        ]
      case 'blog':
        return [
          {
            id: uid(),
            type: 'list',
            title: 'Blog posts',
            items: blogPosts.map((post) => ({
              label: post.title,
              hint: post.summary,
              action: { type: 'blog', slug: post.slug },
            })),
          },
        ]
      case 'resume':
        return [
          { id: uid(), type: 'text', text: 'Resume available via `open resume` or click below.' },
          {
            id: uid(),
            type: 'links',
            items: [{ label: 'Download resume', value: resumeLink, href: resumeLink }],
          },
        ]
      case 'contact':
        return [
          { id: uid(), type: 'text', text: 'You can reach out through any link below:' },
          { id: uid(), type: 'links', items: contact },
        ]
      default:
        return [{ id: uid(), type: 'text', text: 'Unknown section' }]
    }
  }, [])

  const openSection = useCallback(
    (sectionName, fromCommand) => {
      if (!sections.includes(sectionName)) return
      setActiveSection(sectionName)
      pushStatus([`Opened ${sectionName}`])
    },
    [pushStatus, renderSection]
  )

  const appendCommand = useCallback(async (input) => {
    const command = input.trim()
    if (!command) return

    const updatedHistory = [...history, command]
    setHistory(updatedHistory)

    const parts = command.split(' ').filter(Boolean)
    const base = (parts[0] || '').toLowerCase()
    const rest = parts.slice(1)
    const arg = rest.join(' ').toLowerCase()
    const outputs = []

    if (base === 'clear') {
      setStatus([])
      return
    }

    if (base === 'help') {
      outputs.push('Commands: help, ls, cd <section>, open <item>, whoami, toggle bg, toggle text, history, clear')
    } else if (base === 'ls') {
      outputs.push(`Sections: ${sections.join(', ')}`)
    } else if (base === 'cd') {
      if (!arg) {
        outputs.push('Usage: cd <section>')
      } else if (sections.includes(arg)) {
        openSection(arg, true)
        return
      } else {
        outputs.push(`No such section: ${arg}`)
      }
    } else if (base === 'open') {
      if (!arg) {
        outputs.push('Usage: open <project|blog|resume>')
      } else if (arg === 'resume') {
        window.open(resumeLink, '_blank')
        outputs.push('Opening resume...')
      } else {
        const project = projects.find((p) => p.slug === arg)
        const post = blogPosts.find((p) => p.slug === arg)
        if (project) {
          setModal({ type: 'project', item: project })
          outputs.push(`Opening project: ${project.title}`)
        } else if (post) {
          await openBlog(post.slug)
          outputs.push(`Opening post: ${post.title}`)
        } else {
          outputs.push(`Nothing to open for: ${arg}`)
        }
      }
    } else if (base === 'whoami') {
      outputs.push(`${about.name} — ${about.tagline}`)
    } else if (base === 'toggle') {
      if (arg === 'bg') {
        setIsDark((prev) => !prev)
        outputs.push(`Background toggled to ${!isDark ? 'dark' : 'light'}.`)
      } else if (arg === 'text') {
        const newTone = nextTone(toneKey)
        setToneKey(newTone)
        outputs.push(`Text color switched to ${newTone}.`)
      } else {
        outputs.push('Try: toggle bg | toggle text')
      }
    } else if (base === 'history') {
      outputs.push(updatedHistory.length ? updatedHistory.map((item, idx) => `${idx + 1}. ${item}`).join(' | ') : 'No commands yet.')
    } else {
      outputs.push(`${base}: command not found`)
    }

    pushStatus(outputs)
  }, [history, isDark, openBlog, openSection, pushStatus, toneKey])

  const handleAction = useCallback(
    (action) => {
      if (!action) return
      if (action.type === 'command') {
        appendCommand(action.value)
      }
      if (action.type === 'project') {
        const project = projects.find((p) => p.slug === action.slug)
        if (project) setModal({ type: 'project', item: project })
      }
      if (action.type === 'blog') {
        openBlog(action.slug)
      }
      if (action.type === 'skill') {
        const items = skills[action.group]
        if (items) setModal({ type: 'skill', item: { title: action.group, items } })
      }
    },
    [appendCommand, openBlog]
  )

  const closeModal = () => setModal(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!commandValue.trim()) return
    appendCommand(commandValue)
    setHistoryIndex(null)
    setCommandValue('')
  }

  const handleArrow = (direction) => {
    if (!history.length) return
    setHistoryIndex((prev) => {
      let nextIndex = prev
      if (prev === null) {
        nextIndex = direction === 'up' ? history.length - 1 : null
      } else {
        nextIndex = direction === 'up' ? Math.max(0, prev - 1) : Math.min(history.length - 1, prev + 1)
      }

      if (nextIndex === null) return null
      setCommandValue(history[nextIndex] || '')
      return nextIndex
    })
  }

  return (
    <>
      <div className={`min-h-screen pb-24 ${isDark ? 'bg-black text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
        <div className="mx-auto max-w-5xl px-4 py-8 space-y-6">
          <div className="space-y-1">
            <div className={`text-sm uppercase tracking-[0.3em] ${tone.accentSoft}`}>Aditya Dinesh Rajput</div>
            <div className="text-2xl font-semibold">ECE Student | Embedded Systems | Web Development</div>
          </div>
          <SectionPanel active={activeSection} onNavigate={openSection} onAction={handleAction} tone={tone} isDark={isDark} />
        </div>
        <div className={`fixed bottom-0 left-0 right-0 border-t ${isDark ? 'border-slate-800 bg-black' : 'border-slate-200 bg-white/95 shadow-[0_-10px_30px_rgba(15,23,42,0.08)]'}`}>
          <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-3">
            <div className={`text-[12px] ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>{status.slice(-2).join(' | ') || 'Ready.'}</div>
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <div className={`text-sm font-semibold ${tone.accent}`}>{promptLabel}</div>
              <input
                ref={inputRef}
                value={commandValue}
                onChange={(e) => setCommandValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowUp') {
                    e.preventDefault()
                    handleArrow('up')
                  }
                  if (e.key === 'ArrowDown') {
                    e.preventDefault()
                    handleArrow('down')
                  }
                }}
                className={`w-full bg-transparent text-sm md:text-base outline-none ${tone.input}`}
                spellCheck={false}
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                placeholder="Type a command"
              />
            </form>
          </div>
        </div>
      </div>

      {modal ? (
        <Modal
          title={modal.item.title}
          onClose={closeModal}
          tone={tone}
          isDark={isDark}
          renderHtml={modal.type === 'blog'}
          htmlContent={modal.type === 'blog' ? modal.item.html : undefined}
        >
          {modal.type === 'project' ? (
            <div className="space-y-3">
              <p>{modal.item.description}</p>
              <div className="text-sm text-slate-500">Stack: {modal.item.stack.join(', ')}</div>
              <div className="flex flex-wrap gap-2 text-sm">
                <a
                  href={modal.item.github}
                  target="_blank"
                  rel="noreferrer"
                  className={`px-3 py-2 transition ${tone.card} ${tone.border}`}
                >
                  GitHub
                </a>
                {modal.item.demo ? (
                  <a
                    href={modal.item.demo}
                    target="_blank"
                    rel="noreferrer"
                    className={`px-3 py-2 transition ${tone.card} ${tone.border}`}
                  >
                    Demo
                  </a>
                ) : null}
              </div>
            </div>
          ) : null}

          {modal.type === 'skill' ? (
            <div className="space-y-2 text-sm md:text-base">
              {modal.item.items.map((item) => (
                <div key={item} className={isDark ? 'text-slate-100' : 'text-slate-800'}>
                  {item}
                </div>
              ))}
            </div>
          ) : null}
        </Modal>
      ) : null}
    </>
  )
}

export default App
