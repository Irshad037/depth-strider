import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dir = path.join(__dirname, 'public', 'sonar')
fs.mkdirSync(dir, { recursive: true })

function hash(n) {
  const x = Math.sin(n) * 10000
  return x - Math.floor(x)
}

function makeSonar({ name, w = 960, h = 540, blob, tint = '#c8d0d8' }) {
  const lines = []
  lines.push(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">`,
  )
  lines.push(
    `<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1a1f24"/><stop offset="50%" stop-color="#2a3238"/><stop offset="100%" stop-color="#151a1e"/></linearGradient></defs>`,
  )
  lines.push(`<rect width="${w}" height="${h}" fill="url(#g)"/>`)

  for (let y = 0; y < h; y += 3) {
    const a = 0.04 + hash(y * 0.17) * 0.08
    lines.push(
      `<rect x="0" y="${y}" width="${w}" height="2" fill="#9aa7b2" opacity="${a.toFixed(3)}"/>`,
    )
  }

  lines.push(
    `<rect x="${w / 2 - 8}" y="0" width="16" height="${h}" fill="#0d1114" opacity="0.55"/>`,
  )

  for (let i = 0; i < 900; i++) {
    const x = Math.floor(hash(i * 1.1) * w)
    const y = Math.floor(hash(i * 2.3) * h)
    const s = 1 + Math.floor(hash(i * 3.7) * 2)
    const o = 0.08 + hash(i * 4.1) * 0.25
    lines.push(
      `<rect x="${x}" y="${y}" width="${s}" height="${s}" fill="#d7dee4" opacity="${o.toFixed(3)}"/>`,
    )
  }

  blob.forEach((b) => {
    const [cx, cy, rx, ry, rot] = b
    lines.push(
      `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${tint}" opacity="0.55" transform="rotate(${rot} ${cx} ${cy})"/>`,
    )
    lines.push(
      `<ellipse cx="${cx + rx * 0.15}" cy="${cy}" rx="${rx * 0.55}" ry="${ry * 0.35}" fill="#f2f5f7" opacity="0.35" transform="rotate(${rot} ${cx} ${cy})"/>`,
    )
    const shadowX = cx > w / 2 ? cx + rx : cx - rx
    lines.push(
      `<ellipse cx="${shadowX}" cy="${cy}" rx="${rx * 0.9}" ry="${ry * 0.7}" fill="#050708" opacity="0.45"/>`,
    )
  })

  lines.push(
    `<text x="12" y="22" fill="#7a8791" font-family="monospace" font-size="12">SSS · 455 kHz</text>`,
  )
  lines.push(
    `<text x="${w - 120}" y="${h - 14}" fill="#7a8791" font-family="monospace" font-size="11">RANGE 75m</text>`,
  )
  lines.push('</svg>')
  fs.writeFileSync(path.join(dir, name), lines.join(''))
}

makeSonar({
  name: 'ghostnet1.svg',
  blob: [
    [280, 220, 90, 28, -18],
    [310, 235, 55, 16, 12],
  ],
  tint: '#d6cfc4',
})
makeSonar({
  name: 'ghostnet2.svg',
  blob: [
    [650, 180, 110, 22, 8],
    [670, 200, 70, 18, -6],
  ],
  tint: '#d2ccc0',
})
makeSonar({
  name: 'debris1.svg',
  blob: [[240, 300, 42, 30, 25]],
  tint: '#cfd6dc',
})
makeSonar({
  name: 'debris2.svg',
  blob: [
    [720, 260, 38, 34, -10],
    [745, 280, 22, 18, 40],
  ],
  tint: '#cbd3d9',
})
makeSonar({
  name: 'vehicle1.svg',
  blob: [
    [300, 250, 120, 40, 0],
    [330, 250, 40, 22, 0],
  ],
  tint: '#e8edf1',
})
makeSonar({
  name: 'vehicle2.svg',
  blob: [[620, 290, 130, 36, -4]],
  tint: '#e6ebf0',
})
makeSonar({
  name: 'anomaly1.svg',
  blob: [[400, 200, 55, 48, 15]],
  tint: '#b8c0c8',
})
makeSonar({
  name: 'anomaly2.svg',
  blob: [[560, 340, 48, 40, -20]],
  tint: '#bcc4cc',
})

console.log('Wrote:', fs.readdirSync(dir).join(', '))
