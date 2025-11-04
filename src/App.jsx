import { useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import MainContent from './components/MainContent'
import Footer from './components/Footer'

function App() {
  useEffect(() => {
    // Basic SEO and social tags injection
    document.title = 'Rahul Chowdhary J — AIML Portfolio'

    const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta')
    metaDescription.name = 'description'
    metaDescription.content =
      'Portfolio of Rahul Chowdhary J — AIML Student at MSRIT. Projects in computer vision, generative models, and speech.'
    document.head.appendChild(metaDescription)

    const ogTitle = document.querySelector('meta[property="og:title"]') || document.createElement('meta')
    ogTitle.setAttribute('property', 'og:title')
    ogTitle.setAttribute('content', 'Rahul Chowdhary J — AIML Portfolio')
    document.head.appendChild(ogTitle)

    const ogDesc = document.querySelector('meta[property="og:description"]') || document.createElement('meta')
    ogDesc.setAttribute('property', 'og:description')
    ogDesc.setAttribute(
      'content',
      'Projects in ANPR, diffusion image generation, voice translation, phishing detection, and theft detection.'
    )
    document.head.appendChild(ogDesc)

    const ogType = document.querySelector('meta[property="og:type"]') || document.createElement('meta')
    ogType.setAttribute('property', 'og:type')
    ogType.setAttribute('content', 'website')
    document.head.appendChild(ogType)

    // Structured data (JSON-LD)
    const ld = document.createElement('script')
    ld.type = 'application/ld+json'
    ld.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Rahul Chowdhary J',
      jobTitle: 'AIML Student — B.E. (3rd year), MSRIT',
      email: 'mailto:rahulchowdhary.j@gmail.com',
      url: window.location.origin,
      sameAs: [],
      worksFor: { '@type': 'CollegeOrUniversity', name: 'MSRIT' },
    })
    document.head.appendChild(ld)

    return () => {
      if (ld && document.head.contains(ld)) document.head.removeChild(ld)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <Header />
      <Hero />
      <div className="relative">
        {/* subtle background accents */}
        <div className="pointer-events-none absolute inset-x-0 -top-8 h-24 bg-gradient-to-b from-teal-100/50 to-transparent dark:from-indigo-900/20" aria-hidden="true" />
        <MainContent />
      </div>
      <Footer />
    </div>
  )
}

export default App
