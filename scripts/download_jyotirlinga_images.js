import https from 'https'
import http from 'http'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')
const destDir = path.join(projectRoot, 'public', 'assets', 'jyotirlinga')
if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true })

const images = [
  { slug: 'somnath', url: 'https://source.unsplash.com/featured/900x1200?somnath,temple,india' },
  { slug: 'mallikarjuna', url: 'https://source.unsplash.com/featured/900x1200?mallikarjuna,temple,india' },
  { slug: 'mahakaleshwar', url: 'https://source.unsplash.com/featured/900x1200?mahakaleshwar,temple,india' },
  { slug: 'omkareshwar', url: 'https://source.unsplash.com/featured/900x1200?omkareshwar,temple,india' },
  { slug: 'kedarnath', url: 'https://source.unsplash.com/featured/900x1200?kedarnath,temple,india' },
  { slug: 'bhimashankar', url: 'https://source.unsplash.com/featured/900x1200?bhimashankar,temple,india' },
  { slug: 'vishwanath', url: 'https://source.unsplash.com/featured/900x1200?kashi%20vishwanath,temple,india' },
  { slug: 'trimbakeshwar', url: 'https://source.unsplash.com/featured/900x1200?trimbakeshwar,temple,india' },
  { slug: 'baidyanath', url: 'https://source.unsplash.com/featured/900x1200?baidyanath,temple,india' },
  { slug: 'nageshwar', url: 'https://source.unsplash.com/featured/900x1200?nageshwar,temple,india' },
  { slug: 'rameshwaram', url: 'https://source.unsplash.com/featured/900x1200?rameshwaram,temple,india' },
  { slug: 'grishneshwar', url: 'https://source.unsplash.com/featured/900x1200?grishneshwar,temple,india' },
]

function download(url, outPath, redirects = 5) {
  const mod = url.startsWith('https') ? https : http
  mod.get(url, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && redirects > 0) {
      console.log('Redirect:', url, '->', res.headers.location)
      download(res.headers.location, outPath, redirects - 1)
    } else if (res.statusCode === 200) {
      const file = fs.createWriteStream(outPath)
      res.pipe(file)
      file.on('finish', () => {
        file.close()
        console.log('Saved', outPath)
      })
    } else {
      console.error('Failed to download', url, 'Status:', res.statusCode)
    }
  }).on('error', (err) => {
    console.error('Error downloading', url, err.message)
  })
}

(async () => {
  for (const img of images) {
    const outFile = path.join(destDir, img.slug + '.jpg')
    console.log('Fetching', img.url, '->', outFile)
    download(img.url, outFile)
    // small delay to be polite
    await new Promise((r) => setTimeout(r, 300))
  }
})()
