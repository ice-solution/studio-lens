import gsap from 'gsap'
import ScrollMagic from 'scrollmagic'
import type { ProgressEvent } from 'scrollmagic'
import { useLayoutEffect, useRef } from 'react'
import './PortfolioSection.css'

const STEPS = [
  {
    title: '由高端攝影開始',
    body: '喺專業棚景同燈光底下，捕捉小朋友最自然嘅表情同動態，為下一步預留高質素視覺素材。',
    visualTag: '高端影樓',
    visualSrc: '/images/idea/1.jpg',
  },
  {
    title: '把相片發給演藝圈，發掘小孩潛能',
    body: '精選造型照與作品集，可按渠道提交予業界朋友參考，讓孩子的特質被看見。',
    visualTag: '潛能發掘',
    visualSrc: '/images/idea/2.jpg',
  },
  {
    title: '於節目／電視上讓孩子展示才能',
    body: '當機會來臨，小朋友已經習慣鏡頭與舞台感，更有信心在節目或螢幕前展現自己。',
    visualTag: '舞台亮相',
    visualSrc: '/images/idea/3.jpg',
  },
]

function durationPx(stepCount: number) {
  const n = Math.max(3, stepCount)
  return Math.max(720, Math.round(window.innerHeight * (0.9 + n * 0.85)))
}

/**
 * 「理念之路」使用獨立 ScrollMagic Controller + pin。
 * 與全站共用 Controller 時，多個 Scene 一同運算有機會令 pin / progress 失效（尤其在 React Strict Mode 或 resize 後），故改為自行持有 Controller。
 */
export function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const railFillRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const root = sectionRef.current
    if (!root) return

    const railFill = railFillRef.current
    const stepEls = [...root.querySelectorAll<HTMLElement>('.portfolio-pin__step')]
    const visualEls = [...root.querySelectorAll<HTMLElement>('.portfolio-pin__visual-panel')]

    let activeIndex = 0

    const clamp01 = (x: number) => Math.max(0, Math.min(1, x))

    const setRail = (progress: number) => {
      if (!railFill) return
      railFill.style.height = `${Math.round(clamp01(progress) * 100)}%`
    }

    const setActive = (nextIndex: number, instant = false) => {
      if (nextIndex === activeIndex && !instant) return
      activeIndex = nextIndex

      stepEls.forEach((el, idx) => el.classList.toggle('is-active', idx === nextIndex))

      visualEls.forEach((el, idx) => {
        if (idx !== nextIndex) {
          el.classList.remove('is-active')
          gsap.set(el, { autoAlpha: 0, y: 14, scale: 0.985 })
        }
      })

      const target = visualEls[nextIndex]
      if (!target) return
      target.classList.add('is-active')

      if (instant) {
        gsap.set(target, { autoAlpha: 1, y: 0, scale: 1 })
        return
      }

      gsap.fromTo(
        target,
        { autoAlpha: 0, y: 14, scale: 0.985 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.35, ease: 'power2.out' },
      )
    }

    const computeIndex = (progress: number) => {
      const n = stepEls.length || 1
      const idx = Math.floor(clamp01(progress) * n - Number.EPSILON)
      return Math.max(0, Math.min(n - 1, idx))
    }

    const localCtrl = new ScrollMagic.Controller()

    setActive(0, true)

    const scene = new ScrollMagic.Scene({
      triggerElement: root,
      triggerHook: 0.12,
      duration: durationPx(STEPS.length),
    })
      .setPin(root, { pushFollowers: true })
      .on('enter', () => setActive(activeIndex, true))
      .on('progress', (e: ProgressEvent) => {
        const p = e.progress
        setRail(p)
        setActive(computeIndex(p))
      })
      .addTo(localCtrl)

    const refreshLayout = () => {
      scene.duration(durationPx(STEPS.length))
      localCtrl.update(true)
    }

    refreshLayout()
    const raf2 = requestAnimationFrame(() => {
      requestAnimationFrame(refreshLayout)
    })

    window.addEventListener('resize', refreshLayout, { passive: true })

    return () => {
      cancelAnimationFrame(raf2)
      window.removeEventListener('resize', refreshLayout)
      localCtrl.destroy(true)
    }
  }, [])

  return (
    <section id="portfolio" className="portfolio-pin" ref={sectionRef}>
      <div className="portfolio-pin__inner">
        <header className="portfolio-pin__header">
          <p className="portfolio-pin__kicker">理念之路</p>
          <h2 className="portfolio-pin__title">一切由一個念頭開始</h2>
          <p className="portfolio-pin__desc">向下捲動，睇吓點樣由高端攝影一步一步走向舞台。</p>
        </header>

        <div className="portfolio-pin__content">
          <div className="portfolio-pin__rail" aria-hidden>
            <div className="portfolio-pin__railTrack" />
            <div className="portfolio-pin__railFill" ref={railFillRef} />
          </div>

          <div className="portfolio-pin__steps" role="list">
            {STEPS.map((s, i) => (
              <article
                key={s.title}
                className={`portfolio-pin__step${i === 0 ? ' is-active' : ''}`}
                data-step={i}
                role="listitem"
              >
                <div className="portfolio-pin__stepNum">{String(i + 1).padStart(2, '0')}</div>
                <div className="portfolio-pin__stepBody">
                  <h3 className="portfolio-pin__stepTitle">{s.title}</h3>
                  <p className="portfolio-pin__stepText">{s.body}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="portfolio-pin__visual" aria-label="步驟插圖">
            {STEPS.map((s, i) => (
              <div
                key={s.visualTag}
                className={`portfolio-pin__visual-panel${i === 0 ? ' is-active' : ''}`}
                data-step={i}
              >
                <div className="portfolio-pin__visualCard">
                  <div className="portfolio-pin__visualTag">{s.visualTag}</div>
                  <div
                    className="portfolio-pin__visualArt"
                    style={{ backgroundImage: `url('${s.visualSrc}')` }}
                    aria-hidden
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
