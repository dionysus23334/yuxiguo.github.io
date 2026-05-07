import { useEffect, useRef, useState, type ReactNode } from 'react'
import './index.css'

type Lang = 'en' | 'zh'
type Theme = 'light' | 'dark'

type LocalizedText = Record<Lang, string>

type NavItem = {
  id: string
  label: LocalizedText
}

type TimelineItem = {
  period: LocalizedText
  title: LocalizedText
  org: LocalizedText
  location: LocalizedText
  supervisor?: LocalizedText
  bullets: LocalizedText[]
}

type ProjectItem = {
  title: LocalizedText
  period: LocalizedText
  tags: string[]
  description: LocalizedText
}

const profilePhoto = `${import.meta.env.BASE_URL}profile.jpg`

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold },
    )

    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])

  return { ref, inView }
}

const NAV_LINKS: NavItem[] = [
  { id: 'about', label: { en: 'About', zh: '关于' } },
  { id: 'research', label: { en: 'Research', zh: '研究' } },
  { id: 'publications', label: { en: 'Publications', zh: '发表' } },
  { id: 'projects', label: { en: 'Projects', zh: '项目' } },
  { id: 'contact', label: { en: 'Contact', zh: '联系' } },
]

const EYEBROWS = {
  hero: 'Researcher · Developer · Builder',
  about: 'Background',
  research: 'Academic Work',
  publications: 'Scholarly Output',
  projects: 'Building Things',
  contact: "Let's Connect",
}

const COPY = {
  en: {
    intro: 'MIS student at SWUFE-University of Delaware, focused on NLP, Transformer interpretability, and model compression. Published researcher with experience across China, Canada, the UK, and the US.',
    primaryCta: 'View Research',
    secondaryCta: 'Get in Touch',
    stats: [
      ['6+', 'Research Projects'],
      ['1', 'Publication (ACE)'],
      ['4.1', 'GPA (SWUFE)'],
      ['3', 'International Programs'],
    ],
    theme: 'Theme',
    language: '中文',
    photoAlt: 'Portrait of Yuxi Guo',
    aboutTitle: 'About Me',
    about: [
      "I'm a fourth-year student in the joint program between Southwestern University of Finance and Economics (SWUFE) and the University of Delaware, pursuing dual degrees in Management Information Systems.",
      "My research sits at the intersection of NLP and deep learning interpretability, especially Transformer attention mechanisms, model pruning, and information-theoretic analysis of language models.",
      "Outside of research, I build systems: from AI-powered negotiation bots to accessibility tools for visually impaired users. I believe good engineering and rigorous science can coexist.",
    ],
    education: 'Education',
    skillTitle: 'Technical Skills',
    awardsTitle: 'Recognition',
    researchTitle: 'Research Experience',
    publicationTitle: 'Publications',
    publicationMeta: 'Applied and Computational Engineering · Vol. 76 · 2024',
    publicationName: 'Interpretability Analysis in Transformers Based on Attention Visualization',
    publicationDesc: 'Guo, Yuxi. (2024). Applied and Computational Engineering, 76, pp. 92-102. A study of Transformer interpretability using attention visualization techniques across multiple model architectures.',
    manuscript: 'Manuscript on Greedy-Gnorm head pruning in preparation for JMLR submission.',
    projectTitle: 'Projects & Internships',
    contactTitle: 'Get in Touch',
    contactIntro: "Whether you're interested in research collaboration, internship opportunities, or want to discuss NLP and ML, feel free to reach out.",
    form: ['Name', 'Email', 'Message', 'Send Message'],
    footer: 'SWUFE-UD · MIS · NLP Researcher',
  },
  zh: {
    intro: '西南财经大学-特拉华大学 MIS 联合项目学生，关注自然语言处理、Transformer 可解释性与模型压缩。曾参与中国、加拿大、英国和美国相关研究项目。',
    primaryCta: '查看研究',
    secondaryCta: '联系我',
    stats: [
      ['6+', '研究项目'],
      ['1', 'ACE 论文发表'],
      ['4.1', 'SWUFE GPA'],
      ['3', '国际项目经历'],
    ],
    theme: '主题',
    language: 'EN',
    photoAlt: 'Guo Yuxi证件照',
    aboutTitle: '关于我',
    about: [
      '我是西南财经大学与特拉华大学 Management Information Systems 联合项目的大四学生，正在攻读双学位。',
      '我的研究兴趣位于 NLP 与深度学习可解释性的交叉处，尤其关注 Transformer 注意力机制、模型剪枝以及语言模型的信息论分析。',
      '研究之外，我也喜欢构建真实可用的系统，包括 AI 议价机器人和面向视障用户的辅助出行工具。我相信严谨研究和优秀工程可以同时存在。',
    ],
    education: '教育经历',
    skillTitle: '技术能力',
    awardsTitle: '荣誉',
    researchTitle: '研究经历',
    publicationTitle: '发表论文',
    publicationMeta: 'Applied and Computational Engineering · Vol. 76 · 2024',
    publicationName: 'Interpretability Analysis in Transformers Based on Attention Visualization',
    publicationDesc: 'Guo, Yuxi. (2024). Applied and Computational Engineering, 76, pp. 92-102。该研究使用注意力可视化技术分析多种 Transformer 架构中的可解释性。',
    manuscript: 'Greedy-Gnorm 注意力头剪枝论文正在准备投稿 JMLR。',
    projectTitle: '项目与实习',
    contactTitle: '联系我',
    contactIntro: '如果你对研究合作、实习机会，或 NLP/ML 相关话题感兴趣，欢迎联系我。',
    form: ['姓名', '邮箱', '留言', '发送'],
    footer: 'SWUFE-UD · MIS · NLP Researcher',
  },
} as const

const SKILLS = ['Python', 'PyTorch', 'Transformers', 'NLP', 'Machine Learning', 'LaTeX', 'MATLAB', 'Pandas', 'Streamlit', 'Flask', 'HTML/CSS', 'Java']

const RESEARCH: TimelineItem[] = [
  {
    period: { en: 'Aug. 2025 - Present', zh: '2025.08 - 至今' },
    title: { en: 'Mitacs Globalink Research Internship', zh: 'Mitacs Globalink 研究实习' },
    org: { en: 'University of Prince Edward Island', zh: '爱德华王子岛大学' },
    location: { en: 'Remote (CSC Funded)', zh: '远程，CSC 资助' },
    supervisor: { en: 'Prof. Paul Sheridan', zh: 'Paul Sheridan 教授' },
    bullets: [
      { en: 'Analyzed Skip-gram with Negative Sampling by differentiating KL divergence with respect to exponent alpha.', zh: '通过对指数 alpha 的 KL 散度求导，分析 Skip-gram with Negative Sampling 模型。' },
      { en: 'Showed the divergence reaches a minimum around alpha=0.75 on text8 and Zipf-based simulations.', zh: '在 text8 语料和 Zipf 模拟中验证散度在 alpha=0.75 附近达到最小。' },
    ],
  },
  {
    period: { en: 'Jan. 2025 - Feb. 2025', zh: '2025.01 - 2025.02' },
    title: { en: 'NCSU Winter GEARS Online Program', zh: '北卡州立大学 Winter GEARS 在线项目' },
    org: { en: 'North Carolina State University', zh: '北卡罗来纳州立大学' },
    location: { en: 'Remote', zh: '远程' },
    supervisor: { en: 'Prof. Min Chi', zh: 'Min Chi 教授' },
    bullets: [
      { en: 'Led a 3-person team developing a BERT-based web classifier from data cleaning to model training.', zh: '带领三人团队开发基于 BERT 的网页分类器，覆盖数据清洗、特征处理与模型训练。' },
      { en: 'Authored custom regex cleaning scripts for a noisy raw corpus.', zh: '编写定制正则清洗脚本，提升高噪声语料质量。' },
    ],
  },
  {
    period: { en: 'Aug. 2024 - Nov. 2024', zh: '2024.08 - 2024.11' },
    title: { en: 'Greedy-Gnorm: Head Pruning via Gradient Matrix Norms', zh: 'Greedy-Gnorm：基于梯度矩阵范数的注意力头剪枝' },
    org: { en: 'Independent Research', zh: '独立研究' },
    location: { en: 'Chengdu, China', zh: '中国成都' },
    bullets: [
      { en: 'Developed a dynamic Transformer head-pruning method using Q/K/V gradient-matrix norms.', zh: '提出使用 Q/K/V 梯度矩阵范数的 Transformer 动态注意力头剪枝方法。' },
      { en: 'Demonstrated a smoother accuracy-compression curve; manuscript submitted to JMLR.', zh: '验证方法能获得更平滑的精度-压缩曲线；论文已准备投稿 JMLR。' },
    ],
  },
  {
    period: { en: 'Jul. 2024 - Aug. 2024', zh: '2024.07 - 2024.08' },
    title: { en: 'Applying Attention Entropy in Transformers', zh: 'Transformer 中注意力熵的应用' },
    org: { en: 'University of Cambridge', zh: '剑桥大学' },
    location: { en: 'Remote', zh: '远程' },
    supervisor: { en: 'Prof. Kieren Lovell', zh: 'Kieren Lovell 教授' },
    bullets: [
      { en: 'Evaluated 144 heads in Transformer and IndoBERT models with Attention Entropy.', zh: '使用 Attention Entropy 评估 Transformer 与 IndoBERT 中的 144 个注意力头。' },
      { en: 'Reduced model size while retaining more than 90% accuracy and authored a 58-page paper.', zh: '在保持 90% 以上准确率的同时压缩模型，并完成 58 页学术论文。' },
    ],
  },
]

const PROJECTS: ProjectItem[] = [
  {
    title: { en: "Children's Donation Web Platform", zh: '儿童捐赠 Web 平台' },
    period: { en: 'May-Jun. 2025', zh: '2025.05 - 2025.06' },
    tags: ['Flask', 'Chart.js', 'Three.js', 'Full-Stack'],
    description: { en: 'Interactive 3D user-network visualization with donation flows, admin dashboards, Flask backend, and real-time analytics.', zh: '带有 3D 用户网络可视化、捐赠流动效果、管理端看板、Flask 后端和实时分析的全栈平台。' },
  },
  {
    title: { en: 'AI Price Negotiation System', zh: 'AI 价格谈判系统' },
    period: { en: 'Jul. 2025 - Present', zh: '2025.07 - 至今' },
    tags: ['LLM', 'FSM', 'Prompt Engineering', 'Python'],
    description: { en: 'FSM + LLM framework separating rule logic from natural dialogue for more stable pricing interactions.', zh: '结合 FSM 与 LLM，将规则逻辑和自然对话拆分，提升价格谈判任务中的稳定性。' },
  },
  {
    title: { en: 'Travel System for Visually Impaired', zh: '视障人士出行辅助系统' },
    period: { en: 'Nov. 2024 - May 2025', zh: '2024.11 - 2025.05' },
    tags: ['YOLO', 'Deep Learning', 'Python', 'Software Copyright'],
    description: { en: 'YOLO-based navigation system converting visual signals into acoustic instructions with multi-threaded video processing.', zh: '基于 YOLO 的导航系统，将视觉信号转化为声学指令，并通过多线程视频处理降低延迟。' },
  },
]

const AWARDS = [
  { year: '2024', title: { en: 'Mitacs Globalink Research Internship', zh: 'Mitacs Globalink 研究实习' }, note: { en: 'Funded by China Scholarship Council', zh: '中国国家留学基金委资助' } },
  { year: '2024', title: { en: 'SWUFE Second Class Scholarship', zh: '西南财经大学二等奖学金' }, note: { en: '', zh: '' } },
  { year: '2024', title: { en: 'China MCM - Provincial First Prize', zh: '全国大学生数学建模竞赛省级一等奖' }, note: { en: 'Team Leader', zh: '队长' } },
  { year: '2023', title: { en: 'SWUFE First Class Scholarship', zh: '西南财经大学一等奖学金' }, note: { en: 'Top 2 in class', zh: '班级第 2' } },
]

function AnimatedSection({ children, className = '' }: { children: ReactNode; className?: string }) {
  const { ref, inView } = useInView()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
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

function Navbar({ lang, theme, setLang, setTheme }: { lang: Lang; theme: Theme; setLang: (lang: Lang) => void; setTheme: (theme: Theme) => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-surface/90 backdrop-blur-md border-b border-border shadow-sm' : 'bg-transparent'}`}>
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="font-serif text-xl text-primary hover:text-accent transition-colors cursor-pointer">
          YG
        </button>

        <ul className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <button onClick={() => scrollTo(link.id)} className="text-sm text-secondary hover:text-accent transition-colors cursor-pointer font-sans tracking-wide">
                {link.label[lang]}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="h-9 w-9 border border-border bg-panel text-primary hover:border-accent hover:text-accent transition-colors flex items-center justify-center"
            aria-label={COPY[lang].theme}
            title={COPY[lang].theme}
          >
            {theme === 'light' ? '☾' : '☼'}
          </button>
          <button onClick={() => setLang(lang === 'en' ? 'zh' : 'en')} className="h-9 px-3 border border-border bg-panel text-xs font-bold text-primary hover:border-accent hover:text-accent transition-colors">
            {COPY[lang].language}
          </button>
          <button className="md:hidden flex flex-col gap-1.5 cursor-pointer p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            <span className={`block w-5 h-0.5 bg-primary transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-primary transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-primary transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      <div className={`md:hidden bg-surface/95 backdrop-blur-md border-b border-border transition-all duration-300 ${mobileOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <ul className="px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <button onClick={() => scrollTo(link.id)} className="text-sm text-secondary hover:text-accent transition-colors cursor-pointer">
                {link.label[lang]}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}

function Hero({ lang }: { lang: Lang }) {
  const copy = COPY[lang]

  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden px-6 bg-surface">
      <div className="absolute inset-0 -z-10" style={{ backgroundImage: 'linear-gradient(rgba(37,99,235,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.05) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />

      <div className="max-w-6xl mx-auto w-full pt-24 pb-16 grid lg:grid-cols-[1fr_320px] gap-12 items-center">
        <div>
          <div className="animate-fade-up opacity-0" style={{ animationFillMode: 'forwards' }}>
            <span className="inline-block text-xs font-sans uppercase tracking-[0.25em] text-accent font-bold mb-6">{EYEBROWS.hero}</span>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-primary leading-none tracking-tight animate-fade-up opacity-0 animate-delay-100" style={{ animationFillMode: 'forwards' }}>
            Yuxi<br />
            <span className="text-secondary">Guo</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-muted max-w-2xl leading-relaxed font-sans animate-fade-up opacity-0 animate-delay-200" style={{ animationFillMode: 'forwards' }}>
            {copy.intro}
          </p>

          <div className="mt-10 flex flex-wrap gap-4 animate-fade-up opacity-0 animate-delay-300" style={{ animationFillMode: 'forwards' }}>
            <button onClick={() => document.getElementById('research')?.scrollIntoView({ behavior: 'smooth' })} className="px-7 py-3 bg-primary text-surface font-sans text-sm tracking-wide hover:bg-accent transition-colors cursor-pointer">
              {copy.primaryCta}
            </button>
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="px-7 py-3 border border-primary text-primary font-sans text-sm tracking-wide hover:border-accent hover:text-accent transition-colors cursor-pointer">
              {copy.secondaryCta}
            </button>
          </div>

          <div className="mt-16 flex flex-wrap gap-10 animate-fade-up opacity-0 animate-delay-400" style={{ animationFillMode: 'forwards' }}>
            {copy.stats.map(([num, label]) => (
              <div key={label}>
                <div className="font-serif text-3xl text-primary">{num}</div>
                <div className="text-xs text-muted uppercase tracking-wider mt-1 font-sans">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-fade-up opacity-0 animate-delay-200 justify-self-center lg:justify-self-end" style={{ animationFillMode: 'forwards' }}>
          <div className="w-52 sm:w-64 lg:w-72 aspect-[3/4] overflow-hidden rounded-2xl border border-border bg-panel shadow-lg shadow-primary/10">
            <img src={profilePhoto} alt={copy.photoAlt} className="h-full w-full object-cover object-top" />
          </div>
        </div>
      </div>
    </section>
  )
}

function About({ lang }: { lang: Lang }) {
  const copy = COPY[lang]
  return (
    <section id="about" className="py-24 px-6 bg-panel">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection><SectionHeading label={EYEBROWS.about} title={copy.aboutTitle} /></AnimatedSection>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <AnimatedSection>
            <div className="space-y-5 text-secondary leading-relaxed">
              {copy.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="mt-8 p-5 border border-border bg-surface">
              <div className="text-xs uppercase tracking-widest text-muted font-sans mb-3">{copy.education}</div>
              <div className="space-y-3">
                <div>
                  <div className="font-serif text-primary">SWUFE-University of Delaware</div>
                  <div className="text-xs text-muted font-sans mt-0.5">B.S. MIS (UD, GPA 3.8) · B.Mgmt IMIS (SWUFE, GPA 4.1/5.0) · 2022-2026</div>
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
              <div className="text-xs uppercase tracking-widest text-muted font-sans mb-4">{copy.skillTitle}</div>
              <div className="flex flex-wrap gap-2">
                {SKILLS.map((skill) => <span key={skill} className="px-3 py-1.5 text-xs font-sans text-secondary border border-border hover:border-accent hover:text-accent transition-colors cursor-default">{skill}</span>)}
              </div>
            </div>
            <div className="mt-10">
              <div className="text-xs uppercase tracking-widest text-muted font-sans mb-4">{copy.awardsTitle}</div>
              <div className="space-y-3">
                {AWARDS.map((award) => (
                  <div key={`${award.year}-${award.title.en}`} className="flex items-start gap-4 group">
                    <span className="text-xs text-muted font-sans mt-0.5 w-10 shrink-0">{award.year}</span>
                    <div>
                      <div className="text-sm text-primary group-hover:text-accent transition-colors">{award.title[lang]}</div>
                      {award.note[lang] && <div className="text-xs text-muted">{award.note[lang]}</div>}
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

function Research({ lang }: { lang: Lang }) {
  const [expanded, setExpanded] = useState<number | null>(0)
  const copy = COPY[lang]

  return (
    <section id="research" className="py-24 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection><SectionHeading label={EYEBROWS.research} title={copy.researchTitle} /></AnimatedSection>
        <div className="space-y-px">
          {RESEARCH.map((item, idx) => (
            <AnimatedSection key={item.title.en}>
              <div className={`border border-border bg-panel transition-all duration-300 ${expanded === idx ? 'shadow-md' : 'hover:shadow-sm'}`}>
                <button className="w-full text-left px-6 py-5 cursor-pointer group" onClick={() => setExpanded(expanded === idx ? null : idx)}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-1">
                        <span className="text-xs font-sans text-muted tracking-wide">{item.period[lang]}</span>
                        <span className="text-xs font-sans text-accent/90 bg-accent/10 px-2 py-0.5">{item.org[lang]}</span>
                      </div>
                      <h3 className="font-serif text-lg text-primary group-hover:text-accent transition-colors leading-snug">{item.title[lang]}</h3>
                      {item.supervisor && <div className="text-xs text-muted mt-1 font-sans">{lang === 'en' ? 'Supervised by ' : '导师：'}{item.supervisor[lang]}</div>}
                    </div>
                    <span className={`text-muted transition-transform shrink-0 ${expanded === idx ? 'rotate-180' : ''}`}>⌄</span>
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ${expanded === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-6 pb-6 border-t border-border pt-4">
                    <ul className="space-y-2">
                      {item.bullets.map((bullet) => <li key={bullet.en} className="flex items-start gap-3 text-sm text-secondary leading-relaxed"><span className="mt-2 w-1 h-1 rounded-full bg-accent shrink-0" />{bullet[lang]}</li>)}
                    </ul>
                    <div className="mt-3 text-xs text-muted font-sans">{item.location[lang]}</div>
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

function Publications({ lang }: { lang: Lang }) {
  const copy = COPY[lang]
  return (
    <section id="publications" className="py-24 px-6 bg-panel">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection><SectionHeading label={EYEBROWS.publications} title={copy.publicationTitle} /></AnimatedSection>
        <AnimatedSection>
          <div className="border border-border p-8 hover:shadow-md transition-shadow group bg-panel">
            <div className="text-xs text-muted font-sans uppercase tracking-wider mb-2">{copy.publicationMeta}</div>
            <h3 className="font-serif text-xl text-primary group-hover:text-accent transition-colors leading-snug mb-3">{copy.publicationName}</h3>
            <p className="text-sm text-secondary leading-relaxed mb-4">{copy.publicationDesc}</p>
            <div className="flex flex-wrap gap-2">{['Transformer', 'Attention Visualization', 'Interpretability', 'NLP', 'BERT', 'GPT-2'].map((tag) => <span key={tag} className="text-xs px-2 py-1 bg-surface text-muted border border-border font-sans">{tag}</span>)}</div>
          </div>
        </AnimatedSection>
        <AnimatedSection><div className="mt-6 border border-dashed border-border p-8 text-center text-sm text-muted font-sans bg-panel">{copy.manuscript}</div></AnimatedSection>
      </div>
    </section>
  )
}

function Projects({ lang }: { lang: Lang }) {
  const copy = COPY[lang]
  return (
    <section id="projects" className="py-24 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection><SectionHeading label={EYEBROWS.projects} title={copy.projectTitle} /></AnimatedSection>
        <div className="grid md:grid-cols-3 gap-6">
          {PROJECTS.map((project, idx) => (
            <AnimatedSection key={project.title.en}>
              <div className="h-full bg-panel border border-border p-6 hover:shadow-lg hover:-translate-y-1 transition-all cursor-default group flex flex-col">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-8 h-8 bg-accent/10 flex items-center justify-center"><span className="font-serif text-accent text-sm font-bold">{String(idx + 1).padStart(2, '0')}</span></div>
                  <span className="text-xs text-muted font-sans text-right">{project.period[lang]}</span>
                </div>
                <h3 className="font-serif text-lg text-primary group-hover:text-accent transition-colors mb-3 leading-snug">{project.title[lang]}</h3>
                <p className="text-sm text-secondary leading-relaxed flex-1">{project.description[lang]}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">{project.tags.map((tag) => <span key={tag} className="text-xs px-2 py-0.5 bg-surface text-muted border border-border font-sans">{tag}</span>)}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact({ lang }: { lang: Lang }) {
  const copy = COPY[lang]
  const contacts = [
    ['Email', 'yuxi.guo@example.com'],
    [lang === 'en' ? 'Location' : '所在地', lang === 'en' ? 'Chengdu, China' : '中国成都'],
    [lang === 'en' ? 'University' : '学校', 'SWUFE - University of Delaware'],
  ]

  return (
    <section id="contact" className="py-24 px-6 bg-primary text-surface">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="mb-12">
            <span className="text-xs font-sans uppercase tracking-[0.2em] text-accent font-bold">{EYEBROWS.contact}</span>
            <h2 className="font-serif text-3xl md:text-5xl mt-2 leading-tight">{copy.contactTitle}</h2>
            <div className="mt-4 w-10 h-0.5 bg-accent" />
          </div>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 gap-12">
          <AnimatedSection>
            <p className="text-surface/70 leading-relaxed mb-8">{copy.contactIntro}</p>
            <div className="space-y-4">{contacts.map(([label, value]) => <div key={label}><div className="text-xs text-surface/40 uppercase tracking-wider font-sans">{label}</div><div className="text-surface/85 text-sm mt-0.5">{value}</div></div>)}</div>
          </AnimatedSection>
          <AnimatedSection>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input type="text" className="w-full bg-surface/10 border border-surface/15 px-4 py-3 text-sm text-surface placeholder-surface/40 focus:outline-none focus:border-accent transition-colors font-sans" placeholder={copy.form[0]} />
              <input type="email" className="w-full bg-surface/10 border border-surface/15 px-4 py-3 text-sm text-surface placeholder-surface/40 focus:outline-none focus:border-accent transition-colors font-sans" placeholder={copy.form[1]} />
              <textarea rows={4} className="w-full bg-surface/10 border border-surface/15 px-4 py-3 text-sm text-surface placeholder-surface/40 focus:outline-none focus:border-accent transition-colors font-sans resize-none" placeholder={copy.form[2]} />
              <button type="submit" className="w-full py-3 bg-accent text-white font-sans text-sm tracking-wide hover:bg-accent/80 transition-colors cursor-pointer">{copy.form[3]}</button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="py-8 px-6 bg-primary border-t border-surface/10 text-surface">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-serif text-surface/60 text-sm">© 2025 Yuxi Guo</span>
        <span className="text-xs text-surface/35 font-sans">{COPY[lang].footer}</span>
      </div>
    </footer>
  )
}

export default function App() {
  const [lang, setLang] = useState<Lang>('en')
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN'
  }, [lang])

  return (
    <div className={`min-h-screen bg-surface text-primary ${theme === 'dark' ? 'dark' : ''}`}>
      <Navbar lang={lang} theme={theme} setLang={setLang} setTheme={setTheme} />
      <main>
        <Hero lang={lang} />
        <About lang={lang} />
        <Research lang={lang} />
        <Publications lang={lang} />
        <Projects lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
    </div>
  )
}
