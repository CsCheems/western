import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

const DURATION = 800
const EASE = `transform ${DURATION}ms cubic-bezier(.55,.05,.25,1)`

// El orden de montaje es el natural [0, 1, … n-1] y se mantiene rotado para que
// `order[k]` sea siempre el panel `(index + k) % count`: el actual al frente y
// el siguiente justo detrás, listo para entrar desde la derecha.
const initialOrder = (count) => Array.from({ length: count }, (_, i) => i)

/**
 * Carrusel de loop continuo: al pasar del último panel al primero el
 * movimiento sigue en la misma dirección, sin rebobinar. El panel entrante
 * llega desde la derecha y el contenido viaja hacia la izquierda.
 *
 * Rota un array `order` en estado (equivalente declarativo de la rotación de
 * hijos del prototipo) y aplica el transform por ref para poder intercalar el
 * reflow que hace visible la animación.
 */
export function useLoopCarousel(count, { autoplayMs = null } = {}) {
  const trackRef = useRef(null)
  const [order, setOrder] = useState(() => initialOrder(count))
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  // Fase pendiente para el layout effect: 'enter' coloca el panel entrante
  // fuera de cuadro y lo anima; 'settle' recoloca el track tras un avance.
  const phase = useRef(null)
  const busy = useRef(false)
  const timers = useRef([])

  const track = (fn) => {
    const el = trackRef.current
    if (el) fn(el)
  }

  const later = useCallback((fn, ms) => {
    const id = setTimeout(fn, ms)
    timers.current.push(id)
    return id
  }, [])

  const next = useCallback(() => {
    if (busy.current) return
    busy.current = true
    track((el) => {
      el.style.transition = EASE
      el.style.transform = 'translateX(-100%)'
    })
    later(() => {
      phase.current = 'settle'
      setOrder((o) => [...o.slice(1), o[0]])
      setIndex((i) => (i + 1) % count)
    }, DURATION)
  }, [count, later])

  const prev = useCallback(() => {
    if (busy.current) return
    busy.current = true
    phase.current = 'enter'
    setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)])
    setIndex((i) => (i - 1 + count) % count)
  }, [count])

  useLayoutEffect(() => {
    const el = trackRef.current
    if (!el || !phase.current) return

    if (phase.current === 'enter') {
      el.style.transition = 'none'
      el.style.transform = 'translateX(-100%)'
      void el.offsetWidth
      el.style.transition = EASE
      el.style.transform = 'translateX(0%)'
      later(() => {
        busy.current = false
      }, DURATION)
    } else {
      el.style.transition = 'none'
      el.style.transform = 'translateX(0%)'
      void el.offsetWidth
      busy.current = false
    }

    phase.current = null
  }, [order, later])

  // Un salto por puntos encadena pasos hacia adelante: misma dirección, sin
  // rebobinado, igual que las flechas.
  const goTo = useCallback(
    (target) => {
      const steps = (target - index + count) % count
      for (let i = 0; i < steps; i++) {
        later(() => next(), i * (DURATION + 60))
      }
    },
    [count, index, later, next],
  )

  // Autoplay: se re-arma en cada cambio de panel, como el prototipo.
  useEffect(() => {
    if (!autoplayMs || paused) return
    const id = setTimeout(next, autoplayMs)
    return () => clearTimeout(id)
  }, [autoplayMs, paused, index, next])

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout)
      timers.current = []
    },
    [],
  )

  return {
    trackRef,
    order,
    index,
    next,
    prev,
    goTo,
    pause: useCallback(() => setPaused(true), []),
    resume: useCallback(() => setPaused(false), []),
  }
}
