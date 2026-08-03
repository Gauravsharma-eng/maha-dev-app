import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

// Usage: node scripts/convert-images.js --src=public/assets/jyotirlinga/somnath.jpg
const args = Object.fromEntries(process.argv.slice(2).map(a => a.split('=').map(s => s.replace(/^--/, ''))))
const src = args.src || args._ || process.argv[2]
if (!src) {
  console.error('Usage: node scripts/convert-images.js --src=public/assets/jyotirlinga/somnath.jpg')
  process.exit(1)
}

const sizes = [400, 800, 1200]
const outDir = path.dirname(src)
const base = path.basename(src, path.extname(src))

async function convert() {
  try {
    await Promise.all(sizes.map(async (w) => {
      const outJpg = path.join(outDir, `${base}-${w}.jpg`)
      const outWebp = path.join(outDir, `${base}-${w}.webp`)
      await sharp(src)
        .resize({ width: w })
        .jpeg({ quality: 78 })
        .toFile(outJpg)
      await sharp(src)
        .resize({ width: w })
        .webp({ quality: 78 })
        .toFile(outWebp)
      console.log('Written', outJpg, outWebp)
    }))
    // also write a webp copy at base.webp
    await sharp(src).webp({ quality: 78 }).toFile(path.join(outDir, `${base}.webp`))
    console.log('Written base webp')
  } catch (err) {
    console.error('Conversion error:', err)
    process.exit(2)
  }
}

convert()
