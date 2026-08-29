import { useEffect, useRef, useState } from 'react'

const CRT_GREEN = '#7CFF6B'

type GameState = 'ready' | 'playing' | 'won' | 'lost'

interface Point {
    x: number
    y: number
}

interface Player extends Point {
    width: number
    height: number
    speed: number
}

interface Enemy extends Point {
    width: number
    height: number
    alive: boolean
}

interface Bullet extends Point {
    width: number
    height: number
    speed: number
}

const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 450

const PLAYER_WIDTH = 42
const PLAYER_HEIGHT = 28

const ENEMY_WIDTH = 28
const ENEMY_HEIGHT = 20

const BULLET_WIDTH = 4
const BULLET_HEIGHT = 12

const PLAYER_SPEED = 420
const BULLET_SPEED = 600

const STARTING_LIVES = 3

const ENEMY_ROWS = 3
const ENEMY_COLUMNS = 8

const ENEMY_GAP_X = 22
const ENEMY_GAP_Y = 24

const ENEMY_START_SPEED = 55
const ENEMY_MAX_SPEED = 180
const ENEMY_DROP = 24

function getEnemySpeed(enemies: Enemy[]) {
    const remaining = enemies.filter(
        (enemy) => enemy.alive
    ).length

    const total =
        ENEMY_ROWS * ENEMY_COLUMNS

    const progress =
        1 - remaining / total

    const acceleration =
        Math.pow(progress, 1.7)

    return (
        ENEMY_START_SPEED +
        (ENEMY_MAX_SPEED - ENEMY_START_SPEED) *
        acceleration
    )
}

function createEnemies(): Enemy[] {
    const formationWidth =
        ENEMY_COLUMNS * ENEMY_WIDTH +
        (ENEMY_COLUMNS - 1) * ENEMY_GAP_X

    const startX = (CANVAS_WIDTH - formationWidth) / 2

    const enemies: Enemy[] = []

    for (let row = 0; row < ENEMY_ROWS; row++) {
        for (let column = 0; column < ENEMY_COLUMNS; column++) {
            enemies.push({
                x: startX + column * (ENEMY_WIDTH + ENEMY_GAP_X),
                y: 55 + row * (ENEMY_HEIGHT + ENEMY_GAP_Y),
                width: ENEMY_WIDTH,
                height: ENEMY_HEIGHT,
                alive: true,
            })
        }
    }

    return enemies
}

function createPlayer(): Player {
    return {
        x: CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2,
        y: CANVAS_HEIGHT - 55,
        width: PLAYER_WIDTH,
        height: PLAYER_HEIGHT,
        speed: PLAYER_SPEED,
    }
}

function drawSpider(
    ctx: CanvasRenderingContext2D,
    player: Player
) {
    const centerX = player.x + player.width / 2
    const centerY = player.y + player.height / 2

    ctx.save()

    ctx.strokeStyle = CRT_GREEN
    ctx.fillStyle = CRT_GREEN
    ctx.lineWidth = 2.5
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'

    ctx.shadowColor = CRT_GREEN
    ctx.shadowBlur = 8

    // Mechanical body
    ctx.beginPath()
    ctx.moveTo(centerX - 13, centerY - 4)
    ctx.lineTo(centerX - 9, centerY - 10)
    ctx.lineTo(centerX + 9, centerY - 10)
    ctx.lineTo(centerX + 13, centerY - 4)
    ctx.lineTo(centerX + 10, centerY + 7)
    ctx.lineTo(centerX - 10, centerY + 7)
    ctx.closePath()
    ctx.fill()

    // Central reactor
    ctx.fillStyle = '#030904'
    ctx.beginPath()
    ctx.arc(
        centerX,
        centerY,
        4,
        0,
        Math.PI * 2
    )
    ctx.fill()

    ctx.stroke()

    // Mechanical head / sensors
    ctx.fillStyle = CRT_GREEN

    ctx.fillRect(
        centerX - 8,
        centerY - 14,
        5,
        4
    )

    ctx.fillRect(
        centerX + 3,
        centerY - 14,
        5,
        4
    )

    // Antenna
    ctx.beginPath()
    ctx.moveTo(centerX, centerY - 10)
    ctx.lineTo(centerX, centerY - 18)
    ctx.stroke()

    ctx.fillRect(
        centerX - 1.5,
        centerY - 21,
        3,
        3
    )

    // Eight mechanical legs
    const legs = [
        [-8, -5, -18, -13],
        [-11, -1, -22, -3],
        [-9, 4, -19, 12],
        [-5, 7, -10, 17],

        [8, -5, 18, -13],
        [11, -1, 22, -3],
        [9, 4, 19, 12],
        [5, 7, 10, 17],
    ]

    for (const [x1, y1, x2, y2] of legs) {
        ctx.beginPath()

        ctx.moveTo(
            centerX + x1,
            centerY + y1
        )

        ctx.lineTo(
            centerX + x2,
            centerY + y2
        )

        ctx.stroke()

        // Joint
        ctx.fillRect(
            centerX + x2 - 2,
            centerY + y2 - 2,
            4,
            4
        )
    }

    ctx.shadowBlur = 0

    ctx.restore()
}

function drawUfo(
    ctx: CanvasRenderingContext2D,
    enemy: Enemy
) {
    const centerX = enemy.x + enemy.width / 2
    const centerY = enemy.y + enemy.height / 2

    const row =
        Math.floor(
            (enemy.y - 55) /
            (ENEMY_HEIGHT + ENEMY_GAP_Y)
        )

    ctx.save()

    ctx.strokeStyle = CRT_GREEN
    ctx.fillStyle = CRT_GREEN
    ctx.lineWidth = 2

    ctx.shadowColor = CRT_GREEN
    ctx.shadowBlur = 6

    // Different silhouette for each row
    if (row === 0) {

        // Classic flying saucer
        ctx.beginPath()

        ctx.ellipse(
            centerX,
            centerY + 3,
            14,
            7,
            0,
            0,
            Math.PI * 2
        )

        ctx.fill()

        // Dome
        ctx.fillStyle = '#030904'

        ctx.beginPath()

        ctx.arc(
            centerX,
            centerY,
            6,
            Math.PI,
            0
        )

        ctx.fill()
        ctx.stroke()

    } else if (row === 1) {

        // Angular UFO
        ctx.beginPath()

        ctx.moveTo(centerX - 15, centerY + 3)
        ctx.lineTo(centerX - 8, centerY - 6)
        ctx.lineTo(centerX + 8, centerY - 6)
        ctx.lineTo(centerX + 15, centerY + 3)
        ctx.lineTo(centerX + 8, centerY + 7)
        ctx.lineTo(centerX - 8, centerY + 7)
        ctx.closePath()

        ctx.fill()

        // Cockpit
        ctx.fillStyle = '#030904'

        ctx.beginPath()

        ctx.arc(
            centerX,
            centerY - 2,
            4,
            0,
            Math.PI * 2
        )

        ctx.fill()

        ctx.stroke()

    } else {

        // Heavy UFO
        ctx.beginPath()

        ctx.moveTo(centerX - 13, centerY)
        ctx.lineTo(centerX - 7, centerY - 8)
        ctx.lineTo(centerX + 7, centerY - 8)
        ctx.lineTo(centerX + 13, centerY)
        ctx.lineTo(centerX + 7, centerY + 8)
        ctx.lineTo(centerX - 7, centerY + 8)
        ctx.closePath()

        ctx.fill()

        // Central core
        ctx.fillStyle = '#030904'

        ctx.fillRect(
            centerX - 4,
            centerY - 4,
            8,
            8
        )

        ctx.stroke()
    }

    // Propulsion lights
    ctx.fillStyle = CRT_GREEN

    ctx.fillRect(
        centerX - 9,
        centerY + 7,
        3,
        3
    )

    ctx.fillRect(
        centerX - 1.5,
        centerY + 9,
        3,
        3
    )

    ctx.fillRect(
        centerX + 6,
        centerY + 7,
        3,
        3
    )

    ctx.shadowBlur = 0

    ctx.restore()
}

function drawBullet(
    ctx: CanvasRenderingContext2D,
    bullet: Bullet
) {
    ctx.fillStyle = CRT_GREEN
    ctx.shadowColor = CRT_GREEN
    ctx.shadowBlur = 10

    ctx.fillRect(
        bullet.x,
        bullet.y,
        bullet.width,
        bullet.height
    )
    ctx.shadowBlur = 0
}

function intersects(
    a: Point & { width: number; height: number },
    b: Point & { width: number; height: number }
) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    )
}

export default function SpyderInvaders() {

    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    const keysRef = useRef<Set<string>>(new Set())

    const playerRef = useRef<Player>(createPlayer())

    const enemiesRef = useRef<Enemy[]>(createEnemies())

    const bulletsRef = useRef<Bullet[]>([])

    const enemyDirectionRef = useRef(1)

    const enemyMoveTimerRef = useRef(0)

    const lastShotRef = useRef(0)

    const livesRef = useRef(STARTING_LIVES)

    const scoreRef = useRef(0)

    const gameStateRef = useRef<GameState>('ready')

    const animationRef = useRef<number | null>(null)

    const [gameState, setGameState] =
        useState<GameState>('ready')

    const [score, setScore] = useState(0)

    const [lives, setLives] =
        useState(STARTING_LIVES)

    useEffect(() => {

        const canvas = canvasRef.current

        if (!canvas) {
            return
        }

        const ctx = canvas.getContext('2d')

        if (!ctx) {
            return
        }

        const resizeCanvas = () => {

            const rect = canvas.getBoundingClientRect()

            const dpr = window.devicePixelRatio || 1

            canvas.width = CANVAS_WIDTH * dpr
            canvas.height = CANVAS_HEIGHT * dpr

            ctx.setTransform(
                dpr,
                0,
                0,
                dpr,
                0,
                0
            )

            canvas.style.width = `${rect.width}px`
            canvas.style.height = `${rect.width * CANVAS_HEIGHT / CANVAS_WIDTH}px`
        }

        resizeCanvas()

        window.addEventListener(
            'resize',
            resizeCanvas
        )

        const keyDown = (event: KeyboardEvent) => {

            keysRef.current.add(event.code)

            if (
                event.code === 'Space' ||
                event.code === 'ArrowLeft' ||
                event.code === 'ArrowRight'
            ) {
                event.preventDefault()
            }

            if (
                event.code === 'Space' &&
                gameStateRef.current === 'ready'
            ) {
                startGame()
            }
        }

        const keyUp = (event: KeyboardEvent) => {
            keysRef.current.delete(event.code)
        }

        window.addEventListener(
            'keydown',
            keyDown
        )

        window.addEventListener(
            'keyup',
            keyUp
        )

        let previousTime = performance.now()

        const loop = (time: number) => {

            const delta =
                Math.min(
                    (time - previousTime) / 1000,
                    0.05
                )

            previousTime = time

            update(delta, time)

            draw(ctx)

            animationRef.current =
                requestAnimationFrame(loop)
        }

        animationRef.current =
            requestAnimationFrame(loop)

        return () => {

            window.removeEventListener(
                'resize',
                resizeCanvas
            )

            window.removeEventListener(
                'keydown',
                keyDown
            )

            window.removeEventListener(
                'keyup',
                keyUp
            )

            if (animationRef.current) {
                cancelAnimationFrame(
                    animationRef.current
                )
            }
        }

    }, [])

    const startGame = () => {

        playerRef.current = createPlayer()

        enemiesRef.current = createEnemies()

        bulletsRef.current = []

        enemyDirectionRef.current = 1

        enemyMoveTimerRef.current = 0

        lastShotRef.current = 0

        livesRef.current = STARTING_LIVES

        scoreRef.current = 0

        gameStateRef.current = 'playing'

        setLives(STARTING_LIVES)
        setScore(0)
        setGameState('playing')
    }

    const update = (
        delta: number,
        time: number
    ) => {

        if (
            gameStateRef.current !== 'playing'
        ) {
            return
        }

        const player = playerRef.current

        const keys = keysRef.current

        if (keys.has('ArrowLeft')) {
            player.x -= player.speed * delta
        }

        if (keys.has('ArrowRight')) {
            player.x += player.speed * delta
        }

        player.x = Math.max(
            10,
            Math.min(
                CANVAS_WIDTH -
                player.width -
                10,
                player.x
            )
        )

        if (
            keys.has('Space') &&
            time - lastShotRef.current > 280
        ) {

            bulletsRef.current.push({
                x:
                    player.x +
                    player.width / 2 -
                    BULLET_WIDTH / 2,

                y:
                    player.y -
                    BULLET_HEIGHT,

                width: BULLET_WIDTH,
                height: BULLET_HEIGHT,
                speed: BULLET_SPEED,
            })

            lastShotRef.current = time
        }

        for (const bullet of bulletsRef.current) {
            bullet.y -= bullet.speed * delta
        }

        bulletsRef.current =
            bulletsRef.current.filter(
                (bullet) =>
                    bullet.y + bullet.height > 0
            )

        const aliveEnemies =
            enemiesRef.current.filter(
                (enemy) => enemy.alive
            )

        if (aliveEnemies.length === 0) {
            winGame()
            return
        }

        enemyMoveTimerRef.current += delta

        if (
            enemyMoveTimerRef.current >
            0.35
        ) {

            enemyMoveTimerRef.current = 0

            const enemySpeed =
                getEnemySpeed(enemiesRef.current)
            const direction =
                enemyDirectionRef.current

            let shouldDrop = false

            for (const enemy of aliveEnemies) {

                const nextX =
                    enemy.x +
                    direction *
                    enemySpeed *
                    0.35

                if (
                    nextX < 10 ||
                    nextX +
                    enemy.width >
                    CANVAS_WIDTH - 10
                ) {
                    shouldDrop = true
                }
            }

            if (shouldDrop) {

                enemyDirectionRef.current *= -1

                for (const enemy of aliveEnemies) {
                    enemy.y += ENEMY_DROP
                }

            } else {

                for (const enemy of aliveEnemies) {
                    enemy.x +=
                        direction *
                        enemySpeed *
                        0.35
                }
            }
        }

        for (const bullet of bulletsRef.current) {

            for (const enemy of enemiesRef.current) {

                if (
                    !enemy.alive ||
                    !intersects(
                        bullet,
                        enemy
                    )
                ) {
                    continue
                }

                enemy.alive = false

                bullet.y = -100

                scoreRef.current += 100

                setScore(scoreRef.current)

                break
            }
        }

        for (const enemy of aliveEnemies) {

            if (
                enemy.y +
                enemy.height >=
                player.y
            ) {
                loseLife()
                return
            }
        }
    }

    const loseLife = () => {

        livesRef.current -= 1

        setLives(livesRef.current)

        if (livesRef.current <= 0) {

            gameStateRef.current = 'lost'

            setGameState('lost')

            return
        }

        playerRef.current = createPlayer()

        bulletsRef.current = []
    }

    const winGame = () => {

        gameStateRef.current = 'won'

        setGameState('won')
    }

    const draw = (
        ctx: CanvasRenderingContext2D
    ) => {

        ctx.clearRect(
            0,
            0,
            CANVAS_WIDTH,
            CANVAS_HEIGHT
        )

        ctx.fillStyle = '#030904'

        ctx.fillRect(
            0,
            0,
            CANVAS_WIDTH,
            CANVAS_HEIGHT
        )

        // Stars
        ctx.fillStyle =
            'rgba(124,255,107,0.035)'

        for (let i = 0; i < 70; i++) {

            const x =
                (i * 137) %
                CANVAS_WIDTH

            const y =
                (i * 71) %
                CANVAS_HEIGHT

            ctx.fillRect(
                x,
                y,
                1,
                1
            )
        }

        for (const enemy of enemiesRef.current) {

            if (enemy.alive) {
                drawUfo(ctx, enemy)
            }
        }

        drawSpider(
            ctx,
            playerRef.current
        )

        for (const bullet of bulletsRef.current) {
            drawBullet(ctx, bullet)
        }

        // CRT scanlines
        ctx.fillStyle =
            'rgba(255,255,255,0.025)'

        for (
            let y = 0;
            y < CANVAS_HEIGHT;
            y += 4
        ) {
            ctx.fillRect(
                0,
                y,
                CANVAS_WIDTH,
                1
            )
        }
    }

    return (

        <div className="relative w-full">

            <div
                className="
                    relative
                    overflow-hidden
                    rounded-[1.5rem]
                    border
                    border-white/10
                    bg-black
                    shadow-[0_0_40px_rgba(0,0,0,0.65)]
                "
            >

                <canvas
                    ref={canvasRef}
                    className="block h-auto w-full"
                />

                {/* HUD */}
                <div
                    className="
                        pointer-events-none
                        absolute
                        inset-x-0
                        top-0
                        flex
                        justify-between
                        px-5
                        py-4
                        font-mono
                        text-xs
                        tracking-[0.2em]
                        text-[#7CFF6B]/80
                    "
                >
                    <span>
                        SCORE: {score
                            .toString()
                            .padStart(6, '0')}
                    </span>

                    <span>
                        LIVES: {'♥ '.repeat(lives)}
                    </span>
                </div>

                {/* Ready */}
                {gameState === 'ready' && (

                    <div
                        className="
                            absolute
                            inset-0
                            flex
                            flex-col
                            items-center
                            justify-center
                            bg-black/35
                            backdrop-blur-[1px]
                        "
                    >

                        <div
                            className="
                                font-mono
                                text-2xl
                                tracking-[0.25em]
                                text-[#7CFF6B]/80
                            "
                        >
                            SPYDER INVADERS
                        </div>

                        <button
                            type="button"
                            onClick={startGame}
                            className="
                                mt-8
                                border
                                border-white/30
                                px-8
                                py-3
                                font-mono
                                text-sm
                                tracking-[0.3em]
                                text-[#7CFF6B]
                                transition
                                hover:border-[#7CFF6B]
                                hover:bg-[#7CFF6B]/10
                            "
                        >
                            ENGAGE
                        </button>

                        <p
                            className="
                                mt-5
                                font-mono
                                text-xs
                                tracking-[0.15em]
                                text-white/45
                            "
                        >
                            ARROWS TO MOVE · SPACE TO FIRE
                        </p>

                    </div>
                )}

                {/* Won */}
                {gameState === 'won' && (

                    <div
                        className="
                            absolute
                            inset-0
                            flex
                            flex-col
                            items-center
                            justify-center
                            bg-black/55
                        "
                    >

                        <p
                            className="
                                font-mono
                                text-3xl
                                tracking-[0.2em]
                                text-white
                            "
                        >
                            WELL DONE!
                        </p>

                        <p
                            className="
                                mt-4
                                font-mono
                                text-sm
                                tracking-[0.3em]
                                text-white/70
                            "
                        >
                            STAY ALERT!
                        </p>

                        <button
                            type="button"
                            onClick={startGame}
                            className="
                                mt-8
                                border
                                border-white/20
                                px-6
                                py-2
                                font-mono
                                text-xs
                                tracking-[0.25em]
                                text-white/60
                                transition
                                hover:border-white/60
                                hover:text-white
                            "
                        >
                            PLAY AGAIN
                        </button>

                    </div>
                )}

                {/* Lost */}
                {gameState === 'lost' && (

                    <div
                        className="
                            absolute
                            inset-0
                            flex
                            flex-col
                            items-center
                            justify-center
                            bg-black/60
                        "
                    >

                        <p
                            className="
                                font-mono
                                text-3xl
                                tracking-[0.2em]
                                text-white
                            "
                        >
                            TRANSMISSION LOST
                        </p>

                        <button
                            type="button"
                            onClick={startGame}
                            className="
                                mt-8
                                border
                                border-white/20
                                px-6
                                py-2
                                font-mono
                                text-xs
                                tracking-[0.25em]
                                text-white/60
                                transition
                                hover:border-white/60
                                hover:text-white
                            "
                        >
                            RETRY
                        </button>

                    </div>
                )}

            </div>

        </div>
    )
}