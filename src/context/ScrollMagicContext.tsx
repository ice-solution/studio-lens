import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from 'react'
import ScrollMagic from 'scrollmagic'
import type { Controller } from 'scrollmagic'

export type ScrollMagicController = Controller

const Ctx = createContext<ScrollMagicController | null>(null)

export function ScrollMagicProvider({ children }: { children: ReactNode }) {
  const ctrlRef = useRef<ScrollMagicController | null>(null)
  const ctrl = useMemo(() => {
    ctrlRef.current = new ScrollMagic.Controller()
    return ctrlRef.current
  }, [])

  useEffect(() => {
    return () => {
      ctrl.destroy(true)
      ctrlRef.current = null
    }
  }, [ctrl])

  return <Ctx.Provider value={ctrl}>{children}</Ctx.Provider>
}

export function useScrollMagicController() {
  return useContext(Ctx)
}
