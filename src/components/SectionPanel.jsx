import { sections, about, projects, skills, experiences, blogPosts, contact, resumeLink } from '../data/content'

const SectionPanel = ({ active, onNavigate, onAction, tone, isDark }) => {
  const cardBase = `border px-4 py-3 transition ${tone.border} ${tone.card}`
  const panelShell = isDark ? 'border border-slate-800 bg-black p-4' : 'border border-slate-200 bg-white p-4 shadow-sm'

  const renderContent = () => {
    switch (active) {
      case 'about':
        return (
          <div className="space-y-2 text-sm md:text-base">
            <div className="text-lg font-semibold">{about.name}</div>
            <div className={tone.accent}>{about.tagline}</div>
            {about.bio.map((line) => (
              <p key={line} className="text-slate-400">
                {line}
              </p>
            ))}
          </div>
        )
      case 'projects':
        return (
          <div className="space-y-3">
            {projects.map((project) => (
              <button
                key={project.slug}
                className={`${cardBase} block w-full text-left`}
                onClick={() => onAction({ type: 'project', slug: project.slug })}
              >
                <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                  <div className="text-sm font-semibold md:text-base">{project.title}</div>
                  <div className={`text-xs uppercase tracking-wide ${tone.accentSoft}`}>{project.field}</div>
                </div>
                <div className="text-xs text-slate-500">{project.stack.join(', ')}</div>
              </button>
            ))}
          </div>
        )
      case 'skills':
        return (
          <div className="grid gap-3 sm:grid-cols-2">
            {Object.entries(skills).map(([group, list]) => (
              <button
                key={group}
                className={`${cardBase} text-left`}
                onClick={() => onAction?.({ type: 'skill', group })}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="text-sm font-semibold md:text-base capitalize">{group}</div>
                  <div className={`text-[10px] uppercase tracking-wide ${tone.accentSoft}`}>{list.length} items</div>
                </div>
                <div className="mt-1 text-xs text-slate-500">{list.slice(0, 3).join(', ')}{list.length > 3 ? ', …' : ''}</div>
              </button>
            ))}
          </div>
        )
      case 'experience':
        return (
          <div className="space-y-3 text-sm md:text-base text-slate-300">
            {experiences.map((exp) => (
              <div key={exp.title} className={`${cardBase} bg-transparent`}>
                <div className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-500">
                  <span>{exp.period}</span>
                  <span className={tone.accentSoft}>{exp.title}</span>
                </div>
                <div className="mt-1 text-slate-200">{exp.summary}</div>
              </div>
            ))}
          </div>
        )
      case 'blog':
        return (
          <div className="space-y-3">
            {blogPosts.map((post) => (
              <button
                key={post.slug}
                className={`${cardBase} text-left`}
                onClick={() => onAction({ type: 'blog', slug: post.slug })}
              >
                <div className="font-semibold">{post.title}</div>
                <div className="text-xs text-slate-500">{post.summary}</div>
              </button>
            ))}
          </div>
        )
      case 'resume':
        return (
          <div className="space-y-3 text-sm md:text-base">
            <p className="text-slate-400">Download or view the PDF resume.</p>
            <a
              href={resumeLink}
              className={`${cardBase} inline-flex items-center gap-2 text-sm font-semibold ${tone.accent}`}
              target="_blank"
              rel="noreferrer"
            >
              Download Resume
            </a>
          </div>
        )
      case 'contact':
        return (
          <div className="space-y-2 text-sm md:text-base">
            {contact.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="block underline decoration-dotted underline-offset-4 transition hover:translate-x-1"
              >
                <span className={`${tone.accent} font-semibold`}>{item.label}:</span> {item.value}
              </a>
            ))}
          </div>
        )
      default:
        return <div className="text-sm text-slate-400">Pick a section to view details.</div>
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {sections.map((section) => (
              <button
                key={section}
                onClick={() => onNavigate(section)}
                className={`${cardBase} text-left text-sm ${active === section ? 'ring-2 ring-offset-0 ring-sky-400/70' : ''}`}
              >
                <div className="font-semibold capitalize">{section}</div>
              </button>
            ))}
          </div>
      </div>

      <div className={panelShell}>
        <div className="mb-2 text-xs uppercase tracking-[0.3em] text-slate-500">{active} section</div>
        {renderContent()}
      </div>
    </div>
  )
}

export default SectionPanel
