import { useEffect, useRef, useState } from 'react'
import './index.css'

// ── Intersection Observer Hook ────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

// ── Data ──────────────────────────────────────────────────────────────────────
const NAV_LINKS = ['About', 'Research', 'Publications', 'Projects', 'Contact']

const SKILLS = ['Python', 'PyTorch', 'Transformers', 'NLP', 'Machine Learning',
  'LaTeX', 'MATLAB', 'Pandas', 'Streamlit', 'Flask', 'HTML/CSS', 'Java']

const RESEARCH = [
  {
    period: 'Aug. 2025 – Present',
    title: 'Mitacs Globalink Research Internship',
    org: 'University of Prince Edward Island',
    location: 'Remote (CSC Funded)',
    supervisor: 'Prof. Paul Sheridan',
    bullets: [
      'Analyzed the Skip-gram with Negative Sampling model by differentiating the KL divergence between empirical co-occurrence and negative-sampling distributions w.r.t. exponent α.',
      'Minimized KL divergence on the text8 corpus and through Zipf-based simulations, showing divergence reaches minimum at α≈0.75, providing an information-theoretic explanation.',
    ],
  },
  {
    period: 'Jan. 2025 – Feb. 2025',
    title: 'NCSU Winter GEARS Online Program',
    org: 'North Carolina State University',
    location: 'Remote',
    supervisor: 'Prof. Min Chi',
    bullets: [
      'Led a 3-person team developing a BERT-based web classifier, managing the full pipeline from data cleaning and feature extraction to model training.',
      'Authored a custom regex script to clean and normalize a highly noisy raw corpus, significantly improving data quality.',
    ],
  },
  {
    period: 'Aug. 2024 – Nov. 2024',
    title: 'Greedy-Gnorm: Head Pruning via Gradient Matrix Norms',
    org: 'Independent Research',
    location: 'Chengdu, China',
    supervisor: 'Independent',
    bullets: [
      'Developed Greedy-Gnorm, a dynamic Transformer head-pruning method using Q/K/V gradient-matrix norms to iteratively select the least important head.',
      'Demonstrated Gnorm provides more stable head-importance assessment, achieving a smoother accuracy–compression curve; manuscript submitted to JMLR.',
    ],
  },
  {
    period: 'Jul. 2024 – Aug. 2024',
    title: 'Applying Attention Entropy in Transformers',
    org: 'University of Cambridge',
    location: 'Remote',
    supervisor: 'Prof. Kieren Lovell',
    bullets: [
      'Used Attention Entropy as a metric to evaluate 144 heads in Transformer and IndoBERT models; reduced model size from 475 MB to 394 MB while retaining 90%+ accuracy.',
      'Authored a 58-page academic paper and achieved grade A.',
    ],
  },
  {
    period: 'Jan. 2024 – Apr. 2024',
    title: 'Transformer Interpretability Analysis',
    org: 'University of Notre Dame',
    location: 'Remote',
    supervisor: 'Prof. Yiyu Shi',
    bullets: [
      'Compared xtremedistil with GPT-2, BERT, and RoBERTa using maximum attention values; visualized attention rays and classified head types.',
      'Used BertViz to locate different types of attention heads on importance heatmaps.',
    ],
  },
  {
    period: 'Jul. 2023 – Aug. 2023',
    title: 'Corpus Text Analysis Based on NLP',
    org: 'Imperial College London',
    location: 'London, UK',
    supervisor: 'Summer School',
    bullets: [
      'Preprocessed COVID-19 Corpus using n-gram, skip-gram, and BPE; trained Word2Vec with TensorFlow and visualized embeddings with T-SNE.',
    ],
  },
]

const PROJECTS = [
  {
    title: "Children's Donation Web Platform",
    period: 'May–Jun. 2025',
    tags: ['Flask', 'Chart.js', 'Three.js', 'Full-Stack'],
    description: 'Interactive 3D user-network visualization where donation flows are represented by white particle movements. Built full-stack with Chart.js admin dashboards, Flask backend, and real-time analytics.',
  },
  {
    title: 'AI Price Negotiation System',
    period: 'Jul. 2025 – Present',
    tags: ['LLM', 'FSM', 'Prompt Engineering', 'Python'],
    description: 'Novel FSM + LLM framework separating rule-based logic from fluid dialogue, overcoming LLM instability in pricing tasks. Designed JSON protocol with iterative prompt engineering for structured LLM output.',
  },
  {
    title: 'Travel System for Visually Impaired',
    period: 'Nov. 2024 – May 2025',
    tags: ['YOLO', 'Deep Learning', 'Python', 'Software Copyright'],
    description: 'YOLO-based navigation system converting visual signals to acoustic instructions. Multi-threaded video pipeline reducing visual lag; speech feedback module with directional voice commands. Officially awarded Chinese Software Copyright.',
  },
]

const AWARDS = [
  { year: '2024', title: 'Mitacs Globalink Research Internship', note: 'Funded by China Scholarship Council' },
  { year: '2024', title: 'SWUFE Second Class Scholarship', note: '' },
  { year: '2024', title: 'China MCM – Provincial First Prize', note: 'Team Leader' },
  { year: '2024', title: 'Mathematical Contest in Modeling (MCM)', note: 'Team Leader' },
  { year: '2023', title: 'SWUFE First Class Scholarship', note: 'Top 2 in class' },
]

// ── Sub-components ────────────────────────────────────────────────────────────

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  )
}

function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-12">
      <span className="text-xs font-sans uppercase tracking-[0.2em] text-accent font-bold">{label}</span>
      <h2 className="font-serif text-3xl md:text-4xl text-primary mt-2 leading-tight">{title}</h2>
      <div className="mt-4 w-10 h-0.5 bg-accent" />
    </div>
  )
}

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-surface/90 backdrop-blur-md border-b border-border shadow-sm' : 'bg-transparent'
    }`}>
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-serif text-xl text-primary hover:text-accent transition-colors duration-200 cursor-pointer"
        >
          YG
        </button>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <li key={link}>
              <button
                onClick={() => scrollTo(link)}
                className="text-sm text-secondary hover:text-accent transition-colors duration-200 cursor-pointer font-sans tracking-wide"
              >
                {link}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-primary transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-primary transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-primary transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`md:hidden bg-surface/95 backdrop-blur-md border-b border-border transition-all duration-300 ${mobileOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <ul className="px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map(link => (
            <li key={link}>
              <button onClick={() => scrollTo(link)} className="text-sm text-secondary hover:text-accent transition-colors cursor-pointer">
                {link}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden px-6">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -left-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl" style={{ animationDelay: '3s' }} />
      </div>

      {/* Subtle grid */}
      <div className="absolute inset-0 -z-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(37,99,235,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.03) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="max-w-5xl mx-auto w-full pt-24 pb-16">
        <div className="animate-fade-up opacity-0" style={{ animationFillMode: 'forwards' }}>
          <span className="inline-block text-xs font-sans uppercase tracking-[0.25em] text-accent font-bold mb-6">
            Researcher · Developer · Builder
          </span>
        </div>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-primary leading-none tracking-tight animate-fade-up opacity-0 animate-delay-100" style={{ animationFillMode: 'forwards' }}>
          Yuxi<br />
          <span className="text-secondary">Guo</span>
        </h1>

        <div className="mt-6 animate-fade-up opacity-0 animate-delay-200" style={{ animationFillMode: 'forwards' }}>
          <p className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed font-sans">
            MIS student at SWUFE–University of Delaware, focused on 
            <span className="text-primary font-medium"> NLP</span>, 
            <span className="text-primary font-medium"> Transformer interpretability</span>, and 
            <span className="text-primary font-medium"> model compression</span>. 
            Published researcher with experience across China, Canada, the UK, and the US.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-4 animate-fade-up opacity-0 animate-delay-300" style={{ animationFillMode: 'forwards' }}>
          <button
            onClick={() => document.getElementById('research')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-7 py-3 bg-primary text-white font-sans text-sm tracking-wide hover:bg-accent transition-colors duration-300 cursor-pointer"
          >
            View Research
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-7 py-3 border border-primary text-primary font-sans text-sm tracking-wide hover:border-accent hover:text-accent transition-colors duration-300 cursor-pointer"
          >
            Get in Touch
          </button>
        </div>

        {/* Stats row */}
        <div className="mt-16 flex flex-wrap gap-10 animate-fade-up opacity-0 animate-delay-400" style={{ animationFillMode: 'forwards' }}>
          {[
            { num: '6+', label: 'Research Projects' },
            { num: '1', label: 'Publication (ACE)' },
            { num: '3.8', label: 'GPA (UD)' },
            { num: '3', label: 'International Programs' },
          ].map(({ num, label }) => (
            <div key={label}>
              <div className="font-serif text-3xl text-primary">{num}</div>
              <div className="text-xs text-muted uppercase tracking-wider mt-1 font-sans">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in opacity-0 animate-delay-600" style={{ animationFillMode: 'forwards' }}>
        <span className="text-xs text-muted uppercase tracking-widest font-sans">scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-muted to-transparent" />
      </div>
    </section>
  )
}

// ── About ─────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <SectionHeading label="Background" title="About Me" />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <AnimatedSection>
            <div className="space-y-5 text-secondary leading-relaxed">
              <p>
                I'm a fourth-year student in the joint program between 
                <span className="text-primary font-medium"> Southwestern University of Finance and Economics (SWUFE)</span> and the 
                <span className="text-primary font-medium"> University of Delaware</span>, 
                pursuing dual degrees in Management Information Systems.
              </p>
              <p>
                My research sits at the intersection of NLP and deep learning interpretability — particularly 
                Transformer attention mechanisms, model pruning, and information-theoretic analysis of 
                language models. I've been fortunate to collaborate with researchers at Cambridge, Notre Dame, NCSU, and UPEI.
              </p>
              <p>
                Outside of research, I build systems: from AI-powered negotiation bots to accessibility 
                tools for visually impaired users. I believe good engineering and rigorous science can coexist.
              </p>
            </div>

            <div className="mt-8 p-5 border border-border bg-surface">
              <div className="text-xs uppercase tracking-widest text-muted font-sans mb-3">Education</div>
              <div className="space-y-3">
                <div>
                  <div className="font-serif text-primary">SWUFE–University of Delaware</div>
                  <div className="text-xs text-muted font-sans mt-0.5">B.S. MIS (UD, GPA 3.8) · B.Mgmt IMIS (SWUFE, GPA 4.1/5.0) · 2022–2026</div>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="font-serif text-primary">Imperial College London</div>
                  <div className="text-xs text-muted font-sans mt-0.5">Data Science Summer School · 2023</div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div>
              <div className="text-xs uppercase tracking-widest text-muted font-sans mb-4">Technical Skills</div>
              <div className="flex flex-wrap gap-2">
                {SKILLS.map(skill => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs font-sans text-secondary border border-border hover:border-accent hover:text-accent transition-colors duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <div className="text-xs uppercase tracking-widest text-muted font-sans mb-4">Recognition</div>
              <div className="space-y-3">
                {AWARDS.map((a, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <span className="text-xs text-muted font-sans mt-0.5 w-10 shrink-0">{a.year}</span>
                    <div>
                      <div className="text-sm text-primary group-hover:text-accent transition-colors duration-200">{a.title}</div>
                      {a.note && <div className="text-xs text-muted">{a.note}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

// ── Research ──────────────────────────────────────────────────────────────────
function Research() {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <section id="research" className="py-24 px-6 bg-surface">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <SectionHeading label="Academic Work" title="Research Experience" />
        </AnimatedSection>

        <div className="space-y-px">
          {RESEARCH.map((item, idx) => (
            <AnimatedSection key={idx}>
              <div
                className={`border border-border bg-white transition-all duration-300 ${expanded === idx ? 'shadow-md' : 'hover:shadow-sm'}`}
              >
                <button
                  className="w-full text-left px-6 py-5 cursor-pointer group"
                  onClick={() => setExpanded(expanded === idx ? null : idx)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-1">
                        <span className="text-xs font-sans text-muted tracking-wide">{item.period}</span>
                        <span className="text-xs font-sans text-accent/80 bg-accent/5 px-2 py-0.5">{item.org}</span>
                      </div>
                      <h3 className="font-serif text-lg text-primary group-hover:text-accent transition-colors duration-200 leading-snug">
                        {item.title}
                      </h3>
                      {item.supervisor !== 'Independent' && (
                        <div className="text-xs text-muted mt-1 font-sans">Supervised by {item.supervisor}</div>
                      )}
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-4 h-4 text-muted transition-transform duration-300 shrink-0 mt-1 ${expanded === idx ? 'rotate-180' : ''}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                <div className={`overflow-hidden transition-all duration-500 ${expanded === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-6 pb-6 border-t border-border pt-4">
                    <ul className="space-y-2">
                      {item.bullets.map((b, bi) => (
                        <li key={bi} className="flex items-start gap-3 text-sm text-secondary leading-relaxed">
                          <span className="mt-2 w-1 h-1 rounded-full bg-accent shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 text-xs text-muted font-sans">{item.location}</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Publications ──────────────────────────────────────────────────────────────
function Publications() {
  return (
    <section id="publications" className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <SectionHeading label="Scholarly Output" title="Publications" />
        </AnimatedSection>

        <AnimatedSection>
          <div className="border border-border p-8 hover:shadow-md transition-shadow duration-300 group">
            <div className="flex items-start gap-6">
              <div className="shrink-0 w-12 h-12 bg-accent/5 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-xs text-muted font-sans uppercase tracking-wider mb-2">Applied and Computational Engineering · Vol. 76 · 2024</div>
                <h3 className="font-serif text-xl text-primary group-hover:text-accent transition-colors duration-200 leading-snug mb-3">
                  Interpretability Analysis in Transformers Based on Attention Visualization
                </h3>
                <p className="text-sm text-secondary leading-relaxed mb-4">
                  Guo, Yuxi. (2024). Applied and Computational Engineering, 76, pp. 92–102.
                  Comprehensive analysis of Transformer model interpretability using attention visualization techniques
                  to understand and classify attention head behaviors across multiple model architectures.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Transformer', 'Attention Visualization', 'Interpretability', 'NLP', 'BERT', 'GPT-2'].map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 bg-surface text-muted border border-border font-sans">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="mt-6 border border-dashed border-border p-8 text-center">
            <div className="text-sm text-muted font-sans">
              Manuscript on <span className="text-primary italic">Greedy-Gnorm head pruning</span> in preparation for JMLR submission.
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

// ── Projects ──────────────────────────────────────────────────────────────────
function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-surface">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <SectionHeading label="Building Things" title="Projects & Internships" />
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6">
          {PROJECTS.map((proj, idx) => (
            <AnimatedSection key={idx}>
              <div className="h-full bg-white border border-border p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default group flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-8 h-8 bg-accent/5 flex items-center justify-center">
                    <span className="font-serif text-accent text-sm font-bold">{String(idx + 1).padStart(2, '0')}</span>
                  </div>
                  <span className="text-xs text-muted font-sans">{proj.period}</span>
                </div>
                <h3 className="font-serif text-lg text-primary group-hover:text-accent transition-colors duration-200 mb-3 leading-snug">
                  {proj.title}
                </h3>
                <p className="text-sm text-secondary leading-relaxed flex-1">
                  {proj.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {proj.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-0.5 bg-surface text-muted border border-border font-sans">{tag}</span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Contact ───────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-primary text-white">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <div className="mb-12">
            <span className="text-xs font-sans uppercase tracking-[0.2em] text-accent font-bold">Let's Connect</span>
            <h2 className="font-serif text-3xl md:text-5xl mt-2 leading-tight">Get in Touch</h2>
            <div className="mt-4 w-10 h-0.5 bg-accent" />
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-12">
          <AnimatedSection>
            <p className="text-zinc-400 leading-relaxed mb-8">
              Whether you're interested in research collaboration, internship opportunities, 
              or just want to discuss NLP and ML — feel free to reach out.
              I'm always open to interesting conversations.
            </p>
            <div className="space-y-4">
              {[
                { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', label: 'Email', value: 'yuxi.guo@example.com' },
                { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', label: 'Location', value: 'Chengdu, China' },
                { icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222', label: 'University', value: 'SWUFE – University of Delaware' },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-white/10 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icon} />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 uppercase tracking-wider font-sans">{label}</div>
                    <div className="text-zinc-200 text-sm mt-0.5">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs text-zinc-500 uppercase tracking-wider font-sans mb-2">Name</label>
                <input
                  type="text"
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-accent transition-colors duration-200 font-sans"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-500 uppercase tracking-wider font-sans mb-2">Email</label>
                <input
                  type="email"
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-accent transition-colors duration-200 font-sans"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-500 uppercase tracking-wider font-sans mb-2">Message</label>
                <textarea
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-accent transition-colors duration-200 font-sans resize-none"
                  placeholder="What's on your mind?"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-accent text-white font-sans text-sm tracking-wide hover:bg-blue-500 transition-colors duration-300 cursor-pointer"
              >
                Send Message
              </button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-8 px-6 bg-primary border-t border-white/5">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-serif text-white/60 text-sm">© 2025 Yuxi Guo</span>
        <span className="text-xs text-white/30 font-sans">SWUFE–UD · MIS · NLP Researcher</span>
      </div>
    </footer>
  )
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Research />
        <Publications />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
