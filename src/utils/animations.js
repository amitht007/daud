// Intersection Observer for card animations
export const setupCardAnimations = () => {
  if (typeof window === "undefined") return null

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Wait for DOM to be ready
  const setupObserver = () => {
    const serviceCards = document.querySelectorAll(".service-card")
    const patternCards = document.querySelectorAll(".pattern-card")

    serviceCards.forEach((card, index) => {
      card.style.opacity = "0"
      card.style.transform = "translateY(30px)"
      card.style.transition = `all 0.6s ease ${index * 0.2}s`
      observer.observe(card)
    })

    patternCards.forEach((card, index) => {
      card.style.opacity = "0"
      card.style.transform = "translateY(30px)"
      card.style.transition = `all 0.6s ease ${index * 0.1}s`
      observer.observe(card)
    })
  }

  // Setup observer after a small delay to ensure DOM is ready
  setTimeout(setupObserver, 100)

  return observer
}

// Smooth scrolling for navigation links
export const setupSmoothScrolling = () => {
  if (typeof window === "undefined") return

  const setupScrolling = () => {
    const navLinks = document.querySelectorAll('a[href^="#"]')
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()
        const targetId = this.getAttribute("href").substring(1)
        const targetElement = document.getElementById(targetId)

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      })
    })
  }

  setTimeout(setupScrolling, 100)
}

// Navbar scroll effect (debounced for performance)
export const setupNavbarScrollEffect = () => {
  if (typeof window === "undefined") return

  let lastScroll = 0
  let ticking = false

  const handleScroll = () => {
    lastScroll = window.scrollY
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const navbar = document.querySelector("nav")
        if (navbar) {
          if (lastScroll > 100) {
            navbar.style.background = "rgba(24, 24, 27, 0.98)"
          } else {
            navbar.style.background = "rgba(24, 24, 27, 0.95)"
          }
        }
        ticking = false
      })
      ticking = true
    }
  }

  window.addEventListener("scroll", handleScroll)
  return () => window.removeEventListener("scroll", handleScroll)
}
