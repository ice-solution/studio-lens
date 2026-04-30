import { SiteNav } from './components/SiteNav'
import { HeroGame } from './components/HeroGame'
import { WorkflowSection } from './components/WorkflowSection'
import { PortfolioSection } from './components/PortfolioSection'
import { PricingSection } from './components/PricingSection'
import { ContactForm } from './components/ContactForm'
import { ScrollMagicProvider, useScrollMagicController } from './context/ScrollMagicContext'
import './App.css'

function Page() {
  const controller = useScrollMagicController()

  return (
    <>
      <SiteNav />
      <main>
        <HeroGame controller={controller} />
        <WorkflowSection controller={controller} />
        <PortfolioSection />
        <PricingSection controller={controller} />
        <ContactForm />
      </main>
      <footer className="site-footer">
      </footer>
    </>
  )
}

export default function App() {
  return (
    <ScrollMagicProvider>
      <Page />
    </ScrollMagicProvider>
  )
}
