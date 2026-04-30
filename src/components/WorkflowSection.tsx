import { useRef } from 'react'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import type { ScrollMagicController } from '../context/ScrollMagicContext'
import './WorkflowSection.css'

const blocks = [
  {
    title: '討論主題，輕鬆起步',
    body: '拍攝前我哋會同你傾好主題、服裝同小朋友節奏，令成個流程簡單、直接、有效。',
    icon: '🎈',
  },
  {
    title: '現場引導，開心完成',
    body: '專人引導表情同姿勢，父母可以專心享受親子時光，唔使擔心「唔識摆pose」。',
    icon: '📷',
  },
  {
    title: '精修相簿，靚住分享',
    body: '我哋幫你處理色調同構圖，輸出適合沖曬同社交媒體嘅版本，隨時隨地展示靚相。',
    icon: '✨',
  },
]

export function WorkflowSection({ controller }: { controller: ScrollMagicController | null }) {
  const ref = useRef<HTMLElement>(null)
  useRevealOnScroll(controller, ref, '.workflow-card')
  const workflowImageSrc = '/images/workflow.jpg'

  return (
    <section id="workflow" className="workflow" ref={ref}>
      <div className="workflow__inner">
        <div className="workflow__layout">
          <div>
            <div className="workflow__intro">
              <p className="workflow__eyebrow">點解揀我哋</p>
              <h2 className="workflow__headline">拍攝流程，就係咁簡單。</h2>
              <p className="workflow__lead">
                協作應該輕鬆、直接、有成效。喺陽光小影樓，我哋用清晰步驟同溫暖氛圍，幫家庭留住最自然嘅笑容。
              </p>
            </div>

            <div className="workflow__grid">
              {blocks.map((b) => (
                <article key={b.title} className="workflow-card">
                  <div className="workflow-card__icon" aria-hidden>
                    {b.icon}
                  </div>
                  <h3 className="workflow-card__title">{b.title}</h3>
                  <p className="workflow-card__body">{b.body}</p>
                </article>
              ))}
            </div>
          </div>

          <aside className="workflow__media" aria-label="流程圖片">
            <div className="workflow__mediaFrame">
              {workflowImageSrc ? (
                <img className="workflow__mediaImg" src={workflowImageSrc} alt="拍攝流程示意圖" />
              ) : (
                <div className="workflow__mediaPlaceholder">
                  <div className="workflow__mediaBadge">Image placeholder</div>
                  <p>你之後放圖：把 `workflowImageSrc` 改為圖片路徑即可。</p>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
