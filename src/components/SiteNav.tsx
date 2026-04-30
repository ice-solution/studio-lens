import './SiteNav.css'

const links = [
  { href: '#hero', label: '開始' },
  { href: '#workflow', label: '流程' },
  { href: '#portfolio', label: '作品' },
  { href: '#pricing', label: '費用' },
  { href: '#contact', label: '申請' },
]

export function SiteNav() {
  return (
    <header className="site-nav">
      <a className="site-nav__brand" href="#hero">
        <span className="site-nav__logo" aria-hidden>
          ☀️
        </span>
        <span>陽光小影樓</span>
      </a>
      <nav className="site-nav__links" aria-label="主選單">
        {links.map((l) => (
          <a key={l.href} href={l.href} className="site-nav__link">
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
