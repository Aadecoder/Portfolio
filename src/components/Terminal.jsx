import { useEffect, useMemo, useRef, useState } from 'react'

const Entry = ({ entry, tone, onAction }) => {
  const textClass = entry.muted ? 'text-slate-500' : ''

  if (entry.type === 'prompt') {
    return (
      <div className="flex gap-2 text-sm md:text-base">
        <span className={`${tone.accent} font-semibold`}>{entry.prompt}</span>
        <span className="text-inherit">{entry.command}</span>
      </div>
    )
  }

  if (entry.type === 'section') {
    return (
      <div className="space-y-1">
        <div className={`uppercase tracking-wider text-xs ${tone.accentSoft}`}>{entry.title}</div>
        {entry.lines.map((line, idx) => (
          <div key={idx} className={`text-sm md:text-base ${textClass}`}>
            {line}
          </div>
        ))}
      </div>
    )
  }

  if (entry.type === 'list') {
    return (
      <div className="space-y-2">
        {entry.title ? <div className={`text-xs uppercase tracking-wider ${tone.accentSoft}`}>{entry.title}</div> : null}
        <div className="grid gap-2 sm:grid-cols-2">
          {entry.items.map((item, idx) => (
            <button
              key={`${item.label}-${idx}`}
              className={`text-left rounded-lg border px-3 py-2 transition focus:outline-none focus:ring-2 focus:ring-offset-2 ${tone.border} ${tone.focus} ${tone.card}`}
              onClick={() => onAction?.(item.action || { type: 'command', value: item.command })}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && onAction) {
                  e.preventDefault()
                  onAction(item.action || { type: 'command', value: item.command })
                }
              }}
            >
              <div className={`font-semibold ${tone.accent}`}>{item.label}</div>
              {item.hint ? <div className="text-xs text-slate-500">{item.hint}</div> : null}
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (entry.type === 'links') {
    return (
      <div className="space-y-1">
        {entry.items.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className={`block text-sm md:text-base underline decoration-dotted underline-offset-4 transition hover:translate-x-1 ${tone.accent}`}
          >
            {link.label}: {link.value}
          </a>
        ))}
      </div>
    )
  }

  return (
    <div className={`text-sm md:text-base ${textClass}`}>{entry.text}</div>
  )
}

const Terminal = ({ entries, promptLabel, onSubmit, history, tone, onAction, isDark, className }) => {
  const [value, setValue] = useState('')
  const [historyIndex, setHistoryIndex] = useState(null)
  const scrollRef = useRef(null)
  const inputRef = useRef(null)

  const baseContainer = useMemo(
    () =>
      isDark
        ? 'bg-slate-900/80 border border-slate-800 shadow-[0_25px_60px_rgba(0,0,0,0.45)]'
        : 'bg-white border border-slate-200 shadow-[0_25px_60px_rgba(15,23,42,0.12)]',
    [isDark]
  )

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [entries])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.ctrlKey && e.key === 'l') {
        e.preventDefault()
        onSubmit('clear')
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onSubmit])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!value.trim()) return
    onSubmit(value.trim())
    setHistoryIndex(null)
    setValue('')
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
      setValue(history[nextIndex] || '')
      return nextIndex
    })
  }

  return (
    <div className={className}>
      <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-500">
        <span>Terminal</span>
      </div>
      <div className={`relative overflow-hidden rounded-xl ${baseContainer}`}>
        <div className={`flex items-center gap-2 border-b px-4 py-3 text-xs ${isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50'}`}>
          <div className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
          </div>
          <span className="font-semibold text-slate-500">aditya@portfolio</span>
          <span className="text-slate-700">—</span>
        </div>
        <div
          ref={scrollRef}
          className="max-h-[70vh] min-h-[50vh] space-y-3 overflow-y-auto px-4 py-5 md:px-6"
          onClick={() => inputRef.current?.focus()}
        >
          {entries.map((entry) => (
            <Entry key={entry.id} entry={entry} tone={tone} onAction={onAction} />
          ))}
        </div>
        <form onSubmit={handleSubmit} className={`flex items-center gap-2 border-t px-4 py-3 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <div className={`text-sm md:text-base font-semibold ${tone.accent}`}>{promptLabel}</div>
          <div className="relative w-full">
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
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
              className={`w-full bg-transparent text-sm md:text-base outline-none caret-current ${tone.input}`}
              spellCheck={false}
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              placeholder="Enter a command..."
            />
            <span className={`pointer-events-none absolute -left-2 top-1 h-4 w-[2px] animate-blink ${tone.caret}`} />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Terminal
