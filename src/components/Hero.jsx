import { motion } from 'framer-motion'
import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[90vh] pt-16 overflow-hidden">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
        {/* Gradient overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent dark:from-slate-900 dark:via-slate-900/40 pointer-events-none" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center min-h-[70vh]">
        <div className="w-full">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Rahul Chowdhary J
          </motion.h1>
          <motion.p
            className="mt-2 text-lg sm:text-xl font-medium bg-gradient-to-r from-teal-500 to-indigo-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            AIML Student — B.E. (3rd year), MSRIT
          </motion.p>
          <motion.p
            className="mt-4 max-w-2xl text-slate-700 dark:text-slate-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            "Building intelligent systems — computer vision, generative models, and real-world AI"
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-teal-500 to-indigo-600 shadow hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            >
              View Projects
            </a>
            <a
              href="/resume.pdf"
              className="inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold text-teal-700 dark:text-teal-300 border border-teal-300/60 dark:border-teal-600/60 hover:bg-teal-50 dark:hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            >
              Download Resume
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
