import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

export default function MainContent() {
  useEffect(() => {
    // Smooth scroll behavior for in-page anchors
    document.documentElement.style.scrollBehavior = 'smooth'
    return () => {
      document.documentElement.style.scrollBehavior = ''
    }
  }, [])

  return (
    <main id="content" className="relative z-10">
      <About />
      <Projects />
      <Skills />
      <Education />
      <Contact />
    </main>
  )
}

function Section({ id, title, children }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          id={`${id}-title`}
          className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          {title}
        </motion.h2>
        <div className="mt-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <Section id="about" title="About">
      <p className="max-w-3xl text-slate-700 dark:text-slate-300 leading-relaxed">
        I'm Rahul, an AIML undergraduate at MSRIT with hands-on experience building computer-vision and generative AI systems. I enjoy turning research ideas into robust applications — from number-plate recognition to audio translation and security-focused ML.
      </p>
    </Section>
  )
}

function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    fetch('/projects.json', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setProjects(data)
          setLoading(false)
        }
      })
      .catch(() => setLoading(false))
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <Section id="projects" title="Projects">
      {loading ? (
        <p className="text-slate-600 dark:text-slate-400">Loading projects…</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <article
              key={p.title}
              className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 backdrop-blur p-5 shadow-sm hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-orange-400"
            >
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {p.title}
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{p.short}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center rounded-full bg-teal-50 text-teal-700 dark:bg-teal-900/40 dark:text-teal-200 px-2.5 py-0.5 text-xs border border-teal-200/60 dark:border-teal-700/50"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-3">
                <a
                  href={p.link}
                  className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded px-1"
                >
                  <ExternalLink className="w-4 h-4" /> Demo / Link
                </a>
                {p.github && (
                  <a
                    href={p.github}
                    className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded px-1"
                  >
                    <Github className="w-4 h-4" /> GitHub
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </Section>
  )
}

function Skills() {
  const skills = useMemo(
    () => [
      { name: 'Python (advanced)', level: 90 },
      { name: 'Computer Vision (OpenCV, YOLO, object detection)', level: 85 },
      { name: 'Deep Learning (PyTorch, TensorFlow)', level: 82 },
      { name: 'NLP & Speech (transformers, ASR, TTS)', level: 78 },
      { name: 'React & Frontend (React, Tailwind)', level: 75 },
      { name: 'Backend & APIs (Flask/Django, Docker)', level: 80 },
      { name: 'Databases (MySQL/Postgres/NoSQL)', level: 72 },
      { name: 'Git, CI/CD, Docker', level: 76 },
    ],
    []
  )

  return (
    <Section id="skills" title="Skills">
      <ul className="space-y-4" role="list">
        {skills.map((s) => (
          <li key={s.name} className="">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{s.name}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400" aria-hidden>
                {s.level}%
              </span>
            </div>
            <div
              className="mt-2 h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden"
              role="progressbar"
              aria-valuenow={s.level}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${s.name} proficiency`}
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${s.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-teal-500 to-indigo-600"
              />
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}

function Education() {
  return (
    <Section id="education" title="Education">
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 backdrop-blur p-5">
        <p className="text-slate-800 dark:text-slate-200 font-medium">B.E. — AIML, MSRIT — Currently 3rd Year</p>
      </div>
    </Section>
  )
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required'
    if (form.message.trim().length < 10) e.message = 'Please enter at least 10 characters'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onSubmit = (ev) => {
    ev.preventDefault()
    if (!validate()) return
    const subject = encodeURIComponent('Portfolio contact')
    const body = encodeURIComponent(`From: ${form.name} <${form.email}>\n\n${form.message}`)
    window.location.href = `mailto:rahulchowdhary.j@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <Section id="contact" title="Contact">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-2 text-slate-700 dark:text-slate-300">
          <p>Email: <a className="text-indigo-600 dark:text-indigo-400 hover:underline" href="mailto:rahulchowdhary.j@gmail.com">rahulchowdhary.j@gmail.com</a></p>
          <p>Phone: <a className="text-indigo-600 dark:text-indigo-400 hover:underline" href="tel:+919121610100">+91 9121610100</a></p>
          <p>LinkedIn / GitHub: add when ready</p>
        </div>
        <form onSubmit={onSubmit} noValidate className="space-y-4" aria-label="Contact form">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={onChange}
              className="mt-1 w-full rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100 focus:border-teal-500 focus:ring-teal-500"
              required
            />
            {errors.name && <p className="mt-1 text-xs text-orange-600">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              className="mt-1 w-full rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100 focus:border-teal-500 focus:ring-teal-500"
              required
            />
            {errors.email && <p className="mt-1 text-xs text-orange-600">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={onChange}
              rows={4}
              className="mt-1 w-full rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100 focus:border-teal-500 focus:ring-teal-500"
              required
            />
            {errors.message && <p className="mt-1 text-xs text-orange-600">{errors.message}</p>}
          </div>
          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-teal-500 to-indigo-600 shadow hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            >
              Send message
            </button>
          </div>
        </form>
      </div>
    </Section>
  )
}
