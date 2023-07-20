import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join as pathJoin} from 'node:path'
import { fileURLToPath, URL } from 'node:url'

const DIST_FOLDER = fileURLToPath(new URL('../dist', import.meta.url))
const REPLACE_COMMENT = '<!-- meta tags -->'

async function addMeta() {
  console.log('Adding meta tags...')

  const filePath = pathJoin(DIST_FOLDER, 'index.html')
  const html = await readFile(filePath, 'utf8')

  if (!html.includes(REPLACE_COMMENT)) {
    console.error(`String ${REPLACE_COMMENT} not found in ${filePath}`)
    return
  }

  const products = await loadProducts()

  for (const product of products) {
    await writeIndex({
      path: `product/${product.id}`,
      description: product.description,
      title: `Product: ${product.name}`
    })
  }

  await writeIndex({
    file: '404.html',
    description: 'Page not found',
    title: 'Page not found'
  })

  await writeIndex({
    description: 'My products page',
    title: 'Products page'
  })

  console.log('Complete')

  async function writeIndex({ path = '', file = 'index.html', description, title }) {
    const indexDir = pathJoin(DIST_FOLDER, path || '.')

    const out = html.replace(
      REPLACE_COMMENT,
      [
        `<meta name="description" content="${escapeHtml(description)}">`,
        `<meta property="og:title" content="${escapeHtml(title)}">`,
        `<meta property="og:type" content="website">`,
        `<meta property="og:url" content="https://skirtles-code.github.io/vue-3-meta-tags-example/${path}">`,
        `<meta property="og:image" content="https://skirtles-code.github.io/vue-3-meta-tags-example/logo.svg">`,
        `<meta property="og:description" content="${escapeHtml(description)}">`
      ].join('\n    ')
    )

    await mkdir(indexDir, { recursive: true })
    await writeFile(pathJoin(indexDir, file), out, 'utf8')
  }
}

async function loadProducts() {
  // Simulate loading the products from the 'database'
  const json = await readFile(pathJoin(DIST_FOLDER, 'products.json'), 'utf8')

  return JSON.parse(json)
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&#34;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

addMeta()
