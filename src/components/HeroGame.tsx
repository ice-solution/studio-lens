import gsap from 'gsap'
import ScrollMagic from 'scrollmagic'
import type { ProgressEvent } from 'scrollmagic'
import { useEffect, useRef } from 'react'
import type { ScrollMagicController } from '../context/ScrollMagicContext'
import './HeroGame.css'

export function HeroGame({ controller }: { controller: ScrollMagicController | null }) {
  const rootRef = useRef<HTMLElement>(null)
  const sunRef = useRef<HTMLDivElement>(null)
  const lettersRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!controller || !rootRef.current || !sunRef.current) return

    const scene = new ScrollMagic.Scene({
      triggerElement: rootRef.current,
      duration: () => Math.max(320, window.innerHeight * 0.85),
      triggerHook: 0,
    })
      .addTo(controller)
      .on('progress', (e: ProgressEvent) => {
        const p = e.progress
        gsap.set(sunRef.current, {
          y: p * 120,
          scale: 1 + p * 0.08,
          rotation: p * 12,
        })
      })

    const letters = lettersRef.current?.querySelectorAll('.hero-game__letter')
    if (letters?.length) {
      gsap.fromTo(
        letters,
        { y: 40, opacity: 0, rotation: () => gsap.utils.random(-12, 12) },
        {
          y: 0,
          opacity: 1,
          rotation: 0,
          duration: 0.65,
          stagger: 0.06,
          ease: 'back.out(1.4)',
          delay: 0.15,
        },
      )
    }

    return () => {
      scene.destroy(true)
    }
  }, [controller])

  return (
    <section id="hero" className="hero-game" ref={rootRef}>
      <div className="hero-game__bg hero-game__bg--1" aria-hidden />
      <div className="hero-game__bg hero-game__bg--2" aria-hidden />
      <div className="hero-game__bg hero-game__bg--3" aria-hidden />
      <div className="hero-game__bg hero-game__bg--4" aria-hidden />
      <div className="hero-game__bg hero-game__bg--5" aria-hidden />
      <div className="hero-game__overlay" aria-hidden />
      <div className="hero-game__sun" ref={sunRef} aria-hidden />
      <div className="hero-game__rays" aria-hidden />

      <div className="hero-game__inner">
        <p className="hero-game__tag">兒童家庭攝影 · 趣味互動</p>

        <div className="hero-game__logoRow" aria-hidden>
          <span className="hero-game__w hero-game__w--dup">W</span>
          <span className="hero-game__w hero-game__w--dup">W</span>
          <span className="hero-game__w hero-game__w--main">W</span>
          <span className="hero-game__w hero-game__w--dup">W</span>
        </div>

        <h1 className="hero-game__title" ref={lettersRef}>
          <span className="hero-game__letter">誰</span>
          <span className="hero-game__letter">想</span>
          <span className="hero-game__letter">成</span>
          <span className="hero-game__letter">為</span>
          <span className="hero-game__letter hero-game__letter--accent">小</span>
          <span className="hero-game__letter hero-game__letter--accent">攝</span>
          <span className="hero-game__letter hero-game__letter--accent">影</span>
          <span className="hero-game__letter hero-game__letter--accent">師</span>
          <span className="hero-game__letter">？</span>
        </h1>

        <p className="hero-game__sub">
          靈感來自經典問答節目氛圍，用輕鬆遊戲感帶你認識我哋嘅影樓服務。
          <span className="hero-game__note">（教育／示範用途設計）</span>
        </p>

        <div className="hero-game__actions">
          <a className="hero-game__btn hero-game__btn--primary" href="#workflow">
            開始旅程
          </a>
          <a className="hero-game__btn hero-game__btn--ghost" href="#pricing">
            睇吓收費
          </a>
        </div>
      </div>
    </section>
  )
}
