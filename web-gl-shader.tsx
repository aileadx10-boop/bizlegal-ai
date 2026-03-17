"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function WebGLShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const refs = useRef<{
    renderer: THREE.WebGLRenderer | null
    uniforms: any
    animationId: number | null
  }>({ renderer: null, uniforms: null, animationId: null })

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const r = refs.current

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(new THREE.Color(0x000000))
    r.renderer = renderer

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1)

    const uniforms = {
      resolution: { value: [window.innerWidth, window.innerHeight] },
      time: { value: 0.0 },
      xScale: { value: 1.2 },
      yScale: { value: 0.4 },
      distortion: { value: 0.08 },
    }
    r.uniforms = uniforms

    const geo = new THREE.BufferGeometry()
    geo.setAttribute("position", new THREE.BufferAttribute(
      new Float32Array([-1,-1,0, 1,-1,0, -1,1,0, 1,-1,0, -1,1,0, 1,1,0]), 3
    ))

    const mat = new THREE.RawShaderMaterial({
      vertexShader: `
        attribute vec3 position;
        void main() { gl_Position = vec4(position, 1.0); }
      `,
      fragmentShader: `
        precision highp float;
        uniform vec2 resolution;
        uniform float time;
        uniform float xScale;
        uniform float yScale;
        uniform float distortion;
        void main() {
          vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
          float d = length(p) * distortion;
          float rx = p.x * (1.0 + d);
          float gx = p.x;
          float bx = p.x * (1.0 - d);
          float r = 0.04 / abs(p.y + sin((rx + time) * xScale) * yScale);
          float g = 0.05 / abs(p.y + sin((gx + time) * xScale) * yScale);
          float b = 0.03 / abs(p.y + sin((bx + time) * xScale) * yScale);
          gl_FragColor = vec4(r * 0.3, g * 1.2, b * 0.5, 1.0);
        }
      `,
      uniforms,
      side: THREE.DoubleSide,
    })

    scene.add(new THREE.Mesh(geo, mat))

    const resize = () => {
      const w = window.innerWidth, h = window.innerHeight
      renderer.setSize(w, h, false)
      uniforms.resolution.value = [w, h]
    }
    resize()
    window.addEventListener("resize", resize)

    const animate = () => {
      uniforms.time.value += 0.008
      renderer.render(scene, camera)
      r.animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      if (r.animationId) cancelAnimationFrame(r.animationId)
      window.removeEventListener("resize", resize)
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full block pointer-events-none"
      style={{ opacity: 0.55 }}
    />
  )
}
