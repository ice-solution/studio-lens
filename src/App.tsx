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
        <p>
          設計靈感參考：
          <a href="https://wwtba.webflow.io/" target="_blank" rel="noreferrer">
            WWTBA
          </a>
          、
          <a href="https://pitch-rebuild.webflow.io/" target="_blank" rel="noreferrer">
            Pitch Rebuild
          </a>
          、
          <a href="https://appsrow-pricing-table.webflow.io/" target="_blank" rel="noreferrer">
            Pricing Table
          </a>
          （教育／示範用途）
        </p>
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
