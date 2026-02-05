const Modal = ({ title, onClose, children, tone, isDark, renderHtml = false, htmlContent }) => {
  if (!title) return null

  const content = renderHtml ? (
    <div
      className={`markdown-body ${isDark ? 'markdown-body-dark' : 'markdown-body-light'}`}
      dangerouslySetInnerHTML={{ __html: htmlContent || '' }}
    />
  ) : (
    children
  )

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-4 py-10 backdrop-blur">
      <div
        className={`w-full max-w-3xl overflow-hidden rounded-xl border shadow-2xl ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className={`flex items-center justify-between border-b px-4 py-3 text-sm ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <div className={`font-semibold ${tone.accent}`}>{title}</div>
          <button
            onClick={onClose}
            className={`rounded-md px-2 py-1 text-xs uppercase tracking-wider transition ${tone.border} ${tone.focus}`}
          >
            Close
          </button>
        </div>
        <div className="max-h-[70vh] space-y-3 overflow-y-auto p-5 text-sm md:text-base">{content}</div>
      </div>
    </div>
  )
}

export default Modal
