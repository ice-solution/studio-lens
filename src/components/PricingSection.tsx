import gsap from 'gsap'
import ScrollMagic from 'scrollmagic'
import { useEffect, useRef } from 'react'
import type { ScrollMagicController } from '../context/ScrollMagicContext'
import './PricingSection.css'

/** 三個示範套餐，其中一個免費 */
const plans = [
  {
    id: 'free',
    name: '星光諮詢',
    tagline: '預約到店／線上了解流程，零負擔起步。',
    priceLabel: '免費',
    periodLabel: '／ 首次諮詢',
    isFree: true,
    features: ['拍攝方向建議 15 分鐘', '套餐與檔期簡介', '無需信用卡'],
    cta: '預約諮詢',
  },
  {
    id: 'standard',
    name: '標準成長套餐',
    tagline: '棚景＋造型，適合紀念照與作品集。',
    priceLabel: 'HK$1,280',
    periodLabel: '／ 每次（示範）',
    isFree: false,
    popular: true,
    features: ['1.5 小時棚拍', '精修 12 張', '電子相簿連結', '基本道具＋服裝建議'],
    cta: '預約查詢',
  },
  {
    id: 'premium',
    name: '尊尚演藝套餐',
    tagline: '多造型、多場景，方便製作演藝／比賽用素材。',
    priceLabel: 'HK$3,680',
    periodLabel: '／ 每次（示範）',
    isFree: false,
    features: ['3 小時拍攝', '精修 28 張', '造型轉換 2–3 套', '短片花絮約 45 秒', '優先檔期協調'],
    cta: '預約查詢',
  },
]

export function PricingSection({ controller }: { controller: ScrollMagicController | null }) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!controller || !sectionRef.current) return
    const el = sectionRef.current
    const cards = el.querySelectorAll('.pricing-card')
    let revealed = false
    const reveal = () => {
      if (revealed) return
      revealed = true
      // 用「進場時才 fromTo」：避免因 enter 未觸發而永久隱藏
      gsap.fromTo(
        cards,
        { autoAlpha: 0, y: 40 },
        {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.12,
        ease: 'power2.out',
          clearProps: 'transform,opacity,visibility',
          overwrite: 'auto',
        },
      )
    }

    // 預設保持可見（避免「捲到但未觸發 enter」時空白）
    gsap.set(cards, { autoAlpha: 1, y: 0, clearProps: 'transform,opacity,visibility' })
    const scene = new ScrollMagic.Scene({
      triggerElement: el,
      triggerHook: 0.75,
      reverse: false,
    })
      .on('enter', reveal)
      .addTo(controller)

    // 如果使用者點 navbar 直接跳到 #pricing（或 reload 時已經在該位置），enter 可能唔會再觸發
    // 所以補一個立即 update + progress 檢查，確保卡片一定會出現
    scene.update(true)
    if (scene.progress() > 0) reveal()
    requestAnimationFrame(() => {
      controller.update(true)
      scene.update(true)
      if (scene.progress() > 0) reveal()
    })

    return () => {
      scene.destroy(true)
    }
  }, [controller])

  return (
    <section id="pricing" className="pricing" ref={sectionRef}>
      <div className="pricing__waves" aria-hidden />
      <div className="pricing__inner">
        <p className="pricing__eyebrow">費用一覽</p>
        <h2 className="pricing__title">三個套餐，任你起步</h2>
        <p className="pricing__desc">
          以下為示範價錢排版：包含<strong>一個完全免費</strong>嘅諮詢選項，以及兩個付費套餐；正式收費可按需要再調整。
        </p>

        <div className="pricing__grid pricing__grid--three">
          {plans.map((p) => (
            <article
              key={p.id}
              className={`pricing-card${p.popular ? ' pricing-card--popular' : ''}${p.isFree ? ' pricing-card--free' : ''}`}
            >
              {p.popular && <div className="pricing-card__ribbon">最多人揀</div>}
              {p.isFree && <div className="pricing-card__ribbon pricing-card__ribbon--free">免費</div>}
              <h3 className="pricing-card__name">{p.name}</h3>
              <p className="pricing-card__tagline">{p.tagline}</p>
              <div className={`pricing-card__price${p.isFree ? ' pricing-card__price--free' : ''}`}>
                {p.priceLabel}
              </div>
              <p className="pricing-card__period">{p.periodLabel}</p>
              <button type="button" className={`pricing-card__cta${p.isFree ? ' pricing-card__cta--ghost' : ''}`}>
                {p.cta}
              </button>
              <p className="pricing-card__note">{p.isFree ? '無需付款即可了解（示範）' : '無隱藏收費（示範文案）'}</p>
              <ul className="pricing-card__list">
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
