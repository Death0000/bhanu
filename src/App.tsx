import { useEffect, useLayoutEffect } from "react"
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "lenis"
import AboutPage from "./pages/AboutPage"
import CollectionPage from "./pages/CollectionPage"
import ContactPage from "./pages/ContactPage"
import HomePage from "./pages/HomePage"
import NotFoundPage from "./pages/NotFoundPage"
import ProjectPage from "./pages/ProjectPage"
import ServicesPage from "./pages/ServicesPage"

gsap.registerPlugin(ScrollTrigger)

function MotionController() {
  const location = useLocation()

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    lenis.on("scroll", ScrollTrigger.update)

    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])

  useLayoutEffect(() => {
    window.scrollTo(0, 0)

    document.title = "DZNSTUDEO"

    const context = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

      const pageHeadings = document.querySelectorAll<HTMLElement>(
        ".page-hero h1, .case-hero h1",
      )
      if (pageHeadings.length) {
        gsap.from(pageHeadings, {
          yPercent: 25,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
        })
      }

      document.querySelectorAll<HTMLElement>(".reveal").forEach((item) => {
        gsap.from(item, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 88%" },
        })
      })

      document
        .querySelectorAll<HTMLElement>(".image-reveal")
        .forEach((item) => {
          gsap.from(item, {
            clipPath: "inset(0 0 100% 0)",
            duration: 1.1,
            ease: "power3.inOut",
            scrollTrigger: { trigger: item, start: "top 88%" },
          })
        })

      if (location.pathname === "/") {
        const collageCells =
          document.querySelectorAll<HTMLElement>(".collage-cell")
        const heroContent =
          document.querySelectorAll<HTMLElement>(".hero-title > *")

        if (collageCells.length) {
          gsap.from(collageCells, {
            clipPath: "inset(100% 0 0 0)",
            duration: 1,
            stagger: 0.07,
            ease: "power3.inOut",
            delay: 0.15,
          })
        }

        if (heroContent.length) {
          gsap.from(heroContent, {
            y: 28,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            delay: 0.55,
          })
        }
      }
    })

    const refreshScrollTriggers = () => ScrollTrigger.refresh()
    window.addEventListener("load", refreshScrollTriggers)

    return () => {
      window.removeEventListener("load", refreshScrollTriggers)
      context.revert()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [location.pathname])

  return null
}

function AppRoutes() {
  return (
    <>
      <MotionController />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work" element={<CollectionPage />} />
        <Route path="/work/:slug" element={<ProjectPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
