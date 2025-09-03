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
  Phone,
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
        {/* <FeaturedProjectSection /> */}
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
              Ryan Salah
            </motion.h1>
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
              }}
              className="text-2xl md:text-3xl text-gray-300 mb-6"
            >
              <span className="text-primary">AI/ML (Gen AI, LLM, NLP)</span> Engineer
            </motion.h2>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } },
              }}
              className="text-gray-300 mb-8 max-w-lg text-lg"
            >
              AI and ML Professional with 9+ years of hands-on experience in Machine Learning, NLP, and Generative AI including designing ML systems, building scalable Python APIs, and deploying models and agents with robust MLOps pipelines.
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
                    alt="Ryan Salah"
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
                <span className="font-medium">9+ Years Experience</span>
              </motion.div>

              <motion.div
                className="absolute -top-4 -left-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white px-4 py-2 rounded-lg shadow-lg z-20"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4 }}
              >
                <span className="font-medium">AI/ML Engineer</span>
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
        "Python (Flask, Django)",
        "Java",
        "JavaScript (ES6+)",
        "TypeScript",
        "SQL",
        "Golang",
        "PHP (Laravel)",
        "React.js",
        "React Native",
        "Node.js",
      ],
    },
    {
      title: "Machine Learning & Deep Learning",
      icon: <Monitor size={28} />,
      skills: [
        "TensorFlow",
        "PyTorch",
        "Scikit-learn",
        "Keras",
        "XGBoost",
        "LightGBM",
        "CatBoost",
        "H2O.ai",
        "CNN",
        "RNN",
        "LSTM",
        "Transformers",
        "GANs",
        "OpenAI gym",
        "CrewAI",
        "Autogen",
        "Foundation Models(DALLE, CLIP, Stable Diffusion)"
      ],
    },
    {
      title: "Natural Language Processing & LLMs",
      icon: <Monitor size={28} />,
      skills: [
        "GPT-4",
        "GPT-3.5",
        "BERT",
        "RoBERTa",
        "T5",
        "FLAN-T5",
        "LLaMA",
        "MPT",
        "Falcon",
        "Sentence Transformers",
        "Hugging Face Transformers",
        "LangChain",
        "Langgraph",
        "LlamaIndex",
        "SpaCy",
        "NLTK",
        "Word2Vec",
        "GloVe",
        "FastText"
      ],
    },
    {
      title: "Generative AI & RAG Pipelines",
      icon: <Monitor size={28} />,
      skills: [
        "LangChain",
        "Agentic Workflows",
        "Ollama",
        "Prompt Engineering",
        "Function Calling",
        "Tool Use",
        "Multi-Agent Systems",
        "Chain-of-Thought Reasoning",
        "Knowledge Graphs",
        "Fine-tuning (QLoRA, LoRA, PEFT)",
        "Retrieval-Augmented Generation (RAG)"
      ],
    },
    {
      title: "Model Evaluation & Explainability",
      icon: <Database size={28} />,
      skills: ["SHAP", "LIME", "Captum", "What-If Tool", "Fairness Indicators", "CrossValidation", "A/B Testing"],
    },
    {
      title: "Vector Databases & Search",
      icon: <Database size={28} />,
      skills: ["Pinecone", "Weaviate", "Milvus", "FAISS", "ElasticSearch", "Azure Cognitive Search", "Google Matching Engine"],
    },
    {
      title: "Data Engineering & Big Data",
      icon: <Database size={28} />,
      skills: ["Apache Spark", "Databricks", "Hadoop", "Kafka", "Flink", "Dask", "Hive", "HDFS"],
    },
    {
      title: "Databases & Storage",
      icon: <Database size={28} />,
      skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "AWS RDS", "DynamoDB"],
    },
    {
      title: "MLOps & Cloud",
      icon: <Cloud size={28} />,
      skills: [
        "Docker",
        "Kubernetes",
        "MLflow",
        "Airflow",
        "Kubeflow",
        "GitHub Actions",
        "AWS (SageMaker,Lambda, Bedrock, Comprehend, Transcribe, Glue, S3, Step, SNS, SQA, etc.)",
        "GCP",
        "Runpod",
        "Terraform",
        "Saalad Cloud"
      ],
    },
    {
      title: "Back-End & APIs",
      icon: <Server size={28} />,
      skills: ["FastAPI", "Flask", "Django", "RESTful APIs", "GraphQL", "WebSockets", "JWT", "Firebase"],
    },
    {
      title: "Data Processing & Feature Engineering",
      icon: <Layers size={28} />,
      skills: ["Pandas", "NumPy", "OpenCV", "FeatureTools", "Synthetic Data Generation"],
    },
    {
      title: "AutoML & Tuning",
      icon: <Globe size={28} />,
      skills: ["Google AutoML", "Azure AutoML", "AutoKeras", "H2O AutoML", "TPOT", "Optuna", "Ray Tune", "GridSearchCV"],
    },
    {
      title: "Dev Tools & IDEs",
      icon: <Globe size={28} />,
      skills: ["Jupyter", "VS Code", "PyCharm", "RStudio", "Colab", "Git", "GitHub", "Bitbucket"],
    },
    {
      title: "Expertise",
      icon: <Smartphone size={28} />,
      skills: ["LLM Infrastructure", "Backend API Development", "Hybrid Cloud-Edge MLOps", "DRL", "CV/NLP Systems", "GenAI/Agentic AI product"],
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
        subtitle="Expert in artificial intelligence, machine learning, and full stack development, with a proven track record of delivering scalable, cloud-native solutions using modern JavaScript frameworks, robust API architecture, and high-performance database systems."
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
      title: "Enterprise RAG Intelligence Platform",
      description:
        "Developed a comprehensive Retrieval-Augmented Generation (RAG) system for processing structured and unstructured enterprise data, including PDFs, Word documents, and databases, with advanced features like multi-modal data ingestion, vector embeddings, hybrid search, and intelligent chunking strategies. Integrated multiple LLM backends (GPT-4, Claude, Llama) for dynamic model selection and optimized query responses, while implementing advanced prompt engineering and building an enterprise-grade API with real-time analytics for operational monitoring.",
      // image: "/codetribe-homepage.jpeg",
      // tags: [],
      tags: ["Python", "LangChain", "ChromaDB", "FastAPI", "Transformers"],
      // github: "https://github.com/MoizAhmed2517/Calorie-App",
      // live: "https://codetribe.com/",
    },
    {
      title: "WellB - AI-Powered Hotel Management System",
      description:
        "Developed the AI chatbot WellB using a RAG pipeline with Llama and DeepSeek models, integrated with OpenAI GPT for enhanced conversations. Implemented a multi-model hotel booking system, real-time emergency alert notifications, AI-driven contact management, and booking conflict resolution. Optimized the platform with local and cloud-based model orchestration for efficiency and cost-effectiveness.",
      // image: "/taskflow-website.png",
      tags: ["RAG", "Llama", "OpenAI"],
      // github: "https://github.com/MoizAhmed2517/Football---Ball-Tracking-and-Analysis",
      // live: "https://taskflow-frontend-lyart.vercel.app/",
    },
    {
      title: "IntelliReport - AI-Powered Report Generation ",
      description:
        "Developed an AI-powered report generation system with automated text correction, topic extraction, and intelligent summarization using BERT and transformer models. Created features like topic-wise summaries, smart text highlighting, and multi-format report generation, while building a scalable API for batch processing and real-time tracking. Integrated an analytics dashboard for performance insights and continuous system optimization.",
      // image: "/zolina-hair.png",
      tags: ["Python", "NLP", "Transformers", "FastAPI"],
      // github: "https://github.com/MoizAhmed2517/Recruitemate",
      // live: "https://v0-zolina-hair.vercel.app",
    },
    {
      title: "Smart Media Monitoring Application",
      description:
        "Led a media monitoring project using AI models for Speech to Text, sentiment analysis, summary generation, topic modeling, facial recognition, and OCR, working with both Urdu and English datasets. Developed solutions for real-time sentiment tracking, content summarization, and multi-language OCR, while integrating a YouTube Vlogger Scraper for content and audience insights.",
      // image: "/meine-tora.png",
      tags: ["Python", "PyTorch"],
      // github: "https://github.com/MoizAhmed2517/Time-Series-Forecasting-Projects",
      // live: "https://www.meine-tora.de/",
    },
    {
      title: "Interview Process Automation",
      description:
        "Led the Interview Process Automation project, developing AI modules for face and voice consistency verification, communication skill rating, and emotion recognition, ensuring accurate candidate assessment and interview integrity.",
      // image: "/meine-tora.png",
      tags: ["Python", "PyTorch", "FastAPI"],
      // github: "https://github.com/MoizAhmed2517/Speed-Estimation",
      // live: "https://www.meine-tora.de/",
    },
    {
      title: "AAQAB Project",
      description:
        "Led the AAQAB Project, utilizing YOLO and ResNet for object detection in satellite imagery, focusing on large image processing, accurate object counting, and PRSS image pipeline development. Automated data preprocessing, report generation, and YAML configuration for efficient model training, while optimizing performance with GPU acceleration and memory techniques.",
      // image: "/meine-tora.png",
      tags: ["Python", "PyTorch", "Yolo"],
      // github: "https://github.com/MoizAhmed2517/Speed-Estimation",
      // live: "https://www.meine-tora.de/",
    },
    {
      title: "Crowd Counting Automation",
      description:
        "Contributed to a crowd counting project using computer vision techniques to accurately count people in densely populated areas, focusing on density estimation, occlusion handling, and real-time processing for efficient large-scale implementation.",
      // image: "/meine-tora.png",
      tags: ["Python", "PyTorch"],
      // github: "https://github.com/MoizAhmed2517/Speed-Estimation",
      // live: "https://www.meine-tora.de/",
    },
    {
      title: "Smart Meter Reader",
      description:
        "Designed and developed the Smart Meter Reader to automate utility meter readings using computer vision and deep learning, with ROI detection, reading extraction, and Android app integration for remote and scalable usage.",
      // image: "/meine-tora.png",
      tags: ["Python", "FastAPI", "PyTorch", "Android"],
      // github: "https://github.com/MoizAhmed2517/Speed-Estimation",
      // live: "https://www.meine-tora.de/",
    },
  ]

  return (
    <AnimatedSection id="projects" className="bg-black relative">
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl" />

      <SectionTitle
        title="My Projects"
        subtitle=""
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
              <div className="relative h-14 overflow-hidden">
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" /> */}
                {/* <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                /> */}
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-900/80 p-2 rounded-full text-white hover:bg-primary transition-colors"
                  >
                    <Github size={18} />
                  </a>
                  {/* <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-900/80 p-2 rounded-full text-white hover:bg-primary transition-colors"
                  >
                    <ExternalLink size={18} />
                  </a> */}
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
                  {/* <Button
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
                  </Button> */}
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
      role: "AI Team Lead",
      company: "US AI",
      period: "May 2023 - Present",
      description: [
        "Led a team of machine learning professionals, providing strategic guidance and technical mentorship to drive innovative solutions and collaborative efforts across multiple AI domains.",
        "Designed and developed advanced machine learning models for mission-critical applications, ensuring high performance and reliability with comprehensive testing and validation frameworks.",
        "Created and optimized end-to-end model pipelines, streamlining data preprocessing and model deployment processes, improving operational efficiency by 40% through automated workflows.",
        "Implemented custom training frameworks and fine-tuning strategies for transformer models, YOLO architectures, and computer vision models to achieve domain-specific performance improvements.",
        "Spearheaded fine-tuning of large language models and vision transformers using transfer learning techniques, achieving significant accuracy improvements on specialized datasets and business-specific use cases.",
        "Automated the annotation process through development of intelligent labeling systems and active learning frameworks, reducing manual annotation effort by 70% while maintaining data quality and consistency.",
        "Championed the design of robust APIs and microservices architecture, enhancing product accessibility and ensuring seamless integration with external systems and platforms for scalable AI solutions.",
        "Managed the successful deployment of machine learning solutions in production environments, optimizing real-time processing capabilities and reducing operational costs through efficient resource utilization.",
      ],
    },
    {
      role: "Senior AI Engineer",
      company: "Horizon Technology",
      period: "Jun 2020 – Apr 2023",
      description: [
        "Served as a Senior AI Engineer, responsible for leading end-to-end machine learning projects while providing strategic guidance and mentorship to a dedicated team of professionals.",
        "Managed and supervised data creation, preprocessing, model training, and deployment for a variety of applications, ensuring data quality and model effectiveness.",
        "Oversaw extensive data handling, including data collection, cleaning, and annotation, to support the development of high-performing machine learning models.",
        "Designed and implemented robust data preprocessing pipelines, optimizing feature extraction and data augmentation techniques for enhanced model performance.",
        "Led the fine-tuning and optimization of models, with a particular focus on object detection, resulting in improved object recognition and tracking.",
        "Managed the deployment of machine learning solutions in production environments, collaborating cross-functionally to guarantee seamless integration and real-time processing."
      ],
    },
    {
      role: "Mid-level ML Developer",
      company: "Aimfox IT Solutions",
      period: "Jul 2019 – Mar 2020",
      description: [
        "Responsible for developing and executing test plans, identifying defects, debugging issues, developing automated test scripts, and documenting the testing process to ensure that hardware or software products meet specified requirements and are free from defects.",
        "Focused on strong analytical skills, attention to detail, and the ability to collaborate effectively with a team."
      ],
    },
    {
      role: "Python Developer",
      company: "CapitalOne",
      period: "Aug 2017 – May 2019",
      description: [
        "Worked as a Python Developer, contributing to the development of software components with a focus on verification and high-level programming design.",
        "Assisted in the creation of automated verification scripts and tools to streamline the testing and validation processes.",
"Participated in code reviews to learn and improve software quality and coding practices.",
"Contributed to the design and architecture of software systems, applying theoretical knowledge gained during education. Worked on algorithm implementation and data processing, applying problem-solving skills to real-world challenges."
      ],
    },
  ]

  const education = [
    {
      degree: "Bachelor's Degree in Computer Science",
      institution: "University of Rochester",
      period: "Aug 2013 - May 2017",
      description: "Graduated with a focus on artificial intelligence and web technologies.",
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
                <span className="text-gray-300">Cut model training/deployment time by 10% with ECOps platform.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2 mt-1">•</span>
                <span className="text-gray-300">Boosted energy efficiency by 8% at operational sites.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2 mt-1">•</span>
                <span className="text-gray-300">Slashed vector DB latency by 25–35% via optimization.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2 mt-1">•</span>
                <span className="text-gray-300">Saved 10% more building energy using deep reinforcement learning.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2 mt-1">•</span>
                <span className="text-gray-300">Increased sales by 13% with a GenAI chatbot.</span>
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
                  href="mailto:ryansalah53@gmail.com"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  ryansalah53@gmail.com
                </a>
              </div>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } },
              }}
              whileHover={{ x: 5, transition: { duration: 0.2 } }}
              className="flex items-start gap-4 group"
            >
              <div className="bg-gradient-to-br from-primary/20 to-blue-600/20 p-3 rounded-full text-primary group-hover:text-white group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-blue-600 transition-all">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-medium mb-1 text-white">Phone</h4>
                <a
                  href="mailto:ryansalah53@gmail.com"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  +1 ‪(530) 803-8154‬
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
                <p className="text-gray-300">906 Southwick Dr, Towson, MD 21286 </p>
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
                  href="https://www.linkedin.com/in/ryan-salah-98b538382/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  linkedin.com/in/ryan-salah-98b538382/
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
              Senior AI/ML Engineer with 9+ years of hands-on experience in Machine Learning, NLP, and Generative AI including designing ML systems, building scalable Python APIs, and deploying models and agents with robust MLOps pipelines. Combines deep AI infrastructure knowledge with full-stack capabilities to support cross-functional AI teams. Skilled in backend systems using FastAPI and Flask, and frontend dashboards using React, Tailwind, and Next.js for real-time model feedback. 
            </p>
            <p className="text-gray-300 leading-relaxed mt-4">
              Proven success in leading model lifecycle automation, edge deployment, and cloud-native GenAI infrastructure. Strong collaborator with cross-functional teams, product stakeholders, and engineering leaders. Trusted technical advisor with success in delivering production-ready AI solutions that accelerate business innovation and reduce time-to-market.
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
              © {new Date().getFullYear()} Ryan Salah. All rights reserved.
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
