import { useEffect, useState } from 'react'
import { Sun, Moon, Menu } from 'lucide-react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState('system')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    // Initialize theme from localStorage or system preference
    const stored = localStorage.getItem('theme') || 'system'
    setTheme(stored)
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = stored === 'dark' || (stored === 'system' && prefersDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  const toggleTheme = () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const next = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'
    setTheme(next)
    localStorage.setItem('theme', next)
    const isDark = next === 'dark' || (next === 'system' && prefersDark)
    document.documentElement.classList.toggle('dark', isDark)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors ${
        scrolled
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur shadow-sm'
          : 'bg-transparent'
      }`}
      role="banner"
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Primary">
        <div className="flex h-16 items-center justify-between">
          <a href="#home" className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded px-2">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-indigo-600 rounded-md" aria-hidden="true" />
            <span className="font-semibold text-slate-900 dark:text-slate-100">Rahul CJ</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {[
              { href: '#about', label: 'About' },
              { href: '#projects', label: 'Projects' },
              { href: '#skills', label: 'Skills' },
              { href: '#education', label: 'Education' },
              { href: '#contact', label: 'Contact' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded px-2 py-1"
              >
                {item.label}
              </a>
            ))}
            <button
              aria-label={`Theme: ${theme}`}
              onClick={toggleTheme}
              className="p-2 rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            >
              {theme === 'dark' ? (
                <Moon className="w-5 h-5 text-slate-900 dark:text-slate-100" />
              ) : theme === 'light' ? (
                <Sun className="w-5 h-5 text-slate-900 dark:text-slate-100" />
              ) : (
                <div className="flex items-center gap-1">
                  <Sun className="w-4 h-4 text-slate-900 dark:text-slate-100" />
                  <Moon className="w-4 h-4 text-slate-900 dark:text-slate-100" />
                </div>
              )}
            </button>
          </div>
          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden p-2 rounded-md border border-slate-200 dark:border-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation"
          >
            <Menu className="w-5 h-5 text-slate-900 dark:text-slate-100" />
          </button>
        </div>
        {open && (
          <div id="mobile-nav" className="md:hidden pb-4 space-y-2" role="menu">
            {[
              { href: '#about', label: 'About' },
              { href: '#projects', label: 'Projects' },
              { href: '#skills', label: 'Skills' },
              { href: '#education', label: 'Education' },
              { href: '#contact', label: 'Contact' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400"
                role="menuitem"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => {
                toggleTheme()
                setOpen(false)
              }}
              className="inline-flex items-center gap-2 p-2 rounded-md border border-slate-200 dark:border-slate-700"
            >
              <Sun className="w-4 h-4" /> / <Moon className="w-4 h-4" /> Theme
            </button>
          </div>
        )}
      </nav>
      {/* Gradient underline */}
      <div className="h-px w-full bg-gradient-to-r from-teal-500 via-indigo-600 to-teal-500 opacity-70" aria-hidden="true" />
    </header>
  )
}
