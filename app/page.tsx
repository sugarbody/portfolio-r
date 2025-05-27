"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion"
import {
  ArrowDown,
  Download,
  ExternalLink,
  Github,
  Mail,
  MapPin,
  Menu,
  X,
  Code,
  Layers,
  Monitor,
  Database,
  Server,
  Cloud,
  Globe,
  Smartphone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Particles from "react-particles"
import { loadSlim } from "tsparticles-slim"
import type { Engine } from "tsparticles-engine"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [menuOpen, setMenuOpen] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [cursorHidden, setCursorHidden] = useState(true)

  const particlesInit = async (engine: Engine) => {
    await loadSlim(engine)
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "skills", "projects", "resume", "contact"]
      const scrollPosition = window.scrollY + 300

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
      setCursorHidden(false)
    }

    const handleMouseLeave = () => {
      setCursorHidden(true)
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Custom cursor */}
      <motion.div
        className="fixed w-8 h-8 rounded-full border-2 border-primary pointer-events-none z-50 mix-blend-difference hidden md:block"
        animate={{
          x: cursorPosition.x - 16,
          y: cursorPosition.y - 16,
          opacity: cursorHidden ? 0 : 1,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      />
      <motion.div
        className="fixed w-2 h-2 rounded-full bg-white pointer-events-none z-50 mix-blend-difference hidden md:block"
        animate={{
          x: cursorPosition.x - 4,
          y: cursorPosition.y - 4,
          opacity: cursorHidden ? 0 : 1,
        }}
        transition={{ type: "spring", damping: 50, stiffness: 500 }}
      />

      {/* Background particles */}
      <div className="fixed inset-0 z-0">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: {
              color: {
                value: "#000000",
              },
            },
            fpsLimit: 120,
            particles: {
              color: {
                value: "#3b82f6",
              },
              links: {
                color: "#3b82f6",
                distance: 150,
                enable: true,
                opacity: 0.2,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: true,
                speed: 0.5,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 80,
              },
              opacity: {
                value: 0.3,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 3 },
              },
            },
            detectRetina: true,
          }}
        />
      </div>

      <Header activeSection={activeSection} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main className="relative z-10">
        <HeroSection />
        <FeaturedProjectSection />
        <SkillsSection />
        <ProjectsSection />
        <ResumeSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

function Header({ activeSection, menuOpen, setMenuOpen }: { activeSection: string, menuOpen: boolean, setMenuOpen: (menuOpen: boolean) => void }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30 border-b border-gray-800/50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="font-bold text-xl"
        >
          <span className="text-primary">CV</span>
          <span className="relative ml-1">
            <span className="relative z-10">Portfolio</span>
            <motion.span
              className="absolute -bottom-1 left-0 h-2 bg-primary/30 w-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </span>
        </motion.div>

        <nav className="hidden md:flex space-x-8">
          {["Home", "Skills", "Projects", "Resume", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={cn(
                "text-gray-300 hover:text-primary transition-colors relative py-1",
                activeSection === item.toLowerCase() && "text-primary",
              )}
            >
              {activeSection === item.toLowerCase() && (
                <motion.span
                  className="absolute bottom-0 left-0 h-0.5 bg-primary"
                  layoutId="navIndicator"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {item}
            </a>
          ))}
        </nav>

        <Button variant="ghost" size="icon" className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gray-900/90 backdrop-blur-md"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {["Home", "Skills", "Projects", "Resume", "Contact"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className={cn(
                      "text-gray-300 hover:text-primary transition-colors py-2 px-4 rounded-md",
                      activeSection === item.toLowerCase() && "bg-gray-800 text-primary",
                    )}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function AnimatedSection({ children, id, className = "" }: { children: React.ReactNode, id: string, className?: string }) {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, amount: 0.2 })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])

  return (
    <section id={id} ref={ref} className={`py-20 ${className}`}>
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              duration: 0.5,
              staggerChildren: 0.1,
            },
          },
        }}
        initial="hidden"
        animate={controls}
        className="container mx-auto px-4 relative"
      >
        {children}
      </motion.div>
    </section>
  )
}

function SectionTitle({ title, subtitle }: { title: string, subtitle: string }) {
  return (
    <div className="text-center mb-16 relative">
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        }}
        className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-[120px] font-bold text-white/5 select-none pointer-events-none hidden md:block"
      >
        {title.toUpperCase()}
      </motion.div>
      <motion.h2
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        }}
        className="text-3xl md:text-5xl font-bold mb-4 relative z-10 inline-block"
      >
        {title}
        <span className="absolute -bottom-2 left-0 h-1 bg-primary w-full transform origin-left"></span>
      </motion.h2>
      <motion.p
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
        }}
        className="text-gray-300 max-w-2xl mx-auto"
      >
        {subtitle}
      </motion.p>
    </div>
  )
}

function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = (clientX / innerWidth - 0.5) * 20
      const y = (clientY / innerHeight - 0.5) * 20
      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <AnimatedSection id="home" className="min-h-[100vh] flex items-center relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="order-2 md:order-1">
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
            }}
          >
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="text-primary font-medium mb-2 text-lg"
            >
              Hello, I'm
            </motion.p>
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } },
              }}
              className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
            >
              Moiz Ahmed
            </motion.h1>
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
              }}
              className="text-2xl md:text-3xl text-gray-300 mb-6"
            >
              <span className="text-primary">Senior Software</span> Engineer
            </motion.h2>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } },
              }}
              className="text-gray-300 mb-8 max-w-lg text-lg"
            >
              Results-driven Senior Software Engineer with over 10 years of hands-on experience building scalable,
              maintainable, and secure software systems across startups and enterprise environments.
            </motion.p>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.4 } },
              }}
              className="flex flex-wrap gap-4"
            >
              <Button asChild className="relative overflow-hidden group bg-gradient-to-r from-primary to-blue-700">
                <a href="#contact">
                  <span className="relative z-10">Get in touch</span>
                  <span className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </a>
              </Button>
              <Button variant="outline" asChild className="border-primary/50 hover:border-primary group">
                <a href="#projects" className="relative overflow-hidden">
                  <span className="relative z-10">View my work</span>
                  <span className="absolute inset-0 bg-primary/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
        <div className="order-1 md:order-2 flex justify-center">
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
            }}
            style={{
              transform: `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
            }}
            className="relative"
          >
            <div className="relative">
              {/* Decorative rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute -inset-8 border-2 border-dashed border-primary/20 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute -inset-16 border-2 border-dashed border-primary/10 rounded-full"
              />

              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20 p-2 bg-gradient-to-br from-gray-900 to-black relative z-10">
                <div className="w-full h-full rounded-full overflow-hidden backdrop-blur-sm">
                  <img
                    src="/avatar.png"
                    alt="Moiz Ahmed"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                className="absolute -bottom-4 -right-4 bg-gradient-to-r from-primary to-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-20"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3 }}
              >
                <span className="font-medium">10+ Years Experience</span>
              </motion.div>

              <motion.div
                className="absolute -top-4 -left-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white px-4 py-2 rounded-lg shadow-lg z-20"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4 }}
              >
                <span className="font-medium">Full Stack Developer</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
          <a href="#skills" className="flex flex-col items-center text-gray-400 hover:text-primary">
            <span className="text-sm mb-2">Scroll Down</span>
            <ArrowDown size={20} />
          </a>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

function FeaturedProjectSection() {
  return (
    <AnimatedSection id="featured-project" className="bg-gradient-to-b from-black to-gray-900 relative">
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl" />

      <SectionTitle
        title="Featured Project"
        subtitle="A closer look at one of my recent significant projects in the education technology space."
      />

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          variants={{
            hidden: { opacity: 0, x: -30 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
          }}
        >
          <h3 className="text-2xl font-bold mb-4 text-white">CodeTribe: Edu Code Share Platform</h3>
          <p className="text-gray-300 mb-6">
            A comprehensive platform designed for the education industry that enables collaborative coding, learning,
            and teaching. The platform serves multiple client types including students, teachers, and educational
            districts.
          </p>

          <div className="space-y-4 mb-6">
            <h4 className="text-xl font-medium text-primary">Key Features</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-primary mr-2 mt-1">•</span>
                <span className="text-gray-300">Real-time collaborative code editing with Socket.IO</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2 mt-1">•</span>
                <span className="text-gray-300">Interactive learning paths with gamification elements</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2 mt-1">•</span>
                <span className="text-gray-300">
                  Role-based access control for students, teachers, and administrators
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2 mt-1">•</span>
                <span className="text-gray-300">Optimized GraphQL API for efficient data fetching</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2 mt-1">•</span>
                <span className="text-gray-300">Redis caching for improved performance</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4 mb-6">
            <h4 className="text-xl font-medium text-primary">Technical Stack</h4>
            <div className="flex flex-wrap gap-2">
              {["Next.js", "Nest.js", "TypeScript", "GraphQL", "PostgreSQL", "Redis", "Socket.IO", "Docker"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300 border border-gray-700/50"
                  >
                    {tech}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <Button asChild className="relative overflow-hidden group bg-gradient-to-r from-primary to-blue-700">
              <a
                href="https://codetribe.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink size={16} />
                <span className="relative z-10">Live Demo</span>
                <span className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </a>
            </Button>
            <Button variant="outline" asChild className="border-primary/50 hover:border-primary group">
              <a
                href="https://github.com/accompany1205/edu-code-share"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github size={16} />
                <span className="relative z-10">View Code</span>
                <span className="absolute inset-0 bg-primary/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
          className="space-y-6"
        >
          <div className="relative rounded-lg overflow-hidden shadow-xl border border-gray-800/50 group">
            <img
              src="/codetribe-homepage.jpeg"
              alt="CodeTribe Homepage"
              className="w-full transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
              <div className="p-4">
                <p className="text-white font-medium">CodeTribe Homepage</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative rounded-lg overflow-hidden shadow-xl border border-gray-800/50 group">
              <img
                src="/codetribe-website.jpeg"
                alt="CodeTribe Website"
                className="w-full transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4">
                  <p className="text-white font-medium text-sm">Website View</p>
                </div>
              </div>
            </div>

            <div className="relative rounded-lg overflow-hidden shadow-xl border border-gray-800/50 group">
              <img
                src="/codetribe-github.jpeg"
                alt="CodeTribe GitHub Repository"
                className="w-full transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4">
                  <p className="text-white font-medium text-sm">GitHub Repository</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg border border-gray-700/50">
            <h4 className="text-lg font-medium text-primary mb-2">Project Impact</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-primary mr-2 mt-1">•</span>
                <span className="text-gray-300">60% faster deployment cycle across teams</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2 mt-1">•</span>
                <span className="text-gray-300">Serving multiple clients in the education industry</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2 mt-1">•</span>
                <span className="text-gray-300">Enhanced learning experience through interactive coding</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

function SkillsSection() {
  const skillCategories = [
    {
      title: "Languages & Frameworks",
      icon: <Code size={28} />,
      skills: [
        "JavaScript (ES6+)",
        "TypeScript",
        "Python (Flask, Django)",
        "Golang",
        "PHP (Laravel)",
        "Java",
        "C#",
        "Kotlin",
        "Spring Boot",
        "React.js",
        "React Native",
        "Next.js",
        "Vue.js",
        "Angular 2+",
        "Node.js",
        "Express.js",
        "NestJS",
      ],
    },
    {
      title: "Front-End & UI",
      icon: <Monitor size={28} />,
      skills: [
        "Redux",
        "RxJS",
        "Tailwind CSS",
        "SCSS",
        "Material-UI",
        "Ant Design",
        "Shadcn UI",
        "D3.js",
        "Highcharts",
        "Three.js",
        "Figma",
        "Bootstrap",
        "BEM",
        "SEO",
        "Responsive Design",
        "Socket.io",
      ],
    },
    {
      title: "Back-End & APIs",
      icon: <Server size={28} />,
      skills: ["RESTful APIs", "GraphQL", "WebSockets", "OAuth2", "JWT", "Firebase"],
    },
    {
      title: "Database",
      icon: <Database size={28} />,
      skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "AWS RDS", "DynamoDB"],
    },
    {
      title: "DevOps & Cloud",
      icon: <Cloud size={28} />,
      skills: [
        "AWS (EC2, S3, CloudWatch, Lambda)",
        "GCP",
        "Azure",
        "Docker",
        "Kubernetes",
        "Jenkins",
        "GitHub Actions",
        "CI/CD pipelines",
      ],
    },
    {
      title: "Testing",
      icon: <Layers size={28} />,
      skills: ["Jest", "Cypress", "Enzyme", "Puppeteer", "Selenium", "Playwright", "Cucumber", "Jasmine"],
    },
    {
      title: "Architecture & Patterns",
      icon: <Globe size={28} />,
      skills: ["Microservices", "Serverless", "SOLID Principles", "CQRS", "Event-Driven Architecture"],
    },
    {
      title: "SDLC Tools",
      icon: <Smartphone size={28} />,
      skills: ["Jira", "Trello", "Notion", "Asana", "Scrum", "Kanban", "Agile", "Waterfall"],
    },
  ]

  return (
    <AnimatedSection id="skills" className="bg-gradient-to-b from-black to-gray-900 relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl" />

      <SectionTitle
        title="Technical Skills"
        subtitle="Expert in full-stack development, with a strong command of modern JavaScript frameworks, cloud infrastructure, API architecture, and database performance tuning."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: categoryIndex * 0.1 } },
            }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg shadow-lg border border-gray-700/50"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="text-primary">{category.icon}</div>
              <h3 className="text-xl font-bold">{category.title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, skillIndex) => (
                <motion.span
                  key={skill}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      transition: { duration: 0.3, delay: 0.1 + skillIndex * 0.03 },
                    },
                  }}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.2)" }}
                  className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-200 border border-gray-600/30 transition-all"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  )
}

function ProjectsSection() {
  const projects = [
    {
      title: "Edu Code Share Platform (CodeTribe)",
      description:
        "Designed and delivered a Code Share Platform for multiple clients in the education industry using Next.js, Nest.js, GraphQL, Redis, SocketIO and PostgreSQL, leading to a 60% faster deployment cycle across teams.",
      image: "/codetribe-homepage.jpeg",
      tags: ["Next.js", "Nest.js", "GraphQL", "Redis", "PostgreSQL", "Docker", "Kubernetes", "AWS", "CI/CD", "Socket.io"],
      github: "https://github.com/accompany1205/edu-code-share.git",
      live: "https://codetribe.com/",
    },
    {
      title: "Employee Task Management System",
      description:
        "Modernized a legacy employee task management system by migrating from class-based to functional React components and adopting Hooks, reducing maintenance overhead by 60%.",
      image: "/taskflow-website.png",
      tags: ["React", "Next.js", "Golang", "GraphQL", "Accessibility", "Flask", "Redis", "PostgreSQL", "Celery", "Docker", "Kubernetes", "AWS", "CI/CD", "Socket.io"],
      github: "https://github.com/accompany1205/taskflow-frontend.git",
      live: "https://taskflow-frontend-lyart.vercel.app/",
    },
    {
      title: "Zolina Hair Holistic Beauty",
      description:
        "Zolina Hair Holistic Beauty is a website for a hair salon that offers a range of services from haircuts to hair extensions.",
      image: "/zolina-hair.png",
      tags: ["D3.js", "Highcharts", "React", "Next.js", "Tailwind CSS", "Fresha", "Stripe", "AWS", "CI/CD", "Socket.io"],
      github: "https://github.com/accompany1205/zolinar-hair.git",
      live: "https://v0-zolina-hair.vercel.app",
    },
    {
      title: "Meine Tora",
      description:
        "On this website you will find the books of the series 'The Weekly Torah Portions' as well as video shiurim by children for children. Built with Next.js, Tailwind CSS, TypeScript, and Flask.",
      image: "/meine-tora.png",
      tags: ["React", "Next.js", "Tailwind CSS", "TypeScript", "Flask", "PostgreSQL", "Docker", "Kubernetes", "AWS", "CI/CD", "Socket.io"],
      github: "https://github.com/accompany1205/meine-tora.git/private",
      live: "https://www.meine-tora.de/",
    },
  ]

  return (
    <AnimatedSection id="projects" className="bg-black relative">
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl" />

      <SectionTitle
        title="My Projects"
        subtitle="Proven ability to lead cross-functional teams, deliver critical systems under tight deadlines, and translate complex business requirements into technical solutions."
      />

      <div className="grid md:grid-cols-2 gap-10">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } },
            }}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
            className="group"
          >
            <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-800/50 h-full flex flex-col">
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-900/80 p-2 rounded-full text-white hover:bg-primary transition-colors"
                  >
                    <Github size={18} />
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-900/80 p-2 rounded-full text-white hover:bg-primary transition-colors"
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4 flex-grow">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300 border border-gray-700/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 mt-auto">
                  <Button variant="outline" size="sm" asChild className="flex-1 border-gray-700 hover:border-primary">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <Github size={16} />
                      GitHub
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    asChild
                    className="flex-1 bg-gradient-to-r from-primary to-blue-700 hover:from-primary/90 hover:to-blue-600"
                  >
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  )
}

function ResumeSection() {
  const experiences = [
    {
      role: "Senior Software Engineer",
      company: "PixelFyre",
      period: "Jun 2022 - Present",
      description: [
        "Designed and delivered a SaaS project management platform for multiple enterprise clients using React, React Native, Flask, GraphQL, and PostgreSQL, leading to a 60% faster deployment cycle across teams.",
        "Built and enforced role-based access control (RBAC) at the API and UI layers to mitigate unauthorized data access, reducing internal security alerts by 75%.",
        "Developed reusable React components with custom hooks and Context API, significantly lowering code duplication and decreasing bug resolution time by 40%.",
        "Led AWS migration using EC2, S3, Route 53, and CloudWatch for infrastructure scaling and health checks, achieving 99.98% uptime and reducing hosting costs by 30%.",
      ],
    },
    {
      role: "Senior Software Engineer",
      company: "Meta",
      period: "Mar 2020 - May 2022",
      description: [
        "Modernized a legacy employee task management system by migrating from class-based to functional React components and adopting Hooks, reducing maintenance overhead by 60%.",
        "Built performant GraphQL APIs in Golang, reducing task load latency from 1.3s to 400ms across 15+ internal microservices.",
        "Refined global state architecture using Redux Toolkit and Context, enabling easier scalability and improving DX (developer experience).",
        "Translated Figma designs into highly responsive UIs with accessibility standards, achieving 100% Lighthouse accessibility across core views.",
      ],
    },
    {
      role: "Senior Software Engineer",
      company: "Emergent Software",
      period: "Jul 2017 - Feb 2020",
      description: [
        "Designed interactive dashboards and visualizations using D3.js and Highcharts, helping clients track KPIs across datasets of over 1M rows in real time.",
        "Built full-stack SPAs using React, Next.js, Django, and Tailwind CSS, optimized for both mobile and desktop views with SSR and code-splitting.",
        "Delivered secure blockchain-based health data exchange system, ensuring HIPAA compliance and reducing verification time by 40%.",
        "Implemented Snapshot testing with Jest/Enzyme, preventing regressions in complex UIs and saving 10+ hours per month in QA cycles.",
      ],
    },
    {
      role: "Software Engineer",
      company: "Accenture",
      period: "Jul 2014 - Jun 2017",
      description: [
        "Developed cross-platform mobile apps with React Native, Redux, and Flex Layout, delivering seamless performance across Android and iOS.",
        "Contributed to high-availability Django microservices handling real-time logistics and payment transactions, processing 10K+ events/second with 99.9% accuracy.",
        "Built a feature-rich internal dashboard for a financial client using Laravel, PHP, and React, integrating role-based modules with granular permissions.",
        "Delivered robust APIs for account management and user authentication, reducing login and session-related support tickets by 50%.",
      ],
    },
  ]

  const education = [
    {
      degree: "B.S. in Computer Science",
      institution: "The University of Texas at Austin",
      period: "Aug 2008 - May 2012",
      description: "Graduated with a focus on software engineering and web technologies.",
    },
  ]

  return (
    <AnimatedSection id="resume" className="bg-gradient-to-b from-gray-900 to-black relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent" />
      <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl" />

      <SectionTitle title="Resume" subtitle="My professional journey and educational background." />

      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
            }}
            className="flex items-center mb-8"
          >
            <div className="w-12 h-1 bg-gradient-to-r from-primary to-blue-600 mr-4"></div>
            <h3 className="text-2xl font-bold">Work Experience</h3>
          </motion.div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: index * 0.1 } },
                }}
                className="relative pl-8 border-l-2 border-gray-800"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gradient-to-r from-primary to-blue-600"></div>
                <div className="mb-1 text-primary font-medium">{exp.period}</div>
                <h4 className="text-xl font-bold mb-1 text-white">{exp.role}</h4>
                <div className="text-gray-300 mb-4">{exp.company}</div>
                <ul className="space-y-2">
                  {exp.description.map((item, i) => (
                    <li key={i} className="text-gray-400 flex items-start">
                      <span className="text-primary mr-2 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
            }}
            className="flex items-center mb-8"
          >
            <div className="w-12 h-1 bg-gradient-to-r from-primary to-blue-600 mr-4"></div>
            <h3 className="text-2xl font-bold">Education</h3>
          </motion.div>

          <div className="space-y-8 mb-12">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: index * 0.1 } },
                }}
                className="relative pl-8 border-l-2 border-gray-800"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gradient-to-r from-primary to-blue-600"></div>
                <div className="mb-1 text-primary font-medium">{edu.period}</div>
                <h4 className="text-xl font-bold mb-1 text-white">{edu.degree}</h4>
                <div className="text-gray-300 mb-2">{edu.institution}</div>
                <p className="text-gray-400">{edu.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg border border-gray-700/50 shadow-lg"
          >
            <h4 className="text-xl font-bold mb-4 text-white">Key Achievements</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-primary mr-2 mt-1">•</span>
                <span className="text-gray-300">Reduced hosting costs by 30% through AWS migration</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2 mt-1">•</span>
                <span className="text-gray-300">Improved API performance by 70% across microservices</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2 mt-1">•</span>
                <span className="text-gray-300">Achieved 100% Lighthouse accessibility scores</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2 mt-1">•</span>
                <span className="text-gray-300">Mentored junior developers to promotion</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2 mt-1">•</span>
                <span className="text-gray-300">Implemented CI/CD pipelines reducing deployment time by 83%</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
            }}
            className="text-center mt-8"
          >
            <Button
              asChild
              className="bg-gradient-to-r from-primary to-blue-700 hover:from-primary/90 hover:to-blue-600 group"
            >
              <a href="/resume.pdf" download className="flex items-center gap-2 relative overflow-hidden">
                <Download size={16} />
                <span>Download Full Resume</span>
                <span className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  )
}

function ContactSection() {
  return (
    <AnimatedSection id="contact" className="bg-black relative">
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl" />

      <SectionTitle
        title="Get In Touch"
        subtitle="Have a project in mind or want to discuss opportunities? Feel free to reach out."
      />

      <div className="grid md:grid-cols-2 gap-12">
        <motion.div
          variants={{
            hidden: { opacity: 0, x: -30 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
          }}
        >
          <h3 className="text-2xl font-bold mb-6 relative inline-block">
            Contact Information
            <span className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-primary to-blue-600 w-full"></span>
          </h3>
          <div className="space-y-6">
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } },
              }}
              whileHover={{ x: 5, transition: { duration: 0.2 } }}
              className="flex items-start gap-4 group"
            >
              <div className="bg-gradient-to-br from-primary/20 to-blue-600/20 p-3 rounded-full text-primary group-hover:text-white group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-blue-600 transition-all">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-medium mb-1 text-white">Email</h4>
                <a
                  href="mailto:moizahmed.swe@gmail.com"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  moizahmed.swe@gmail.com
                </a>
              </div>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
              }}
              whileHover={{ x: 5, transition: { duration: 0.2 } }}
              className="flex items-start gap-4 group"
            >
              <div className="bg-gradient-to-br from-primary/20 to-blue-600/20 p-3 rounded-full text-primary group-hover:text-white group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-blue-600 transition-all">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-medium mb-1 text-white">Location</h4>
                <p className="text-gray-300">45 Park Ave, Iselin, NJ 08830</p>
              </div>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } },
              }}
              whileHover={{ x: 5, transition: { duration: 0.2 } }}
              className="flex items-start gap-4 group"
            >
              <div className="bg-gradient-to-br from-primary/20 to-blue-600/20 p-3 rounded-full text-primary group-hover:text-white group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-blue-600 transition-all">
                <Globe size={24} />
              </div>
              <div>
                <h4 className="font-medium mb-1 text-white">LinkedIn</h4>
                <a
                  href="https://www.linkedin.com/in/moiz-ahmed-b41799367"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  linkedin.com/in/moiz-ahmed-b41799367
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.4 } },
            }}
            className="mt-12"
          >
            <h4 className="text-xl font-bold mb-6 relative inline-block">
              Professional Summary
              <span className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-primary to-blue-600 w-full"></span>
            </h4>
            <p className="text-gray-300 leading-relaxed">
              Results-driven Senior Software Engineer with over 10 years of hands-on experience building scalable,
              maintainable, and secure software systems across startups and enterprise environments. Expert in
              full-stack development, with a strong command of modern JavaScript frameworks, cloud infrastructure, API
              architecture, and database performance tuning.
            </p>
            <p className="text-gray-300 leading-relaxed mt-4">
              Proven ability to lead cross-functional teams, deliver critical systems under tight deadlines, and
              translate complex business requirements into technical solutions that drive measurable impact. Recognized
              for engineering excellence, clean code practices, and mentoring developers toward growth and technical
              maturity.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, x: 30 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
          }}
          className="bg-gradient-to-br from-gray-900 to-gray-950 p-6 rounded-xl border border-gray-800/50 shadow-xl"
        >
          <h3 className="text-2xl font-bold mb-6 relative inline-block">
            Send Me a Message
            <span className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-primary to-blue-600 w-full"></span>
          </h3>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1 text-white">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1 text-white">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white"
                  placeholder="Your email"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-1 text-white">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white"
                placeholder="Subject"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1 text-white">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white"
                placeholder="Your message"
              ></textarea>
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-blue-700 hover:from-primary/90 hover:to-blue-600 group relative overflow-hidden"
            >
              <span className="relative z-10">Send Message</span>
              <span className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Button>
          </form>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

function Footer() {
  return (
    <footer className="bg-black text-white py-12 border-t border-gray-800/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="font-bold text-2xl mb-2">
              <span className="text-primary">CV</span>Portfolio
            </div>
            <p className="text-gray-400 max-w-md">
              Building digital experiences that make a difference. Let's create something amazing together.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <div className="text-sm text-gray-400 mb-2">
              © {new Date().getFullYear()} Moiz Ahmed. All rights reserved.
            </div>
            <a href="#home" className="text-primary hover:underline">
              Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
