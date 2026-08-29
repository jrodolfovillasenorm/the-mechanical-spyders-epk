import { useEffect, useRef } from 'react'

interface Star {
    x: number
    y: number
    z: number
}

const STAR_COUNT = 220
const SPEED = 0.06
const FOV = 260

export default function SpaceBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let width = window.innerWidth
        let height = window.innerHeight
        let animationId = 0

        const stars: Star[] = []

        const resize = () => {
            width = window.innerWidth
            height = window.innerHeight

            const ratio = window.devicePixelRatio || 1

            canvas.width = width * ratio
            canvas.height = height * ratio

            canvas.style.width = `${width}px`
            canvas.style.height = `${height}px`

            ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
        }

        const resetStar = (star: Star) => {
            star.x = (Math.random() - 0.5) * width
            star.y = (Math.random() - 0.5) * height
            star.z = Math.random() * width
        }

        resize()

        for (let i = 0; i < STAR_COUNT; i++) {
            const star = { x: 0, y: 0, z: 0 }
            resetStar(star)
            stars.push(star)
        }

        const render = () => {
            // Espacio profundo
            ctx.fillStyle = '#03050A'
            ctx.fillRect(0, 0, width, height)

            // Nebulosa muy sutil
            const gradient = ctx.createRadialGradient(
                width / 2,
                height / 2,
                0,
                width / 2,
                height / 2,
                width * 0.7
            )

            gradient.addColorStop(0, 'rgba(70,110,180,0.05)')
            gradient.addColorStop(1, 'rgba(0,0,0,0)')

            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, width, height)

            for (const star of stars) {
                star.z -= SPEED * 8

                if (star.z <= 1) {
                    resetStar(star)
                    star.z = width
                }

                const sx = (star.x / star.z) * FOV + width / 2
                const sy = (star.y / star.z) * FOV + height / 2

                if (sx < 0 || sx > width || sy < 0 || sy > height) {
                    resetStar(star)
                    continue
                }

                const radius = Math.max(1, (1 - star.z / width) * 2.5)

                // Estela (solo cuando está relativamente cerca)
                if (radius > 1.3) {
                    const tx = (star.x / (star.z + 12)) * FOV + width / 2
                    const ty = (star.y / (star.z + 12)) * FOV + height / 2

                    ctx.beginPath()
                    ctx.strokeStyle = 'rgba(255,255,255,0.35)'
                    ctx.lineWidth = radius * 0.6
                    ctx.moveTo(tx, ty)
                    ctx.lineTo(sx, sy)
                    ctx.stroke()
                }

                // Estrella pixelada
                ctx.fillStyle = 'white'
                ctx.fillRect(
                    Math.round(sx),
                    Math.round(sy),
                    Math.ceil(radius),
                    Math.ceil(radius)
                )
            }

            animationId = requestAnimationFrame(render)
        }

        animationId = requestAnimationFrame(render)

        window.addEventListener('resize', resize)

        return () => {
            cancelAnimationFrame(animationId)
            window.removeEventListener('resize', resize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-10 pointer-events-none"
        />
    )
}