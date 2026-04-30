import gsap from 'gsap'
import ScrollMagic from 'scrollmagic'
import { useEffect, type RefObject } from 'react'
import type { ScrollMagicController } from '../context/ScrollMagicContext'

export function useRevealOnScroll(
  controller: ScrollMagicController | null,
  sectionRef: RefObject<HTMLElement | null>,
  itemSelector: string,
) {
  useEffect(() => {
    if (!controller || !sectionRef.current) return
    const section = sectionRef.current
    const items = section.querySelectorAll<HTMLElement>(itemSelector)
    const scenes: InstanceType<typeof ScrollMagic.Scene>[] = []

    items.forEach((el) => {
      gsap.set(el, { autoAlpha: 0, y: 36 })
      const scene = new ScrollMagic.Scene({
        triggerElement: el,
        triggerHook: 0.85,
        reverse: false,
      })
        .on('enter', () => {
          gsap.to(el, { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power2.out' })
        })
        .addTo(controller)
      scenes.push(scene)
    })

    return () => {
      scenes.forEach((s) => {
        s.destroy(true)
      })
    }
  }, [controller, sectionRef, itemSelector])
}
