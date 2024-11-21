import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

interface BrailleTileProps {
  word: string;
}

const BrailleTile3D: React.FC<BrailleTileProps> = ({ word }) => {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000)
    camera.position.set(150, 150, 150)

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    mountRef.current.appendChild(renderer.domElement)

    // Orbit controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)
    const pointLight = new THREE.PointLight(0xffffff, 0.5)
    pointLight.position.set(100, 100, 100)
    scene.add(pointLight)

    // Tile parameters
    const tileSize = 200
    const tileHeight = 5
    const dotRadius = 2
    const dotSpacing = 10
    const dotHeight = 3

    // Create tile
    const tileGeometry = new THREE.BoxGeometry(tileSize, tileHeight, tileSize)
    const tileMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff })
    const tile = new THREE.Mesh(tileGeometry, tileMaterial)
    tile.position.set(tileSize / 2, tileHeight / 2, tileSize / 2)
    scene.add(tile)

    // Braille dictionary
    const brailleLetters: { [key: string]: [number, number][] } = {
      'A': [[0, 0]],
      'B': [[0, 0], [1, 0]],
      'C': [[0, 0], [0, 1]],
      'E': [[0, 0], [0, 1]],
      'I': [[1, 0], [0, 1]],
      'L': [[0, 0], [1, 0], [1, 1]],
      'O': [[0, 0], [1, 0], [0, 1], [1, 1]],
      'T': [[0, 0], [1, 0], [0, 1], [1, 1], [0, 2]],
    }

    // Create Braille dots
    const dotGeometry = new THREE.SphereGeometry(dotRadius, 32, 32)
    const dotMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff })

    word.toUpperCase().split('').forEach((letter, letterIndex) => {
      if (brailleLetters[letter]) {
        brailleLetters[letter].forEach(([x, y]) => {
          const dot = new THREE.Mesh(dotGeometry, dotMaterial)
          dot.position.set(
            x * dotSpacing + 20 + letterIndex * 30,
            tileHeight + dotHeight,
            tileSize / 2 - (y * dotSpacing + 20)
          )
          scene.add(dot)
        })
      }
    })

    // Add visible text using a sprite
    const createTextSprite = (text: string) => {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      if (!context) return null

      canvas.width = 256
      canvas.height = 128

      context.font = 'Bold 20px Arial'
      context.fillStyle = 'white'
      context.textAlign = 'center'
      context.fillText(text, 128, 64)

      const texture = new THREE.Texture(canvas)
      texture.needsUpdate = true

      const spriteMaterial = new THREE.SpriteMaterial({ map: texture })
      const sprite = new THREE.Sprite(spriteMaterial)
      sprite.scale.set(100, 50, 1)

      return sprite
    }

    const textSprite = createTextSprite(word)
    if (textSprite) {
      textSprite.position.set(tileSize / 2, tileHeight + 30, tileSize / 2)
      scene.add(textSprite)
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Cleanup
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement)
      }
    }
  }, [word])

  return <div ref={mountRef} style={{ width: '100%', height: '500px' }} />
}

export default BrailleTile3D