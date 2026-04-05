'use client'
import * as React from 'react'
import { useEffect, useRef } from 'react'
import { createNoise2D } from 'simplex-noise'

interface WavesProps {
  className?: string
  strokeColor?: string
  backgroundColor?: string
  pointerSize?: number // kept for API compatibility, unused
}

const GAP = 10          // dense lines, same visual as before
const FPS_CAP = 30      // half the frames, same look

export function Waves({
  className = "",
  strokeColor = "#ffffff",
  backgroundColor = "#000000",
}: WavesProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const noiseRef = useRef<((x: number, y: number) => number) | null>(null)
  const rafRef = useRef<number | null>(null)
  const lastFrameRef = useRef<number>(0)
  const boundingRef = useRef<{ width: number; height: number } | null>(null)
  const pointsRef = useRef<{ x: number; y: number }[][]>([])

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    noiseRef.current = createNoise2D()
    setSize()
    buildGrid()

    window.addEventListener('resize', onResize, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  const onVisibility = () => {
    if (document.hidden) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    } else {
      rafRef.current = requestAnimationFrame(tick)
    }
  }

  const setSize = () => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return
    const { width, height } = container.getBoundingClientRect()
    boundingRef.current = { width, height }
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    const ctx = canvas.getContext('2d')
    if (ctx) ctx.scale(dpr, dpr)
  }

  const buildGrid = () => {
    if (!boundingRef.current) return
    const { width, height } = boundingRef.current
    const cols = Math.ceil((width + GAP * 2) / GAP)
    const rows = Math.ceil((height + GAP * 2) / GAP)
    const xStart = (width - GAP * cols) / 2
    const yStart = (height - GAP * rows) / 2

    pointsRef.current = Array.from({ length: cols }, (_, i) =>
      Array.from({ length: rows }, (_, j) => ({
        x: xStart + GAP * i,
        y: yStart + GAP * j,
      }))
    )
  }

  const onResize = () => { setSize(); buildGrid() }

  const tick = (time: number) => {
    rafRef.current = requestAnimationFrame(tick)
    if (time - lastFrameRef.current < 1000 / FPS_CAP) return
    lastFrameRef.current = time

    const canvas = canvasRef.current
    const noise = noiseRef.current
    if (!canvas || !noise || !boundingRef.current) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { width, height } = boundingRef.current
    ctx.clearRect(0, 0, width, height)
    ctx.strokeStyle = strokeColor
    ctx.lineWidth = 1

    const t = time * 0.001

    for (const col of pointsRef.current) {
      if (col.length < 2) continue
      ctx.beginPath()
      const p0 = col[0]
      const n0 = noise(p0.x * 0.003 + t * 0.035, p0.y * 0.002 + t * 0.015) * 8
      ctx.moveTo(p0.x + Math.cos(n0) * 12, p0.y + Math.sin(n0) * 6)

      for (let j = 1; j < col.length; j++) {
        const p = col[j]
        const n = noise(p.x * 0.003 + t * 0.035, p.y * 0.002 + t * 0.015) * 8
        ctx.lineTo(p.x + Math.cos(n) * 12, p.y + Math.sin(n) * 6)
      }
      ctx.stroke()
    }
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor, position: 'absolute', inset: 0 }}
    >
      <canvas ref={canvasRef} style={{ display: 'block', willChange: 'contents' }} />
    </div>
  )
}
