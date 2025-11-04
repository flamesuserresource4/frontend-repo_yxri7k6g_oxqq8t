export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          © {new Date().getFullYear()} Rahul Chowdhary J. All rights reserved.
        </p>
        <div className="text-sm text-slate-600 dark:text-slate-400">
          Built with React, Tailwind CSS, and Framer Motion.
        </div>
      </div>
    </footer>
  )
}
