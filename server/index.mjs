import { readFile } from 'node:fs/promises'
import { join as pathJoin } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import express from 'express'

const server = express()

const DIST_FOLDER = fileURLToPath(new URL('../dist', import.meta.url))

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&#34;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

async function loadProducts() {
  let products = null

  try {
    products = JSON.parse(await readFile(pathJoin(DIST_FOLDER, 'products.json'), 'utf8'))
  } catch {
  }

  return Array.isArray(products) ? products : []
}

async function getHtml({ path, description, title }) {
  let html = null
  const filePath = pathJoin(DIST_FOLDER, 'index.html')

  try {
    html = await readFile(filePath, 'utf8')
  } catch(ex) {
    return `<pre>Error loading ${filePath}. Did you run the build?\n\n${ex.message}</pre>`
  }

  return html.replace(
    '<!-- meta tags -->',
    [
      `<meta name="description" content="${escapeHtml(description)}">`,
      `<meta property="og:title" content="${escapeHtml(title)}">`,
      `<meta property="og:type" content="website">`,
      `<meta property="og:url" content="https://skirtles-code.github.io/vue-3-meta-tags-example/${path}">`,
      `<meta property="og:image" content="https://skirtles-code.github.io/vue-3-meta-tags-example/logo.svg">`,
      `<meta property="og:description" content="${escapeHtml(description)}">`
    ].join('\n    ')
  )
}

server.get('/', async (req, res) => {
  const html = await getHtml({
    path: '',
    description: 'My products page',
    title: 'Products page'
  })

  res.send(html)
})

server.get('/product/:productId', async (req, res, next) => {
  const productId = +req.params.productId

  // Load product from the 'database'
  const products = await loadProducts()

  const product = products.find(({ id }) => productId === id)

  if (product) {
    const html = await getHtml({
      path: `product/${product.id}`,
      description: product.description,
      title: `Product: ${ product.name }`
    })

    res.send(html)
  } else {
    next()
  }
})

server.use(express.static(DIST_FOLDER))

server.use((req, res) => {
  res.status(404).send(`<pre>404 - Unknown route - ${req.path}</pre>`)
})

const port = 6082

server.listen(port)

console.log(`Server running at http://localhost:${port}/`)
