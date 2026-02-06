"use client"

import { useState, useEffect, useRef, useCallback } from "react"

// Detect if device is mobile/touch
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const isSmallScreen = window.matchMedia('(max-width: 768px)').matches
      setIsMobile(isTouchDevice || isSmallScreen)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return isMobile
}

// Detect prefers-reduced-motion
export function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReduced(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return prefersReduced
}

// Intersection Observer hook for lazy loading
export function useIntersectionObserver<T extends HTMLElement>(
  options?: IntersectionObserverInit
) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [hasIntersected, options])

  return { ref, isIntersecting, hasIntersected }
}

// Video lazy loading with src management
export function useLazyVideo(videoUrl: string, isInViewport: boolean) {
  const [videoSrc, setVideoSrc] = useState<string>('')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (isInViewport && !videoSrc) {
      setVideoSrc(videoUrl)
    }
  }, [isInViewport, videoUrl, videoSrc])

  const handleLoadedData = useCallback(() => {
    setIsLoaded(true)
  }, [])

  return { videoSrc, isLoaded, handleLoadedData }
}
