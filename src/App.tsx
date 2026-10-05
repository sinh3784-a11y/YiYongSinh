import About from "./components/About"
import { backdrop } from "./data/backdrop"
import Contact from "./components/Contact"
import Experience from "./components/Experience"
import Footer from "./components/Footer"
import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import Now from "./components/Now"
import Projects from "./components/Projects"
import Recognition from "./components/Recognition"
import Skills from "./components/Skills"

function App() {
    return (
        <>
            {/* Decorative background. Hidden from assistive tech and from pointer
                events; it sits behind everything on z-index -1. `data-backdrop`
                picks the variant — see src/data/backdrop.ts. The blobs come last
                so they wash over the stars rather than the other way round.
                Gradient tiles, not elements: one span paints a whole field where
                three hundred divs would paint three hundred records. The second
                star span is a faster, dimmer sheet that reads as the nearer
                layer — see `.starfield-near` in the aurora block. */}
            <div className="aurora" data-backdrop={backdrop} aria-hidden="true">
                <span className="starfield" />
                <span className="starfield-near" />
                <span className="spider-web" />
                <span className="shooting-star shooting-star-a" />
                <span className="shooting-star shooting-star-b" />
                <span className="aurora-blob aurora-blob-a" />
                <span className="aurora-blob aurora-blob-b" />
                <span className="aurora-blob aurora-blob-c" />
            </div> 

            <a href="#main" className="skip-link">
                Skip to content
            </a>

            <Navbar />

            <main id="main">
                <Hero />
                <About />
                <Skills />
                <Now />
                <Experience />
                <Projects />
                <Recognition />
                <Contact />
            </main>

            <Footer />
        </>
    )
}

export default App